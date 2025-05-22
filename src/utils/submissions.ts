import type { Session } from 'better-auth/types';

import { PrismaClient, Prisma } from '@prisma/client';

export async function saveSubmissionValues(session: Session | null, path: string, name: string, values: object) {
  if (session != null) {
    const prisma = new PrismaClient();
    await prisma.submission.create({
      data: {
        userId: session.userId,
        name: name,
        path: path,
        values: values as Prisma.JsonObject,
      },
    });
  } else {
    console.log(
      `Form submission failed with (${session ? (session as Session).userId + ', ' : ''} > ${name} - values: ${values})`
    );
  }
}
