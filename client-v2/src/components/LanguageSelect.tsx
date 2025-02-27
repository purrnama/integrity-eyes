"use client";
import { Select } from "@base-ui-components/react";
import { useLocale } from "next-intl";
//import { useRouter } from "next/navigation";
import MiniChevronUpDownIcon from "./icons/MiniChevronUpDownIcon";
import MiniCheckIcon from "./icons/MiniCheckIcon";

export default function LanguageSelect() {
  //const router = useRouter();
  const activeLocale = useLocale();
  return (
    <Select.Root defaultValue={activeLocale}>
      <Select.Trigger
        className={
          "flex items-center justify-between py-2 px-3 rounded-lg gap-2 font-sans text-sm border border-zinc-300 dark:border-zinc-800"
        }
      >
        <Select.Value placeholder={activeLocale} />
        <Select.Icon className={""}>
          <MiniChevronUpDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner className={""} sideOffset={8}>
          <Select.Popup className={""}>
            <Select.Arrow className={""}></Select.Arrow>
            <Select.Item className={""} value="en-US">
              <Select.ItemIndicator className={""}>
                <MiniCheckIcon />
              </Select.ItemIndicator>
              <Select.ItemText className={""}>English</Select.ItemText>
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
