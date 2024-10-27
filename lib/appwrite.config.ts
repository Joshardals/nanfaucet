import { Client, Account, Databases } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

  const session = (await cookies()).get("userSession");
  if (!session || !session.value) {
    throw new Error(undefined);
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)
    .setKey(process.env.NEXT_APPWRITE_KEY as string);

  return {
    get account() {
      return new Account(client);
    },
  };
}

const {
  NEXT_PUBLIC_APPWRITE_ENDPOINT,
  NEXT_PUBLIC_APPWRITE_PROJECT,
  NEXT_APPWRITE_KEY,
} = process.env;

const client = new Client()
  .setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(NEXT_PUBLIC_APPWRITE_PROJECT as string)
  .setKey(NEXT_APPWRITE_KEY as string);

export const databases = new Databases(client);
