import { addEducation, editEducation } from "@/app/dashboard/_actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { getEducations } from "@/lib/db/queries/educations";
import { getYears } from "@/lib/utils";
import {
  type Dispatch,
  type SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";

type Props = {
  education?: Awaited<ReturnType<typeof getEducations>>[number];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsPending: Dispatch<SetStateAction<boolean>>;
};

export function AddEducationForm({
  setIsOpen,
  setIsPending,
  education,
}: Props) {
  const [state, action, pending] = useActionState(
    education ? editEducation : addEducation,
    null,
  );

  const [startMonth, setStartMonth] = useState(
    state?.data?.startMonth ?? education?.startDate.split("-")[1] ?? "",
  );
  const [startYear, setStartYear] = useState(
    state?.data?.startYear ?? education?.startDate.split("-")[0] ?? "",
  );
  const [endMonth, setEndMonth] = useState(
    state?.data?.endMonth ?? education?.endDate?.split("-")[1] ?? "",
  );
  const [endYear, setEndYear] = useState(
    state?.data?.endYear ?? education?.endDate?.split("-")[0] ?? "",
  );

  useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
      setStartMonth("");
      setStartYear("");
      setEndMonth("");
      setEndYear("");
    }
  }, [state, setIsOpen]);

  useEffect(() => {
    setIsPending(pending);
  }, [pending, setIsPending]);

  return (
    <form id="addEducationForm" action={action} className="grid gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="institution">Institution</Label>
        <Input
          type="text"
          id="institution"
          name="institution"
          defaultValue={state?.data?.institution || education?.institution}
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
          defaultValue={state?.data?.degree || education?.degree}
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
              defaultValue={startYear}
              onValueChange={(value) => {
                setStartYear(value);
                setEndMonth("");
                setEndYear("");
              }}
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
              defaultValue={endMonth}
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
              defaultValue={endYear}
              onValueChange={setEndYear}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="End year" />
              </SelectTrigger>
              <SelectContent id="endYear">
                {getYears({
                  initialYear: Number(startYear) || new Date().getFullYear(),
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
      <input type="hidden" name="id" value={education?.id} />
      <input type="hidden" name="startYear" value={startYear} />
      <input type="hidden" name="startMonth" value={startMonth} />
      <input type="hidden" name="endYear" value={endYear} />
      <input type="hidden" name="endMonth" value={endMonth} />
    </form>
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
