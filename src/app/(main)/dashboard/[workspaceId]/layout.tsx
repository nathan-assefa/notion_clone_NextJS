import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

interface WrospaceLayoutProps {
  children: React.ReactNode;
  params: any;
}

const WrospaceLayout: React.FC<WrospaceLayoutProps> = ({
  children,
  params,
}) => {
  return (
    <div className="flex overflow-hidden h-screen w-screen">
      <Sidebar params={params} />

      <div className="dark:border-Neutrals-12/70 border-l-[1px] w-full relative ">
        {children}
      </div>
    </div>
  );
};

export default WrospaceLayout;
