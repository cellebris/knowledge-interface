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
