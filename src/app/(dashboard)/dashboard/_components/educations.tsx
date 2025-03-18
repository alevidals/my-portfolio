import { AddEducationModal } from "@/app/(dashboard)/dashboard/_components/add-education-modal";
import { DeleteEducationDialog } from "@/app/(dashboard)/dashboard/_components/delete-education-dialog";
import type { getEducations } from "@/lib/db/queries/educations";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  educations: Awaited<ReturnType<typeof getEducations>>;
};

function formatDate(date: string) {
  const formatter = new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  });

  return formatter.format(new Date(date));
}

export function Educations({ educations }: Props) {
  return (
    <section>
      <header className="flex justify-between items-center">
        <h2 className="text-3xl mb-4">Educations</h2>
        <AddEducationModal />
      </header>
      {educations.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Institution</TableHead>
              <TableHead>Degree</TableHead>
              <TableHead>Start date</TableHead>
              <TableHead>End date</TableHead>
              <TableHead className="text-end">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {educations.map((education) => (
              <TableRow key={education.id}>
                <TableCell>{education.institution}</TableCell>
                <TableCell>{education.degree}</TableCell>
                <TableCell>{formatDate(education.startDate)}</TableCell>
                <TableCell>
                  {education.endDate
                    ? formatDate(education.endDate)
                    : "Present"}
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <AddEducationModal education={education} />
                  <DeleteEducationDialog educationId={education.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-sm">No educations added yet.</p>
      )}
    </section>
  );
}
