import {
  insertEducation,
  updateEducation,
} from "@/app/(app)//dashboard/educations/_lib/actions";
import { FormItem } from "@/components/form-item";
import { LoadingButton } from "@/components/loading-button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { getUserEducations } from "@/lib/queries";
import { getMonths, getYears } from "@/lib/utils";
import {
  type Dispatch,
  type SetStateAction,
  useActionState,
  useState,
} from "react";
import { toast } from "sonner";

type Props = {
  education?: Awaited<ReturnType<typeof getUserEducations>>[number];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const MONTHS = getMonths();

export function AddEducationForm({ education, setIsOpen }: Props) {
  const [state, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      // due to shadcn select have bugs with uncontrolled components we need to
      // set the values
      formData.set("startMonth", startMonth);
      formData.set("startYear", startYear);
      formData.set("endMonth", endMonth);
      formData.set("endYear", endYear);

      const action = education ? updateEducation : insertEducation;

      const response = await action(_, formData);

      if (response.success) {
        setIsOpen(false);
        toast.success(response.message);
        return;
      }

      toast.error(response.error);

      return response;
    },
    null,
  );

  const [startMonth, setStartMonth] = useState(
    state?.data?.startMonth ?? education?.startDate.month ?? "",
  );
  const [startYear, setStartYear] = useState(
    state?.data?.startYear ?? education?.startDate.year ?? "",
  );
  const [endMonth, setEndMonth] = useState(
    state?.data?.endMonth ?? education?.endDate?.month ?? "",
  );
  const [endYear, setEndYear] = useState(
    state?.data?.endYear ?? education?.endDate?.year ?? "",
  );

  const buttonText = education ? "Edit Education" : "Add Education";

  return (
    <form action={formAction} className="grid gap-4" id="work-experience-form">
      <FormItem
        id="institution"
        name="institution"
        itemType="input"
        type="text"
        required
        labelChildren="Institution"
        placeholder="Institution"
        defaultValue={state?.data?.institution ?? education?.institution}
        error={state?.errors?.institution}
      />
      <FormItem
        id="degree"
        name="degree"
        itemType="input"
        type="text"
        required
        labelChildren="Degree"
        placeholder="Degree"
        defaultValue={state?.data?.degree ?? education?.degree}
        error={state?.errors?.degree}
      />
      <FormItem
        id="description"
        name="description"
        itemType="textarea"
        labelChildren="Description"
        placeholder="Description"
        defaultValue={state?.data?.description ?? education?.description ?? ""}
        error={state?.errors?.description}
      />
      <p>{state?.data?.description ?? education?.description}</p>
      <div className="grid gap-3">
        <Label htmlFor="startMonth">Start Month</Label>
        <Select
          name="startMonth"
          value={startMonth}
          onValueChange={(value) => {
            setStartMonth(value);
            setEndMonth("");
          }}
        >
          <SelectTrigger className="w-full !h-10">
            <SelectValue placeholder="Start Month" />
          </SelectTrigger>
          <SelectContent id="startMonth">
            {MONTHS.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state?.errors?.startMonth && (
          <p className="text-red-500 text-sm">{state.errors.startMonth}</p>
        )}
      </div>
      <div className="grid gap-3">
        <Label htmlFor="startYear">Start Year</Label>
        <Select
          name="startYear"
          value={startYear}
          onValueChange={(value) => {
            setStartYear(value);
            setEndMonth("");
            setEndYear("");
          }}
        >
          <SelectTrigger className="w-full !h-10">
            <SelectValue placeholder="Start Year" />
          </SelectTrigger>
          <SelectContent id="startYear">
            {getYears({
              initialYear: new Date().getFullYear(),
              amount: 50,
            }).map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state?.errors?.startYear && (
          <p className="text-red-500 text-sm">{state.errors.startYear}</p>
        )}
      </div>
      <div className="grid gap-3">
        <Label htmlFor="endMonth">End Month</Label>
        <Select
          value={endMonth}
          onValueChange={setEndMonth}
          disabled={!startMonth || !startYear}
        >
          <SelectTrigger className="w-full !h-10">
            <SelectValue placeholder="End Month" />
          </SelectTrigger>
          <SelectContent id="endMonth">
            {MONTHS.filter((month) => {
              if (startYear === endYear) {
                return month.value >= startMonth;
              }

              return true;
            }).map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state?.errors?.endMonth && (
          <p className="text-red-500 text-sm">{state.errors.endMonth}</p>
        )}
      </div>
      <div className="grid gap-3">
        <Label htmlFor="endYear">End Year</Label>
        <Select
          value={endYear}
          onValueChange={(value) => {
            setEndYear(value);
            if (value === startYear && value !== endYear) {
              setEndMonth("");
            }
          }}
          disabled={!startMonth || !startYear}
        >
          <SelectTrigger className="w-full !h-10">
            <SelectValue placeholder="End Year" />
          </SelectTrigger>
          <SelectContent id="endYear">
            {getYears({
              initialYear: Number(startYear) || new Date().getFullYear(),
            }).map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state?.errors?.endYear && (
          <p className="text-red-500 text-sm">{state.errors.endYear}</p>
        )}
      </div>
      {education && <input type="hidden" name="id" value={education.id} />}
      <LoadingButton
        className="justify-self-end"
        isLoading={isPending}
        type="submit"
      >
        {buttonText}
      </LoadingButton>
    </form>
  );
}
