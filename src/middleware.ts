import type { APIContext, MiddlewareNext } from 'astro';
import type { Session, User } from 'better-auth/types';

import { auth } from '~/auth';

import { sequence } from 'astro:middleware';
import { setVar, addVars, getObject, load, loadFootNote, checkInteractive } from '~/utils/loader';
import { checkRedirect, checkRewrite } from '~/utils/router';
import { validateFields, executeFormCallback, sendFormValues } from '~/utils/forms';
import { loadProfileValues, saveProfileValues } from '~/utils/profiles';
import { saveSubmissionValues } from '~/utils/submissions';

async function loadComponents(_context: APIContext, next: MiddlewareNext) {
  loadFootNote();
  for (const type of [
    'data/menus',
    'data/forms',
    'data/nav',
    'data/notes',
    'data/headers',
    'data/banners',
    'data/stats',
    'data/components',
    'data/faq',
    'data/contact',
    'data/cta',
  ]) {
    await load(type);
  }

  const validators = await import(/* @vite-ignore */ '~/lib/forms/validators');
  if (validators) {
    addVars('validators', validators);
  }

  return await next();
}

async function routeRequest(context: APIContext, next: MiddlewareNext) {
  const redirectPath = checkRedirect(context);
  if (redirectPath) {
    return context.redirect(redirectPath);
  }
  const rewritePath = checkRewrite(context);
  if (rewritePath) {
    return context.rewrite(rewritePath);
  }
  return await next();
}

async function setSession(context: APIContext, next: MiddlewareNext) {
  const accountInfo = await auth.api.getSession({
    headers: context.request.headers,
  });

  if (accountInfo) {
    context.locals.user = accountInfo.user as User;
    context.locals.session = accountInfo.session as Session;
  } else {
    context.locals.user = null;
    context.locals.session = null;

    const path = context.url.pathname.replace(/^\//, '').replace(/\/$/, '');
    const page = getObject('data/nav')[path];
    let anonymous = true;

    if (page) {
      anonymous =
        Object.prototype.hasOwnProperty.call(page, 'metadata') &&
        Object.prototype.hasOwnProperty.call(page['metadata'], 'anonymous')
          ? page['metadata']['anonymous']
          : false;

      if (path != 'profile/session' && checkInteractive(path) && !anonymous) {
        return context.redirect(`/profile/session?continue=/${path}`);
      }
    }
  }
  setVar('user', context.locals.user);
  setVar('session', context.locals.session);

  return await next();
}

async function handleForms(context: APIContext, next: MiddlewareNext) {
  const currentPath = context.url.pathname.replace(/^\//, '').replace(/\/$/, '');
  let formName = '';

  if (!currentPath.startsWith('api') && context.request.method === 'POST') {
    try {
      const user = context.locals.user;
      const session = context.locals.session;
      const forms = getObject('data/forms');
      const formData = await context.request.formData();
      const buttonName = formData.get('submit') as string;

      formName = formData.get('form-name') as string;

      const form = forms[formName];
      const errorParam = context.url.searchParams.get(`${formName.replace(/\//, '-')}-error`) || null;
      let redirect = null;

      if (form) {
        const formValues = form.profile ? await loadProfileValues(session, formName) : {};
        const formErrors = {};

        for (const field of Array.from(formData.entries())) {
          formValues[field[0]] = field[1];
        }

        for (const buttonItem of form.buttons) {
          if (buttonItem.name == buttonName) {
            const urlRedirect = context.url.searchParams.get(buttonItem.name) || null;
            redirect = urlRedirect ? urlRedirect : buttonItem.redirect;
            break;
          }
        }
        if (formValues['bot-field'] == '') {
          const path = formValues['origin-path'].replace(/^\//, '').replace(/\/$/, '');

          delete formValues['form-name'];
          delete formValues['origin-path'];
          delete formValues['bot-field'];

          validateFields(path, formErrors, formValues, form.fields);
          setVar(`${formName}_errors`, formErrors);
          setVar(`${formName}_values`, formValues);

          if (!errorParam && Object.keys(formErrors).length == 0) {
            if (form.system) {
              await executeFormCallback(session, formName, form, formValues);
            } else if (form.profile) {
              await saveProfileValues(session, path, formName, formValues);
            } else {
              await saveSubmissionValues(session, path, formName, formValues);
            }

            if (user) {
              await sendFormValues(user, path, formName, form, formValues);
            }

            if (redirect != null) {
              return context.redirect(redirect);
            }
          }
        }
      }
    } catch (error) {
      setVar(`${formName}_error`, error);
    }
  }
  return await next();
}

export const onRequest = sequence(loadComponents, routeRequest, setSession, handleForms);
