import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditMovie } from "@/modules/movies/hooks/useEditMovie";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export type MovieInput = {
  title: string;
  year: number;
  genre: string[];
  runtime: number;
  director: string[];
  cast: string[];
  plot: string;
  poster?: string;
};
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

export const EditMovieForm = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<FormType | null>(null);
  const { mutate, isPending } = useEditMovie();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/api/movies/${id}`)
        .then((res) => {
          const m = res.data;
          setMovie({
            title: m.title,
            year: m.year,
            genre: m.genre?.join(",") || "",
            runtime: m.runtime,
            director: m.director?.join(",") || "",
            cast: m.cast?.join(",") || "",
            plot: m.plot,
          });
        })
        .catch(console.error);
    }
  }, [id]);

  const form = useForm<FormType>({
    resolver: zodResolver(movieSchema),
    defaultValues: movie || {
      title: "",
      year: 2024,
      genre: "",
      runtime: 120,
      director: "",
      cast: "",
      plot: "",
    },
  });

  useEffect(() => {
    if (movie) form.reset(movie);
  }, [movie]);

  const onSubmit = (data: FormType) => {
    mutate({
      id: id!,
      data: {
        ...data,
        genre: data.genre.split(","),
        director: data.director.split(","),
        cast: data.cast.split(","),
      },
    });
  };

  if (!movie) return <div>Loading...</div>;

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
            <Input {...field} placeholder="Action,Drama" />
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
            <Input {...field} type="number" />
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
            <Input {...field} placeholder="Director1,Director2" />
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
            <Input {...field} placeholder="Actor1,Actor2" />
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
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
};
