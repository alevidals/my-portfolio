import { insertWorkExperience } from "@/app/dashboard/work-experiences/_lib/actions";
import type { getUserWorkExperiences } from "@/app/dashboard/work-experiences/_lib/queries";
import {
  getMonths,
  getYears,
} from "@/app/dashboard/work-experiences/_lib/utils";
import { FormItem } from "@/components/form-item";
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconPlus, IconX } from "@tabler/icons-react";
import {
  type Dispatch,
  type SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

const MONTHS = getMonths();

type Props =
  | {
      workExperience: Awaited<
        ReturnType<typeof getUserWorkExperiences>
      >[number];
      externalIsOpen: boolean;
      externalSetIsOpen: Dispatch<SetStateAction<boolean>>;
    }
  | {
      workExperience?: never;
      externalIsOpen?: never;
      externalSetIsOpen?: never;
    };

export function AddWorkExperienceDialog({
  workExperience,
  externalIsOpen,
  externalSetIsOpen,
}: Props) {
  const [isOpen, setIsOpen] = workExperience
    ? [externalIsOpen, externalSetIsOpen]
    : useState(false);

  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");

  const [state, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
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

  useEffect(() => {
    if (!isOpen) {
      setStartMonth("");
      setStartYear("");
      setEndMonth("");
      setEndYear("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {!workExperience && (
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>
            <IconPlus />
            <span>Add New Work Experience</span>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="p-0 [&>button]:hidden gap-0">
        <DialogHeader className="border-b px-6 py-3">
          <DialogTitle className="flex items-center justify-between">
            <span>Add New Work Experience</span>
            <DialogClose asChild>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
              >
                <IconX />
              </Button>
            </DialogClose>
          </DialogTitle>
          <DialogDescription>
            Add your work experience details here.
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-3">
          <form
            action={formAction}
            className="grid gap-4"
            id="work-experience-form"
          >
            <FormItem
              id="companyName"
              name="companyName"
              itemType="input"
              type="text"
              required
              labelChildren="Company Name"
              placeholder="Company Name"
            />
            <FormItem
              id="position"
              name="position"
              itemType="input"
              type="text"
              required
              labelChildren="Position"
              placeholder="Position"
            />
            <FormItem
              id="description"
              name="description"
              itemType="textarea"
              labelChildren="Description"
              placeholder="Description"
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
                <SelectTrigger className="w-full !h-10" id="startMonth">
                  <SelectValue placeholder="Start Month" />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                <SelectTrigger className="w-full !h-10" id="startYear">
                  <SelectValue placeholder="Start Year" />
                </SelectTrigger>
                <SelectContent>
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
            </div>
            <div className="grid gap-3">
              <Label htmlFor="endMonth">End Month</Label>
              <Select
                // needed because there is a bug with uncontrolled shadcn select
                name={endMonth && "endMonth"}
                value={endMonth}
                onValueChange={setEndMonth}
                disabled={!startMonth || !startYear}
              >
                <SelectTrigger className="w-full !h-10" id="endMonth">
                  <SelectValue placeholder="End Month" />
                </SelectTrigger>
                <SelectContent>
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
            </div>
            <div className="grid gap-3">
              <Label htmlFor="endYear">End Year</Label>
              <Select
                // needed because there is a bug with uncrontrolled shadcn select
                name={endYear && "endYear"}
                value={endYear}
                onValueChange={(value) => {
                  setEndYear(value);
                  if (value === startYear && value !== endYear) {
                    setEndMonth("");
                  }
                }}
                disabled={!startMonth || !startYear}
              >
                <SelectTrigger className="w-full !h-10" id="endYear">
                  <SelectValue placeholder="End Year" />
                </SelectTrigger>
                <SelectContent>
                  {getYears({
                    initialYear: Number(startYear) || new Date().getFullYear(),
                  }).map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DialogFooter className="px-6 py-3">
          <LoadingButton
            isLoading={isPending}
            type="submit"
            form="work-experience-form"
          >
            Add Work Experience
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
