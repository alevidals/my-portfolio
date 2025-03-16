import { AddEducationModal } from "@/app/dashboard/_components/add-education-modal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { getEducations } from "@/lib/db/queries/educations";

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
        <Accordion type="multiple" className="w-full">
          {educations.map((education) => (
            <AccordionItem key={education.id} value={education.id}>
              <AccordionTrigger className="text-base">
                {education.degree}
              </AccordionTrigger>
              <AccordionContent>
                <p>{education.institution}</p>
                <p className="text-muted-foreground">
                  {formatDate(education.startDate)} -{" "}
                  {education.endDate
                    ? formatDate(education.endDate)
                    : "Present"}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p>No educations found. Add a new education to your portfolio.</p>
      )}
    </section>
  );
}
