"use server";

import { z } from "zod";
import { FormSchema } from "../types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type ActionLoginUserProps = z.infer<typeof FormSchema>;

export const actionLoginUser = async ({
  email,
  password,
}: ActionLoginUserProps) => {
  const supabase = createRouteHandlerClient({ cookies });
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return response;
};

export const actionSignUpUser = async ({
  email,
  password,
}: z.infer<typeof FormSchema>) => {
  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email);

  if (data?.length) return { error: { message: "User already exists", data } };
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
    },
  });

  return response;
};
