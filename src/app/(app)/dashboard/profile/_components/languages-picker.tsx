import type { Language } from "@/app/(app)/dashboard/profile/_lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { IconLanguage, IconPlus, IconTrash } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";
import { v7 as uuidv7 } from "uuid";

type Props = {
  languages: Language[];
  setLanguages: Dispatch<SetStateAction<Language[]>>;
};

export function LanguagesPicker({ languages, setLanguages }: Props) {
  function addLanguage() {
    setLanguages((prev) => [
      ...prev,
      { id: uuidv7(), name: "", level: "beginner" },
    ]);
  }

  function removeLanguage(index: number) {
    setLanguages((prev) => prev.filter((_, i) => i !== index));
  }

  function updateLanguage(index: number, field: keyof Language, value: string) {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
    setLanguages(updatedLanguages);
  }

  return (
    <div className="flex flex-col gap-3">
      <Label className="flex items-center gap-2 text-sm">
        <IconLanguage size={22} />
        <span>Languages</span>
      </Label>

      <div className="space-y-4">
        {languages.map((language, index) => (
          <div
            key={language.id}
            className="grid grid-cols-[1fr_1fr_auto] gap-4"
          >
            <div>
              <Label
                htmlFor={`language-${index}`}
                className="block  font-medium mb-1"
              >
                Language
              </Label>
              <Input
                id={`language-${index}`}
                value={language.name}
                onChange={(e) => updateLanguage(index, "name", e.target.value)}
                placeholder="Spanish, English, French..."
                required
              />
            </div>

            <div>
              <Label
                htmlFor={`level-${index}`}
                className="block  font-medium mb-1"
              >
                Level
              </Label>
              <Select
                value={language.level}
                onValueChange={(value) => updateLanguage(index, "level", value)}
              >
                <SelectTrigger id={`level-${index}`} className="w-full">
                  <SelectValue placeholder="Choose a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="native">Native</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeLanguage(index)}
              className="self-end"
            >
              <IconTrash className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addLanguage}
          className="w-full"
        >
          <IconPlus className="h-4 w-4 mr-2" /> Add Language
        </Button>
      </div>
    </div>
  );
}
