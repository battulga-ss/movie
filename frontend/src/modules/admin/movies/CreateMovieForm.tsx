import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMovieAdd } from "@/modules/movies/hooks/useMovieAdd";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";

export const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  year: z.coerce.number().min(1900, "Invalid year"),
  genre: z.string().min(1, "Genre is required"),
});

type FormType = z.infer<typeof movieSchema>;

export const CreateMovieForm = () => {
  const { mutate, isPending } = useMovieAdd();

  const form = useForm<FormType>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: "",
      year: 2024,
      genre: "",
    },
  });

  const onSubmit = (data: FormType) => {
    mutate({
      ...data,
      genre: [data.genre], // backend array хүлээж байвал
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Title</FieldLabel>
            <Input {...field} />
            {fieldState.error && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="year"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Year</FieldLabel>
            <Input {...field} type="number" />
            {fieldState.error && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="genre"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Genre</FieldLabel>
            <Input {...field} placeholder="Action" />
            {fieldState.error && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Creating..." : "Create Movie"}
      </Button>
    </form>
  );
};