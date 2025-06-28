"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";

/*
 * This function creates a new companion entry in the database
 * */
export const createCompanion = async (formData: CreateCompanion) => {
  // Retrieve the currently authenticated user's ID
  const { userId: author } = await auth();
  // Create a Supabase client instance for interacting with the database
  const supabase = createSupabaseClient();

  /*
   * Insert the companion data into the "companions" table, adding the author's ID
   * 1. insert: Spread form input and attach author
   * @return the inserted records
   * */
  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author })
    .select();

  // if there an error or no data is returned an error
  if (error || !data)
    throw new Error(error?.message || "Failed to create companion");

  // Return the first inserted companion record
  return data[0];
};
