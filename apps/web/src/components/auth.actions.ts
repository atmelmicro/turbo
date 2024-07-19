"use server";

import { getAuth } from "@/backend/auth";

export async function actionAuth() {
  return await getAuth();
}
