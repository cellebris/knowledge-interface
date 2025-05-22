import { createAuthClient } from 'better-auth/client';

export const authClient = createAuthClient();


export async function signUp(email, fullName, password) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = await authClient.signUp.email({
    email: email,
    password: password,
    name: fullName
  });
  if (error) {
    throw Error(`Signup failed with error: ${error}`);
  }
}

export async function signIn(email, password) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = await authClient.signIn.email({
    email: email,
    password: password,
  });
  if (error) {
    throw Error(`Signin failed with error: ${error}`);
  }
}

export async function signOut() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = await authClient.signOut();
  if (error) {
    throw Error(`Signout failed with error: ${error}`);
  }
}
