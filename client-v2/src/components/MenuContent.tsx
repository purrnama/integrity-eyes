"use client";

import { ReactNode } from "react";
import MiniChartBarSquareIcon from "./icons/MiniChartBarSquareIcon";
import MiniHomeIcon from "./icons/MiniHomeIcon";
import MiniFlagIcon from "./icons/MiniFlagIcon";
import MiniEyeIcon from "./icons/MiniEyeIcon";
import MiniCircleStackIcon from "./icons/MiniCircleStackIcon";
import MiniCheckCircleIcon from "./icons/MiniCheckCircleIcon";
import MiniSettingsIcon from "./icons/MiniSettingsIcon";

import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSelect from "./LanguageSelect";

interface Item {
  text: string;
  icon: ReactNode;
  href: string;
}

const mainListItems: Item[] = [
  { text: "Home", icon: <MiniHomeIcon />, href: "/" },
  {
    text: "Procurement Transparency",
    icon: <MiniCircleStackIcon />,
    href: "/procurement-transparency",
  },
  { text: "Risk Management", icon: <MiniEyeIcon />, href: "/risk-management" },
  {
    text: "Project Performance",
    icon: <MiniChartBarSquareIcon />,
    href: "/project-performance",
  },
  {
    text: "Risks & Red Flags",
    icon: <MiniFlagIcon />,
    href: "/risks-and-red-flags",
  },
  {
    text: "Stakeholder Feedback",
    icon: <MiniCheckCircleIcon />,
    href: "/stakeholder-feedback",
  },
];

const secondaryListItems: Item[] = [
  { text: "Settings", icon: <MiniSettingsIcon />, href: "/settings" },
];

export default function MenuContent() {
  const pathname = usePathname();
  const intl = useTranslations("menu-content");
  return (
    <div className="flex flex-col grow justify-between">
      <ul className="flex flex-col">
        {mainListItems.map((item, index) => (
          <li
            key={index}
            className={
              "block rounded-lg" +
              (pathname == item.href
                ? " bg-black/5 dark:bg-white/5"
                : " opacity-70")
            }
          >
            <Link
              //@ts-expect-error type
              href={item.href}
              className="transition flex flex-row space-x-4 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg"
            >
              <>{item.icon}</>
              <span className="text-sm font-medium">{intl(item.text)}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col space-y-2">
        <LanguageSelect />
        {secondaryListItems.map((item, index) => (
          <li
            key={index}
            className={
              "block rounded-lg" +
              (pathname == item.href
                ? " bg-black/5 dark:bg-white/5"
                : " opacity-70")
            }
          >
            <Link
              //@ts-expect-error type
              href={item.href}
              className="transition flex flex-row space-x-4 p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg"
            >
              <>{item.icon}</>
              <span className="text-sm font-medium">{intl(item.text)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
