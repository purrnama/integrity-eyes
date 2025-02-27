"use client";

import Image from "next/image";
import SideMenuMobile from "./SideMenuMobile";

export default function AppNavbar() {
  return (
    <div className="z-10 fixed flex flex-row w-full justify-between p-4 lg:hidden border-b border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
      <div className="flex flex-row items-center space-x-4 border-zinc-300 dark:border-zinc-800">
        <Image
          src="/integrity-eyes-logo.png"
          alt="logo"
          height={36}
          width={36}
          className="rounded-full"
        />
        <h1 className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text font-bold text-lg text-transparent">
          Integrity Eyes
        </h1>
      </div>
      <SideMenuMobile />
    </div>
  );
}
