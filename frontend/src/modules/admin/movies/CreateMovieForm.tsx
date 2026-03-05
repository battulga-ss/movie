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
  runtime: z.coerce.number().min(1, "Runtime is required"),
  director: z.string().min(1, "Director is required"),
  cast: z.string().min(1, "Cast is required"),
  plot: z.string().min(1, "Plot is required"),
});

type FormType = z.infer<typeof movieSchema>;

export const CreateMovieForm = () => {
  const { mutate, isPending } = useMovieAdd();

  const form = useForm<FormType>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: "",
      year: 12,

      genre: "",
      runtime: 120,
      director: "",
      cast: "",
      plot: "",
    },
  });

  const onSubmit = (data: FormType) => {
    mutate({
      title: data.title,
      year: data.year,
      genre: [data.genre],
      runtime: Number(data.runtime),
      director: data.director.split(","),
      cast: data.cast.split(","),
      plot: data.plot,
    });
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>📝 Title</FieldLabel>
            <Input {...field} />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="year"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>📅 Year</FieldLabel>
            <Input {...field} type="number" />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="genre"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>🎭 Genre</FieldLabel>
            <Input {...field} placeholder="Action" />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="runtime"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>⏱️ Runtime</FieldLabel>
            <Input {...field} placeholder="120 min" />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="director"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>🎬 Director</FieldLabel>
            <Input {...field} />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="cast"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>👥 Cast</FieldLabel>
            <Input {...field} />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="plot"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>📝 Plot</FieldLabel>
            <Input {...field} placeholder="Plot description" />
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Creating..." : "Create Movie"}
      </Button>
    </form>
  );
};
