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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect, useState } from "react";
import { addEducation } from "@/app/dashboard/_actions";
import { Plus } from "lucide-react";

type GetYearsParams = {
  initialYear: number;
  amount?: number;
};

export function AddEducationModal() {
  const [state, action, pending] = useActionState(addEducation, null);
  const [isOpen, setIsOpen] = useState(false);
  const [startMonth, setStartMonth] = useState(state?.data?.startMonth || "");
  const [startYear, setStartYear] = useState(state?.data?.startYear || "");
  const [endMonth, setEndMonth] = useState(state?.data?.endMonth || "");
  const [endYear, setEndYear] = useState(state?.data?.endYear || "");

  useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full" onClick={() => setIsOpen(true)}>
          <Plus />
          <span>Add education</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add education</DialogTitle>
          <DialogDescription>
            Add a new education to your portfolio
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
                    defaultValue={state?.data?.startMonth}
                    onValueChange={setStartMonth}
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
                    defaultValue={state?.data?.startYear}
                    onValueChange={setStartYear}
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
                    key={startYear}
                    name="endMonth"
                    defaultValue={state?.data?.endMonth}
                    disabled={!startMonth || !startYear}
                    onValueChange={setEndMonth}
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
                    key={startYear}
                    name="endYear"
                    disabled={!startMonth || !startYear}
                    defaultValue={state?.data?.endYear}
                    onValueChange={setEndYear}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="End year" />
                    </SelectTrigger>
                    <SelectContent id="endYear">
                      {getYears({
                        initialYear:
                          Number(startYear) || new Date().getFullYear(),
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
            <input type="hidden" name="startYear" value={startYear} />
            <input type="hidden" name="startMonth" value={startMonth} />
            <input type="hidden" name="endYear" value={endYear} />
            <input type="hidden" name="endMonth" value={endMonth} />
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
