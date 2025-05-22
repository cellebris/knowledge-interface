import type { FormItem } from '~/types';
import type { User, Session } from 'better-auth/types';

import { getRootDir, getObject } from '~/utils/loader';
import { sendData } from '~/utils/nexical';

export function validateFields(path: string, errors: object, values: object, fields: Array<FormItem>) {
  const validators = getObject('validators');
  fields.map((item) => {
    if (item['columns'] != undefined) {
      item['columns'].map((column) => {
        validateFields(path, errors, values, column.fields);
      });
    } else {
      if (item['validator'] != undefined) {
        try {
          validators[item['validator']](values[item.name], values, path);
        } catch (error) {
          errors[item.name] = error;
        }
      }
    }
  });
}

export async function executeFormCallback(session: Session | null, name: string, form: object, values: object) {
  let module: NodeModule | null = null;
  try {
    module = await import(/* @vite-ignore */ getRootDir() + `lib/forms/${name}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log(`No server side callback module defined for ${name}`);
  }
  if (module) {
    if (typeof module['formCallback'] === 'function') {
      await module['formCallback'](session, name, form, values);
    } else {
      console.log(`Server callback function formCallback(...) not implemented for form: ${name}`);
    }
  }
}

export async function sendFormValues(user: User, path: string, name: string, form: object, values: object) {
  sendData('form', {
    email: user.email,
    type: form['profile'] ? 'profile' : form['system'] ? 'system' : 'submission',
    path: path,
    name: name,
    fields: values,
  });
}
