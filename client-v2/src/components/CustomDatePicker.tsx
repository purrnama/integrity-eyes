"use client";

import ClientLocalizationProvider from "@/lib/ClientLocalizationProvider";
import MiniCalendarIcon from "./icons/MiniCalendarIcon";
import { Dispatch, SetStateAction, useState } from "react";
import { Dayjs } from "dayjs";
import {
  BaseSingleInputFieldProps,
  DatePicker,
  DateValidationError,
  FieldSection,
  UseDateFieldProps,
} from "@mui/x-date-pickers";
import AppTheme from "@/theme/AppTheme";
import { useTranslations } from "next-intl";

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
  const [value, setValue] = useState<Dayjs | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AppTheme>
      <ClientLocalizationProvider>
        <DatePicker
          value={value}
          label={value == null ? null : value.format("MMM YYYY")}
          onChange={(newValue) => setValue(newValue)}
          slots={{ field: ButtonField }}
          slotProps={{
            /* eslint-disable @typescript-eslint/no-explicit-any*/
            field: { setOpen } as any,
            nextIconButton: { size: "small" },
            previousIconButton: { size: "small" },
          }}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          views={["month", "year"]}
        />
      </ClientLocalizationProvider>
    </AppTheme>
  );
}
