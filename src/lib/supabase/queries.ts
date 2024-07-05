"use server";
import { validate } from "uuid";
import { files, workspaces } from "../../../migrations/schema";
import db from "./db";
import { File, Subscription, workspace } from "./supabase.types";
import { eq } from "drizzle-orm";
import { folders } from "./schema";
import { Folder } from "./supabase.types";

export async function getUserSubscriptionStatus(userId: string) {
  try {
    const data = await db.query.subscriptions.findFirst({
      where: (s, { eq }) => eq(s.userId, userId),
    });

    if (data) {
      return { data: data as Subscription, error: null };
    } else {
      return { data: null, error: null };
    }
  } catch (error) {
    console.log("Error: ", error);
    return { data: null, error: `Error: ${error}` };
  }
}

/*
This create a new work space
*/
export async function createWorkspace(workspace: workspace) {
  try {
    const response = await db.insert(workspaces).values(workspace);
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
}

export const getFiles = async (folderId: string) => {
  const isValid = validate(folderId);
  if (!isValid) return { data: null, error: "Error" };
  try {
    const results = (await db
      .select()
      .from(files)
      .orderBy(files.createdAt)
      .where(eq(files.folderId, folderId))) as File[] | [];
    return { data: results, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};

export const getFolders = async (workspaceId: string) => {
  const isValid = validate(workspaceId);
  if (!isValid)
    return {
      data: null,
      error: "Error",
    };

  try {
    const results: Folder[] | [] = await db
      .select()
      .from(folders)
      .orderBy(folders.createdAt)
      .where(eq(folders.workspaceId, workspaceId));

    return { data: results, error: null };
  } catch (error) {}
  return { data: null, error: "Error" };
};
