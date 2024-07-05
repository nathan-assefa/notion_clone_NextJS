import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function Get(req: NextRequest) {
  console.log("req: ", req);
  console.log("url: ", req.url);
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");

  console.log("code: ", code);

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}
