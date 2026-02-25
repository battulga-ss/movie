import { Schema, model } from "mongoose";

const imdbSchema = new Schema(
  {
    rating: { type: Number },
    votes: { type: Number },
    id: { type: Number },
  },
  { _id: false },
);

const viewerSchema = new Schema(
  {
    rating: { type: Number },
    numReviews: { type: Number },
  },
  { _id: false },
);

const tomatoesSchema = new Schema(
  {
    viewer: { type: viewerSchema },
    fresh: { type: Number },
    rotten: { type: Number },
  },
  { _id: false },
);

const awardsSchema = new Schema(
  {
    wins: { type: Number },
    nominations: { type: Number },
    text: { type: String },
  },
  { _id: false },
);

const movieSchema = new Schema(
  {
    title: { type: String },
    year: { type: Number },
    runtime: { type: Number },
    genres: { type: [String] },
    directors: { type: [String] },
    cast: { type: [String] },
    plot: { type: String },
    fullplot: { type: String },
    poster: { type: String },
    languages: { type: [String] },
    countries: { type: [String] },
    rated: { type: String },
    imdb: { type: imdbSchema },
    tomatoes: { type: tomatoesSchema },
    awards: { type: awardsSchema },
    released: { type: Date },
    type: { type: String },
  },
  {
    collection: "movies",
  },
);

const Movie = model("Movie", movieSchema);

export default Movie;
