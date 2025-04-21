"use client";

import MiniCheckIcon from "@/components/icons/MiniCheckIcon";
import MiniFunnelIcon from "@/components/icons/MiniFunnelIcon";
import { Select } from "@base-ui-components/react";
import { useTranslations } from "next-intl";

export default function HeatmapFilter({
  agencies,
  onValueChange,
}: {
  agencies: string[];
  onValueChange?: (value: unknown, event?: Event) => void;
}) {
  const intl = useTranslations("heatmap");
  return (
    <Select.Root onValueChange={onValueChange}>
      <Select.Trigger
        className={
          "flex items-center min-w-42 justify-between py-2 px-3 rounded-lg gap-2 font-sans text-sm border border-zinc-300 dark:border-zinc-800"
        }
      >
        <Select.Value className={"truncate"} placeholder={intl("Filter")} />
        <Select.Icon className={""}>
          <MiniFunnelIcon />
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
            {agencies?.map((agency) => (
              <Select.Item
                className={
                  "grid min-w-[var(--anchor-width)] cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-none select-none group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-sm group-data-[side=none]:leading-4 data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-md data-[highlighted]:before:bg-zinc-800"
                }
                value={agency}
                key={agency}
              >
                <Select.ItemIndicator className={"col-start-1"}>
                  <MiniCheckIcon />
                </Select.ItemIndicator>
                <Select.ItemText className={"col-start-2"}>
                  {agency}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
