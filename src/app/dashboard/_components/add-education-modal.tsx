"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect, useRef, useState } from "react";
import { addEducation } from "@/app/dashboard/_actions";

type GetYearsParams = {
  initialYear: number;
  amount?: number;
};

export function AddEducationModal() {
  const [state, action, pending] = useActionState(addEducation, null);
  const [startMonth, setStartMonth] = useState(state?.data?.startMonth || "");
  const [startYear, setStartYear] = useState(state?.data?.startYear || "");
  const [endMonth, setEndMonth] = useState(state?.data?.endMonth || "");
  const [endYear, setEndYear] = useState(state?.data?.endYear || "");
  const [endYearKey, setEndYearKey] = useState(+new Date());
  const [endMonthKey, setEndMonthKey] = useState(+new Date());
  const buttonRef = useRef<HTMLButtonElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: this effect should only run when startYear changes
  useEffect(() => {
    setEndYearKey(+new Date());
    setEndMonthKey(+new Date());
    setEndYear("");
    setEndMonth("");
  }, [startYear]);

  useEffect(() => {
    if (state?.success) {
      setStartMonth("");
      setStartYear("");
      setEndMonth("");
      setEndYear("");
      buttonRef.current?.click();
    }
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild ref={buttonRef}>
        <Button className="rounded-full">
          <Plus />
          <span>Add education</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add education</DialogTitle>
          <DialogDescription>
            Add a new education to your portfolio.
          </DialogDescription>
        </DialogHeader>
        <div>
          <form id="addEducationForm" action={action} className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="institution">Institution</Label>
              <Input
                type="text"
                id="institution"
                name="institution"
                defaultValue={state?.data?.institution}
                required
                placeholder="Institution"
              />
              {state?.errors?.institution && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {state?.errors?.institution}
                </p>
              )}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="degree">Degree</Label>
              <Input
                type="text"
                id="degree"
                name="degree"
                defaultValue={state?.data?.degree}
                required
                placeholder="Degree"
              />
              {state?.errors?.degree && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {state?.errors?.degree}
                </p>
              )}
            </div>
            <fieldset>
              <legend className="mb-2">Start date</legend>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="startMonth">Start month</Label>
                  <Select
                    name="startMonth"
                    required
                    defaultValue={startMonth}
                    onValueChange={(value) => setStartMonth(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Start month" />
                    </SelectTrigger>
                    <SelectContent id="startMonth">
                      {MONTHS.map((month) => (
                        <SelectItem value={month.value} key={month.label}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="startYear">Start year</Label>
                  <Select
                    name="startYear"
                    required
                    defaultValue={startYear}
                    onValueChange={(value) => setStartYear(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Start year" />
                    </SelectTrigger>
                    <SelectContent id="startYear">
                      {getYears({
                        initialYear: new Date().getFullYear(),
                        amount: 50,
                      }).map((year) => (
                        <SelectItem value={year} key={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {state?.errors?.startYear && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {state?.errors?.startYear}
                </p>
              )}
              {state?.errors?.startMonth && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {state?.errors?.startMonth}
                </p>
              )}
            </fieldset>
            <fieldset>
              <legend className="mb-2">End date</legend>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="endMonth">End month</Label>
                  <Select
                    key={endMonthKey}
                    name="endMonth"
                    defaultValue={endMonth}
                    onValueChange={(value) => setEndMonth(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="End month" />
                    </SelectTrigger>
                    <SelectContent id="endMonth">
                      {MONTHS.map((month) => (
                        <SelectItem value={month.value} key={month.value}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="endYear">End year</Label>
                  <Select
                    key={endYearKey}
                    name="endYear"
                    defaultValue={endYear}
                    onValueChange={(value) => setEndYear(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="End year" />
                    </SelectTrigger>
                    <SelectContent id="endYear">
                      {getYears({
                        initialYear: startYear
                          ? Number.parseInt(startYear)
                          : 2020,
                      }).map((year) => (
                        <SelectItem value={year} key={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {state?.errors?.endYear && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {state?.errors?.endYear}
                </p>
              )}
              {state?.errors?.endMonth && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {state?.errors?.endMonth}
                </p>
              )}
            </fieldset>
            <input type="hidden" name="startMonth" value={startMonth} />
            <input type="hidden" name="startYear" value={startYear} />
            <input type="hidden" name="endMonth" value={endMonth} />
            <input type="hidden" name="endYear" value={endYear} />
          </form>
        </div>
        <DialogFooter>
          <Button type="submit" form="addEducationForm" disabled={pending}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const MONTHS = [
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

function getYears({ initialYear, amount }: GetYearsParams) {
  const actualYear = new Date().getFullYear();
  const yearsCount =
    initialYear === actualYear && amount
      ? amount
      : actualYear - initialYear + 1;

  return Array.from({ length: yearsCount }, (_, index) =>
    String(actualYear - index),
  );
}
