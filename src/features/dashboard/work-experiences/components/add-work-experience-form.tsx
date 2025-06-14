import {
  insertWorkExperience,
  updateWorkExperience,
} from "@/features/dashboard/work-experiences/lib/actions";
import { FormItem } from "@/shared/components/form-item";
import { LoadingButton } from "@/shared/components/loading-button";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import type { getUserWorkExperiences } from "@/shared/lib/queries";
import { getMonths, getYears } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("workExperiences");

  const [state, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      // due to shadcn select have bugs with uncontrolled components we need to
      // set the values
      formData.set("startMonth", startMonth);
      formData.set("startYear", startYear);
      formData.set("endMonth", endMonth);
      formData.set("endYear", endYear);

      const action = workExperience
        ? updateWorkExperience
        : insertWorkExperience;

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
    state?.data?.startMonth ?? workExperience?.startDate.month ?? "",
  );
  const [startYear, setStartYear] = useState(
    state?.data?.startYear ?? workExperience?.startDate.year ?? "",
  );
  const [endMonth, setEndMonth] = useState(
    state?.data?.endMonth ?? workExperience?.endDate?.month ?? "",
  );
  const [endYear, setEndYear] = useState(
    state?.data?.endYear ?? workExperience?.endDate?.year ?? "",
  );

  const buttonText = workExperience
    ? t("editDialog.title")
    : t("addDialog.title");

  return (
    <form action={formAction} className="grid gap-4" id="work-experience-form">
      <FormItem
        id="companyName"
        name="companyName"
        itemType="input"
        type="text"
        required
        labelChildren={t("form.companyName")}
        placeholder={t("form.companyName")}
        defaultValue={state?.data?.companyName ?? workExperience?.companyName}
        error={state?.errors?.companyName}
      />
      <FormItem
        id="position"
        name="position"
        itemType="input"
        type="text"
        required
        labelChildren={t("form.position")}
        placeholder={t("form.position")}
        defaultValue={state?.data?.position ?? workExperience?.position}
        error={state?.errors?.position}
      />
      <FormItem
        id="description"
        name="description"
        itemType="textarea"
        labelChildren={t("form.description")}
        placeholder={t("form.description")}
        inputClassName="h-32"
        defaultValue={
          state?.data?.description ?? workExperience?.description ?? ""
        }
        error={state?.errors?.description}
      />
      <div className="grid gap-3">
        <Label htmlFor="startMonth">{t("form.startMonth")}</Label>
        <Select
          name="startMonth"
          value={startMonth}
          onValueChange={(value) => {
            setStartMonth(value);
            setEndMonth("");
          }}
        >
          <SelectTrigger className="w-full !h-10">
            <SelectValue placeholder={t("form.startMonth")} />
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
        <Label htmlFor="startYear">{t("form.startYear")}</Label>
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
            <SelectValue placeholder={t("form.startYear")} />
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
        <Label htmlFor="endMonth">{t("form.endMonth")}</Label>
        <Select
          value={endMonth}
          onValueChange={setEndMonth}
          disabled={!startMonth || !startYear}
        >
          <SelectTrigger className="w-full !h-10">
            <SelectValue placeholder={t("form.endMonth")} />
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
        <Label htmlFor="endYear">{t("form.endYear")}</Label>
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
            <SelectValue placeholder={t("form.endYear")} />
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
      {workExperience && (
        <input type="hidden" name="id" value={workExperience.id} />
      )}
      <LoadingButton
        className="justify-self-end w-full md:w-fit"
        isLoading={isPending}
        type="submit"
      >
        {buttonText}
      </LoadingButton>
    </form>
  );
}
