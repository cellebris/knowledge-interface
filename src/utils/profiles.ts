import type { Session } from 'better-auth/types';
import type { Profile } from '@prisma/client';

import { PrismaClient, Prisma } from '@prisma/client';

export async function getUserProfile(session: Session | null, name: string): Promise<Profile | null> {
  if (session != null) {
    const prisma = new PrismaClient();
    return await prisma.profile.findUnique({
      where: {
        id: {
          userId: session.userId,
          name: name,
        },
      },
      include: {
        user: true,
      },
    });
  }
  return null;
}

export async function loadProfileValues(session: Session | null, name: string): Promise<object> {
  if (session != null) {
    const profile = await getUserProfile(session, name);
    if (profile != null) {
      return profile.values as Prisma.JsonObject;
    }
  }
  return {};
}

export async function saveProfileValues(session: Session | null, path: string, name: string, values: object) {
  if (session != null) {
    const prisma = new PrismaClient();
    await prisma.profile.upsert({
      where: {
        id: {
          userId: session.userId,
          name: name,
        },
      },
      update: {
        path: path,
        values: values as Prisma.JsonObject,
      },
      create: {
        userId: session.userId,
        name: name,
        path: path,
        values: values as Prisma.JsonObject,
      },
    });
  } else {
    console.log(
      `Profile submission failed with (${session ? (session as Session).userId + ', ' : ''} > ${name} - values: ${values})`
    );
  }
}
