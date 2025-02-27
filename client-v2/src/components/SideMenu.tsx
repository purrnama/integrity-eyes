import Image from "next/image";
import MenuContent from "./MenuContent";

export default function SideMenu() {
  return (
    <div className="hidden lg:flex flex-col w-72 border-r border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="p-4 py-6 flex flex-row items-center space-x-4 border-b border-zinc-300 dark:border-zinc-800">
        <Image
          src="/integrity-eyes-logo.png"
          alt="logo"
          height={32}
          width={32}
          className="rounded-full"
        />
        <h1 className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text font-bold text-transparent">
          Integrity Eyes
        </h1>
      </div>
      <div className="flex flex-col p-4 h-full overflow-auto">
        <MenuContent />
      </div>
    </div>
  );
}
