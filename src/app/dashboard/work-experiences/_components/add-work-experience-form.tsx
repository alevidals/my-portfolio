import { insertWorkExperience } from "@/app/dashboard/work-experiences/_lib/actions";
import type { getUserWorkExperiences } from "@/app/dashboard/work-experiences/_lib/queries";
import {
  getMonths,
  getYears,
} from "@/app/dashboard/work-experiences/_lib/utils";
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
import {
  type Dispatch,
  type SetStateAction,
  useActionState,
  useState,
} from "react";
import { toast } from "sonner";

type Props = {
  workExperience?: Awaited<ReturnType<typeof getUserWorkExperiences>>[number];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const MONTHS = getMonths();

export function AddWorkExperienceForm({ workExperience, setIsOpen }: Props) {
  const [state, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      // due to shadcn select has bugs with uncontrolled components we need to
      // set the values
      formData.set("startMonth", startMonth);
      formData.set("startYear", startYear);
      formData.set("endMonth", endMonth);
      formData.set("endYear", endYear);

      const response = await insertWorkExperience(_, formData);

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

  const [startMonth, setStartMonth] = useState(state?.data?.startMonth ?? "");
  const [startYear, setStartYear] = useState(state?.data?.startYear ?? "");
  const [endMonth, setEndMonth] = useState(state?.data?.endMonth ?? "");
  const [endYear, setEndYear] = useState(state?.data?.endYear ?? "");

  return (
    <form action={formAction} className="grid gap-4" id="work-experience-form">
      <FormItem
        id="companyName"
        name="companyName"
        itemType="input"
        type="text"
        required
        labelChildren="Company Name"
        placeholder="Company Name"
        defaultValue={state?.data?.companyName}
        error={state?.errors?.companyName}
      />
      <FormItem
        id="position"
        name="position"
        itemType="input"
        type="text"
        required
        labelChildren="Position"
        placeholder="Position"
        defaultValue={state?.data?.position}
        error={state?.errors?.position}
      />
      <FormItem
        id="description"
        name="description"
        itemType="textarea"
        labelChildren="Description"
        placeholder="Description"
        defaultValue={state?.data?.description}
        error={state?.errors?.description}
      />
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
      <LoadingButton
        className="justify-self-end"
        isLoading={isPending}
        type="submit"
      >
        Add Work Experience
      </LoadingButton>
    </form>
  );
}
