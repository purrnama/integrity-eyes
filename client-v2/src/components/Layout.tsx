import { ReactNode } from "react";
import SideMenu from "./SideMenu";
import AppNavbar from "./AppNavbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={"Root flex h-screen"}>
      <SideMenu />
      <AppNavbar />
      <div className="mt-16 lg:mt-0 flex flex-col flex-1 overflow-y-auto p-4">
        {children}
      </div>
    </div>
  );
}
