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

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  // Create a Supabase client instance for interacting with the database
  const supabase = createSupabaseClient();

  let query = supabase.from("companions").select();

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  // if there an error or no data is returned an error
  if (error) throw new Error(error?.message || "Failed to get companion");

  return companions;
};
