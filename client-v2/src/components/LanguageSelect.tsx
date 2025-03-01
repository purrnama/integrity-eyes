"use client";
import { Select } from "@base-ui-components/react";
import { useLocale, useTranslations } from "next-intl";
import MiniChevronUpDownIcon from "./icons/MiniChevronUpDownIcon";
import MiniCheckIcon from "./icons/MiniCheckIcon";
import { useTransition } from "react";
import { routing, usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";

export default function LanguageSelect() {
  const intl = useTranslations("language-select");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const activeLocale = useLocale();

  const onSelectChange = (value: string) => {
    if (value !== activeLocale) {
      startTransition(() => {
        // @ts-expect-error skip params type check
        router.replace({ pathname, params }, { locale: value });
      });
    }
  };

  return (
    <Select.Root
      defaultValue={activeLocale}
      onValueChange={onSelectChange}
      disabled={isPending}
    >
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
        <Select.Positioner className={"outline-none"} sideOffset={8}>
          <Select.Popup
            className={
              "group origin-[var(--transform-origin)] rounded-md bg-[canvas] py-1 shadow-lg outline outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:transition-none data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none dark:shadow-none dark:-outline-offset-1 dark:outline-zinc-800"
            }
          >
            <Select.Arrow className={""}></Select.Arrow>
            {routing.locales.map((locale) => (
              <Select.Item
                className={
                  "grid min-w-[var(--anchor-width)] cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-none select-none group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-sm group-data-[side=none]:leading-4 data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-md data-[highlighted]:before:bg-zinc-800"
                }
                value={locale}
                key={locale}
              >
                <Select.ItemIndicator className={"col-start-1"}>
                  <MiniCheckIcon />
                </Select.ItemIndicator>
                <Select.ItemText className={"col-start-2"}>
                  {intl(locale)}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
