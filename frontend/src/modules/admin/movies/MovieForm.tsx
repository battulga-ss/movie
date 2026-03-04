import { Button } from "@/components/ui/button";

interface MovieFormProps {
  submitLabel: string;
}

export const MovieForm = ({ submitLabel }: MovieFormProps) => {
  return (
    <form className="space-y-4">
      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
};
