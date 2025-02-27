"use client";

import MiniBarsIcon from "./icons/MiniBarsIcon";
import { Dialog } from "@base-ui-components/react";
import MenuContent from "./MenuContent";

export default function SideMenuMobile() {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={
          "transition flex flex-row space-x-2 border hover:bg-black/5 border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600 rounded-lg p-2 hover:cursor-pointer"
        }
      >
        <MiniBarsIcon />
      </Dialog.Trigger>
      <Dialog.Portal keepMounted>
        <Dialog.Backdrop
          className={
            "fixed inset-0 bg-black/20 dark:bg-black/50 animate-fade-in"
          }
        >
          <Dialog.Popup
            className={
              "fixed flex flex-col space-y-2 right-0 w-72 h-full border-l border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 transition animate-side-menu-mobile"
            }
          >
            <div className="p-4 py-6 flex flex-row items-center space-x-4 border-b border-zinc-300 dark:border-zinc-800"></div>
            <div className="flex flex-col p-4 h-full overflow-auto">
              <MenuContent />
            </div>
          </Dialog.Popup>
        </Dialog.Backdrop>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
