import DashboardSetup from "@/components/dashboard-setup/dashboard-setup";
import db from "@/lib/supabase/db";
import { getUserSubscriptionStatus } from "@/lib/supabase/queries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  /*
    After authentication, if the user has a workspace, they'll be
    redirected there. Otherwise, they'll be prompted to create a new one.
    Since the dashboard is the landing page for sign-in or sign-up,
    it's where we handle this logic.
  */

  // Fetch the current authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return notFound();

  // Let's first check if the user has a workspace
  const workspace = await db.query.workspaces.findFirst({
    where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
  });

  // Here we are checking whether a user has subscribed or not
  const { data: subscription, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  if (subscriptionError) return;

  // If a user doesn't have a workspace, then we are going to make him create one
  if (!workspace)
    return (
      <div className="bg-background h-screen w-screen flex justify-center items-center">
        <DashboardSetup
          user={user}
          subscription={subscription}
        ></DashboardSetup>
      </div>
    );

  redirect(`/dashboard/${workspace.id}`);

  return <div>DashboardPage</div>;
};

export default DashboardPage;
