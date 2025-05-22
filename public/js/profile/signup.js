
export async function formCallback(formName, form, values) {
  await window.signUp(
    values['email'],
    values['full-name'],
    values['password']
  );
}
