import { databases } from "@/lib/appwrite.config";
import { ID, Query } from "node-appwrite";
import { getCurrentUser } from "./auth.actions";

const { DATABASE_ID, USERS_ID } = process.env;

export async function createUserInfo(data: {
  email: string;
  createdAt: string;
  userId: string;
  nanoWallet: string;
  referralCode: string;
  referredBy: string;
}) {
  try {
    await databases.createDocument(
      DATABASE_ID as string,
      USERS_ID as string,
      ID.unique(),
      {
        email: data.email,
        createdAt: data.createdAt,
        userId: data.userId,
        nanoWallet: data.nanoWallet,
        referralCode: data.referralCode,
        referredBy: data.referredBy,
      }
    );

    return { success: true };
  } catch (error) {
    console.log(`Failed to create user document in the db: ${error}`);
    return { success: false, msg: error };
  }
}

interface User {
  email: string;
  createdAt: string;
  userId: string;
  nanoWallet: string;
  referralCode: string;
  referredBy: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
}

interface FetchUserInfoResponse {
  success: boolean;
  userInfo?: User;
  msg?: string;
}

export async function fetchCurrentUserInfo(): Promise<FetchUserInfoResponse> {
  try {
    const user = await getCurrentUser();
    const { email: userId } = user;

    const data = await databases.listDocuments(
      DATABASE_ID as string,
      USERS_ID as string,
      [Query.equal("userId", userId)]
    );

    const currentUserInfo = data.documents[0] as User;

    return { success: true, userInfo: currentUserInfo };
  } catch (error) {
    console.error(
      `Failed to fetch User Info Document from the DB: ${error.message}`
    );
    return { success: false, msg: error };
  }
}

interface UsersResponse {
  data?: User[];
  success: boolean;
  msg?: string;
  total?: number;
}

export async function fetchReferredUsers(): Promise<UsersResponse> {
  try {
    const userInfo = await fetchCurrentUserInfo();
    const userRefCode = userInfo.userInfo.referralCode;

    const referredUserInfo = await databases.listDocuments(
      DATABASE_ID as string,
      USERS_ID as string,
      [Query.equal("referredBy", userRefCode)]
    );

    return {
      success: true,
      data: referredUserInfo.documents,
      total: referredUserInfo.total,
    };
  } catch (error) {
    console.log(`Failed to fetch referred Users: ${error}`);
    return { success: false, msg: error };
  }
}
