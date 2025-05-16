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
      value: "01",
    },
    {
      label: "February",
      value: "02",
    },
    {
      label: "March",
      value: "03",
    },
    {
      label: "April",
      value: "04",
    },
    {
      label: "May",
      value: "05",
    },
    {
      label: "June",
      value: "06",
    },
    {
      label: "July",
      value: "07",
    },
    {
      label: "August",
      value: "08",
    },
    {
      label: "September",
      value: "09",
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

type FormatDateParams = {
  month: string;
  year: number;
};

export function formatDate({ month, year }: FormatDateParams) {
  const date = new Date(`${year}-${month}-01`);

  const formatter = new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  });

  return formatter.format(date);
}
