
export async function formCallback(formName, form, values) {
  await window.signIn(
    values['email'],
    values['password']
  );
}
