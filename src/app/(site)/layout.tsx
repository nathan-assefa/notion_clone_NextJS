import React from "react";

interface Props {
  children: React.ReactNode;
}

const HomepageLayout: React.FC<Props> = ({ children }) => {
  return <main>{children}</main>;
};

export default HomepageLayout;
