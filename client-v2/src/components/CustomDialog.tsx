"use client";

import { Dialog } from "@base-ui-components/react";
import { ReactNode } from "react";

export default function CustomDialog({
  icon,
  triggerTitle,
  dialogTitle,
  dialogContent,
  dialogClose,
}: {
  icon?: ReactNode;
  triggerTitle?: string;
  dialogTitle: string;
  dialogContent: ReactNode;
  dialogClose: string;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={
          "transition flex flex-row border hover:bg-black/5 border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600 rounded-lg py-2 px-3 hover:cursor-pointer"
        }
      >
        {icon}
        <span
          className={
            "hidden sm:inline font-sans text-sm font-medium" +
            (icon && " sm:ml-2")
          }
        >
          {triggerTitle}
        </span>
      </Dialog.Trigger>
      <Dialog.Portal keepMounted>
        <Dialog.Backdrop
          className={
            "fixed inset-0 bg-black/20 dark:bg-black/50 animate-fade-in"
          }
        >
          <Dialog.Popup
            className={
              "fixed flex flex-col space-y-4 bottom-0 lg:bottom-auto lg:top-[50%] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%] w-full lg:w-2xl p-8 border border-zinc-300 dark:border-zinc-700/50 bg-zinc-100 dark:bg-zinc-900 rounded-t-lg lg:rounded-lg transition animate-fade-in-bottom lg:animate-fade-in-scale"
            }
          >
            <Dialog.Title className={"font-medium text-xl"}>
              {dialogTitle}
            </Dialog.Title>
            <div className="mb-8">{dialogContent}</div>
            <div className="flex justify-end">
              <Dialog.Close
                className={
                  "border hover:bg-black/5 dark:hover:border-zinc-600 border-zinc-300 dark:border-zinc-700 hover:cursor-pointer rounded-lg py-2 px-3"
                }
              >
                {dialogClose}
              </Dialog.Close>
            </div>
          </Dialog.Popup>
        </Dialog.Backdrop>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
