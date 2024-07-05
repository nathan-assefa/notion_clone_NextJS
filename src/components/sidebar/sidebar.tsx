import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { getFolders, getUserSubscriptionStatus } from "@/lib/supabase/queries";
import { redirect } from "next/navigation";

/*
******* Here is what we do in this file ********
1. Verify user existence: Confirm user registration by checking
   valid credentials in the system.
2. Check user subscription: Confirm active subscription or access
   privileges.
3. Ensure folder presence: Verify existence of required folders
   for access.
4 Handle errors: Redirect user to dashboard for error resolution a
5. Get all the different workpaces that are either private,
   collaborating, or shared
*/

type SidebarProps = {
  params: { workspaceId: string };
  className?: string;
};
const Sidebar = async ({ params, className }: SidebarProps) => {
  // First let's get our user
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // Get user subscription status
  const { data: subscriptionData, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  // Get the folders for this workspace
  const { data: workspaceFolderData, error: foldersError } = await getFolders(
    params.workspaceId
  );

  if (subscriptionError || foldersError) redirect("/dashboard");

  return <div>Sidebar</div>;
};

export default Sidebar;
