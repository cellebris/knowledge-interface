import type { APIContext, MiddlewareNext } from 'astro';
import type { FormItem } from '~/types';

import { sequence } from 'astro:middleware';
import { setVar, getObject, load, loadFootNote } from '~/utils/loader';
import { checkRedirect, checkRewrite } from '~/utils/router';
import { getSession } from '~/utils/session';
import { formProcessor } from '~/utils/forms';

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

async function handleForms(context: APIContext, next: MiddlewareNext) {
  let formName = '';

  if (context.request.method === 'POST') {
    const sessionId = getSession(context);
    try {
      const js = getObject('js');
      const forms = getObject('forms');
      const formData = await context.request.formData();
      const formValues = {};
      const formErrors = {};

      formName = formData.get('form-name') as string;

      const form = forms[formName];

      for (const field of Array.from(formData.entries())) {
        const formPrefix = formName + '-';
        let fieldName = '';

        if (field[0].startsWith(formPrefix)) {
          fieldName = field[0].slice(formPrefix.length);
        } else {
          fieldName = field[0];
        }
        if (fieldName in formValues) {
          if (!Array.isArray(formValues[fieldName])) {
            formValues[fieldName] = [formValues[fieldName]];
          }
          formValues[fieldName].push(field[1]);
        } else {
          formValues[fieldName] = field[1];
        }
      }
      if (form) {
        form.fields.map((item: FormItem) => {
          if (item['validator'] != undefined) {
            try {
              js[item['validator']](formValues[item.name], formValues);
            } catch (error) {
              formErrors[item.name] = error;
            }
          }
        });
      }
      setVar(`${formName}_errors`, formErrors);
      setVar(`${formName}_values`, formValues);

      if (Object.keys(formErrors).length == 0) {
        await formProcessor(sessionId, formName, formValues);

        if (form && form.redirect) {
          return context.redirect(`/${form.redirect.replace(/^\//, '')}`);
        }
      }
    } catch (error) {
      setVar(`${formName}_error`, error);
    }
  }
  return await next();
}

export const onRequest = sequence(loadComponents, routeRequest, handleForms);
