"use client";

import ClientLocalizationProvider from "@/lib/ClientLocalizationProvider";
import MiniCalendarIcon from "./icons/MiniCalendarIcon";

export default function CustomDatePicker() {
  return (
    <ClientLocalizationProvider>
      <button
        onClick={() => {}}
        className="transition flex flex-row sm:space-x-2 border hover:bg-black/5 border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600 rounded-lg py-2 px-3 hover:cursor-pointer"
      >
        <MiniCalendarIcon />
        <span className="hidden sm:inline font-sans text-sm font-medium">
          Select Date
        </span>
      </button>
    </ClientLocalizationProvider>
  );
}
