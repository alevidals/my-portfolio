import { AddExperienceModal } from "@/app/(dashboard)/dashboard/_components/add-experience-modal";
import { DeleteExperienceDialog } from "@/app/(dashboard)/dashboard/_components/delete-experience-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { getExperiences } from "@/lib/db/queries/experiences";
import { formatDate } from "@/lib/utils";

type Props = {
  experiences: Awaited<ReturnType<typeof getExperiences>>;
};

export function Experiences({ experiences }: Props) {
  return (
    <section>
      <header className="flex justify-between items-center">
        <h2 className="text-3xl mb-4">Experiences</h2>
        <AddExperienceModal />
      </header>
      {experiences.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Start date</TableHead>
              <TableHead>End date</TableHead>
              <TableHead className="text-end">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experiences.map((experience) => (
              <TableRow key={experience.id}>
                <TableCell>{experience.companyName}</TableCell>
                <TableCell>{experience.position}</TableCell>
                <TableCell>
                  {formatDate({ date: experience.startDate })}
                </TableCell>
                <TableCell>
                  {experience.endDate
                    ? formatDate({ date: experience.endDate })
                    : "Present"}
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <AddExperienceModal experience={experience} />
                  <DeleteExperienceDialog experienceId={experience.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-sm">No experiences added yet.</p>
      )}
    </section>
  );
}
