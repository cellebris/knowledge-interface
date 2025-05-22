export function validateName(value) {
  const words = value.split(' ');
  if (words.length < 2) {
    throw new Error('We need your first and last name');
  }
}

export function validateMessage(value) {
  if (value.length < 50) {
    throw new Error('You need to provide us a little more detail (at least 50 characters)');
  }
}

export function validateEmail(email) {
  if (!email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )) {
    throw new Error('Specified value is not a valid email');
  }
}

export function validatePassword(value, formValues) {
  if (value != formValues['confirm-password']) {
    throw new Error('Specified passwords do not match');
  }
}

export function validateConfirmPassword(value, formValues) {
  if (value != formValues['password']) {
    throw new Error('Specified passwords do not match');
  }
}
