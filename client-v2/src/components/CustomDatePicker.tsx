"use client";

import ClientLocalizationProvider from "@/lib/ClientLocalizationProvider";
import MiniCalendarIcon from "./icons/MiniCalendarIcon";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  BaseSingleInputFieldProps,
  DatePicker,
  DateValidationError,
  FieldSection,
  UseDateFieldProps,
} from "@mui/x-date-pickers";
import AppTheme from "@/theme/AppTheme";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MiniXMarkIcon from "./icons/MiniXMarkIcon";

interface ButtonFieldProps
  extends UseDateFieldProps<Dayjs, false>,
    BaseSingleInputFieldProps<
      Dayjs | null,
      Dayjs,
      FieldSection,
      false,
      DateValidationError
    > {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

function ButtonField(props: ButtonFieldProps) {
  const intl = useTranslations("procurement-transparency");
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;
  return (
    <button
      className={
        "transition flex flex-row border hover:bg-black/5 border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600 rounded-lg py-2 px-3 hover:cursor-pointer"
      }
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
    >
      <MiniCalendarIcon />
      <span
        className={
          "font-sans text-sm font-medium sm:ml-2 " +
          (!label && "hidden sm:inline ")
        }
      >
        {label ? `${label}` : intl("Select Date")}
      </span>
    </button>
  );
}

export default function CustomDatePicker() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const [value, setValue] = useState<Dayjs | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (month && year) {
      const date = dayjs(new Date(Number(year), Number(month)));
      setValue(date);
    }
  }, [month, year]);

  const handleOnChangeDate = (value: Dayjs | null) => {
    if (value) {
      setValue(value);
      router.replace(
        pathname + "?month=" + value.month() + "&year=" + value.year()
      );
    }
  };

  const handleOnClearDate = () => {
    setValue(null);
    router.replace(pathname);
  };

  return (
    <AppTheme>
      <div className="flex flex-row space-x-2 items-center">
        <ClientLocalizationProvider>
          <DatePicker
            value={value}
            label={value == null ? null : value.format("MMM YYYY")}
            onChange={handleOnChangeDate}
            slots={{ field: ButtonField }}
            slotProps={{
              /* eslint-disable @typescript-eslint/no-explicit-any*/
              field: {
                setOpen,
                clearable: true,
                onClear: () => handleOnClearDate,
              } as any,
              nextIconButton: { size: "small" },
              previousIconButton: { size: "small" },
            }}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            views={["month", "year"]}
          />
        </ClientLocalizationProvider>
        {value && (
          <button
            onClick={handleOnClearDate}
            className={
              "transition flex flex-row border hover:bg-black/5 border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600 rounded-lg py-2 px-3 hover:cursor-pointer"
            }
          >
            <MiniXMarkIcon />
          </button>
        )}
      </div>
    </AppTheme>
  );
}
