import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormatDateParams = {
  month: string;
  year: string;
  monthFormat?: Intl.DateTimeFormatOptions["month"];
};

export function formatDate({
  month,
  year,
  monthFormat = "long",
}: FormatDateParams) {
  const parsedMonth = month.padStart(2, "0");
  const date = new Date(`${year}-${parsedMonth}-01`);

  const formatter = new Intl.DateTimeFormat("en", {
    month: monthFormat,
    year: "numeric",
  });

  return formatter.format(date);
}

type GetYearsParams = {
  initialYear: number;
  amount?: number;
};

export function getYears({ initialYear, amount }: GetYearsParams) {
  const actualYear = new Date().getFullYear();
  const yearsCount =
    initialYear === actualYear && amount
      ? amount
      : actualYear - initialYear + 1;

  return Array.from({ length: yearsCount }, (_, index) =>
    String(actualYear - index),
  );
}

export function getMonths() {
  return [
    {
      label: "January",
      value: "1",
    },
    {
      label: "February",
      value: "2",
    },
    {
      label: "March",
      value: "3",
    },
    {
      label: "April",
      value: "4",
    },
    {
      label: "May",
      value: "5",
    },
    {
      label: "June",
      value: "6",
    },
    {
      label: "July",
      value: "7",
    },
    {
      label: "August",
      value: "8",
    },
    {
      label: "September",
      value: "9",
    },
    {
      label: "October",
      value: "10",
    },
    {
      label: "November",
      value: "11",
    },
    {
      label: "December",
      value: "12",
    },
  ];
}
