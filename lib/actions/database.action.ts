"use server";

import { databases } from "@/lib/appwrite.config";
import { ID, Query, Models } from "node-appwrite";
import { getCurrentUser } from "./auth.actions";

const { DATABASE_ID, USERS_ID } = process.env;

interface User {
  email: string;
  createdAt: string;
  userId: string;
  nanoWallet: string;
  referralCode: string;
  referredBy: string;
}

interface FetchUserInfoResponse {
  success: boolean;
  userInfo?: User;
  msg?: string;
}

interface UsersResponse {
  data?: User[];
  success: boolean;
  msg?: string;
  total?: number;
}

export async function createUserInfo(data: User) {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Failed to create user document in the DB: ${error.message}`);
      return { success: false, msg: error.message };
    }
    console.log(`Failed to create user document in the DB: Unknown error`);
    return { success: false, msg: "Unknown error occurred" };
  }
}

export async function fetchCurrentUserInfo(): Promise<FetchUserInfoResponse> {
  try {
    const user = await getCurrentUser();

    // Check if the user is an error message or a valid CurrentUser
    if (typeof user === "string") {
      return { success: false, msg: user }; // Return the error message if it's a string
    }

    // Now it's safe to access email since user is of type CurrentUser
    const userId = user.email;

    const data = await databases.listDocuments(
      DATABASE_ID as string,
      USERS_ID as string,
      [Query.equal("userId", userId)]
    );

    if (data.documents.length === 0) {
      return { success: false, msg: "User not found" };
    }

    const currentUserInfo: User = {
      email: data.documents[0].email || "",
      createdAt: data.documents[0].$createdAt || "",
      userId: data.documents[0].userId || "",
      nanoWallet: data.documents[0].nanoWallet || "",
      referralCode: data.documents[0].referralCode || "",
      referredBy: data.documents[0].referredBy || "",
    };

    return { success: true, userInfo: currentUserInfo };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `Failed to fetch User Info Document from the DB: ${error.message}`
      );
      return { success: false, msg: error.message };
    }
    console.error(
      `Failed to fetch User Info Document from the DB: Unknown error`
    );
    return { success: false, msg: "Unknown error occurred" };
  }
}

export async function fetchReferredUsers(): Promise<UsersResponse> {
  try {
    const userInfo = await fetchCurrentUserInfo();

    if (!userInfo.success || !userInfo.userInfo) {
      return {
        success: false,
        msg: "Current user information is unavailable.",
      };
    }

    const userRefCode = userInfo.userInfo.referralCode;

    const referredUserInfo = await databases.listDocuments(
      DATABASE_ID as string,
      USERS_ID as string,
      [Query.equal("referredBy", userRefCode)]
    );

    // Map documents to User type
    const users: User[] = referredUserInfo.documents.map(
      (doc: Models.Document) => ({
        email: doc.email || "",
        createdAt: doc.$createdAt || "",
        userId: doc.userId || "",
        nanoWallet: doc.nanoWallet || "",
        referralCode: doc.referralCode || "",
        referredBy: doc.referredBy || "",
      })
    );

    return {
      success: true,
      data: users,
      total: referredUserInfo.total,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Failed to fetch referred Users: ${error.message}`);
      return { success: false, msg: error.message };
    }
    console.log(`Failed to fetch referred Users: Unknown error`);
    return { success: false, msg: "Unknown error occurred" };
  }
}
