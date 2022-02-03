import dynamic from "next/dynamic";
import React, { FC } from "react";
import Wrapper from "./Wrapper";

type LayoutProps = {
  variant?: "small" | "regular";
};

const NavBarWithNoSsr = dynamic(() => import("../components/NavBar"), {
  ssr: false,
});

const Layout: FC<LayoutProps> = ({ variant, children }) => {
  return (
    <>
      <NavBarWithNoSsr />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
