import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMovieAdd } from "@/modules/movies/hooks/useMovieAdd";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";

// Schema-г бүх талбаруудыг хамруулж шинэчилсэн
export const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  year: z.coerce.number().min(1900, "Invalid year"),
  genres: z.string().min(1, "Genres required (comma separated)"),
  runtime: z.coerce.number().min(1, "Runtime required"),
  directors: z.string().min(1, "Directors required (comma separated)"),
  cast: z.string().min(1, "Cast required (comma separated)"),
  writers: z.string().min(1, "Writers required (comma separated)"),
  plot: z.string().min(1, "Plot is required"),
  fullplot: z.string().optional(),
  poster: z.string().optional(),
  languages: z.string().optional(),
  countries: z.string().optional(),
  rated: z.string().optional(),
  imdbRating: z.string().optional(),
  imdbVotes: z.string().optional(),
  awardsText: z.string().optional(),
});

type FormType = z.infer<typeof movieSchema>;

export const CreateMovieForm = () => {
  const [success, setSuccess] = useState("");
  const { mutate, isPending } = useMovieAdd();

  const form = useForm<FormType>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: "",
      year: 2024,
      genres: "",
      runtime: 120,
      directors: "",
      cast: "",
      writers: "",
      plot: "",
      fullplot: "",
      poster: "",
      languages: "",
      countries: "",
      rated: "",
      imdbRating: undefined,
      imdbVotes: undefined,
      awardsText: "",
    },
  });

  const onSubmit = (data: FormType) => {
    mutate(
      {
        title: data.title,
        year: data.year,
        genres: data.genres.split(",").map((g) => g.trim()),
        runtime: data.runtime,
        directors: data.directors.split(",").map((d) => d.trim()),
        cast: data.cast.split(",").map((c) => c.trim()),
        writers: data.writers.split(",").map((w) => w.trim()),
        plot: data.plot,
        poster: data.poster,
        languages: data.languages?.split(",").map((l) => l.trim()) || [],
        countries: data.countries?.split(",").map((c) => c.trim()) || [],
        rated: data.rated,
        imdb: {
          rating: data.imdbRating ? Number(data.imdbRating) : undefined,
          votes: data.imdbVotes ? Number(data.imdbVotes) : undefined,
        },
        awards: {
          text: data.awardsText,
        },
      },
      {
        onSuccess: () => {
          setSuccess("Movie created successfully");
          form.reset();
          setTimeout(() => setSuccess(""), 4000);
        },
      },
    );
  };

  const renderField = (
    name: keyof FormType,
    label: string,
    placeholder?: string,
    type: string = "text",
  ) => (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>
          <Input {...field} placeholder={placeholder} type={type} />
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );

  return (
   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

  {success && (
    <div className="text-green-500 font-medium text-sm">
      {success}
    </div>
  )}

  <div className="grid grid-cols-4 gap-4">

    {renderField("title", "Title")}
    {renderField("year", "Year", undefined, "number")}
    {renderField("runtime", "Runtime", "120", "number")}
    {renderField("rated", "Rated")}

    {renderField("genres", "Genres", "Action,Comedy")}
    {renderField("languages", "Languages", "English,French")}
    {renderField("countries", "Countries", "USA,UK")}
    {renderField("poster", "Poster URL")}

    {renderField("directors", "Directors", "Director1,Director2")}
    {renderField("writers", "Writers", "Writer1,Writer2")}
    {renderField("imdbRating", "IMDb Rating", "7.5", "number")}
    {renderField("imdbVotes", "IMDb Votes", "12345", "number")}

  </div>

  <div className="grid grid-cols-2 gap-4">
    {renderField("cast", "Cast", "Actor1,Actor2")}
    {renderField("awardsText", "Awards")}
  </div>

  {renderField("plot", "Plot")}

  <Button type="submit" disabled={isPending} className="w-full">
    {isPending ? "Creating..." : "Create Movie"}
  </Button>

</form>
  );
};
