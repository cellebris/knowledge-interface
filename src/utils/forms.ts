import { sendData } from '~/utils/nexical';

export async function formProcessor(sessionId: string, name: string, values: object) {
  if (values['bot-field'] == '') {
    const path = values['origin-path'].replace(/^\//, '').replace(/\/$/, '');

    delete values['form-name'];
    delete values['origin-path'];
    delete values['bot-field'];
    delete values['submit'];

    sendData('form', {
      session_id: sessionId,
      path: path ? path : 'home',
      name: name,
      fields: values,
    });
  }
}
