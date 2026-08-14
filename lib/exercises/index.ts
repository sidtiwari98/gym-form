import type { Exercise } from "../types";
import { arms } from "./arms";
import { back } from "./back";
import { chest } from "./chest";
import { legs } from "./legs";
import { shoulders } from "./shoulders";

export const EXERCISES: Exercise[] = [...chest, ...back, ...shoulders, ...arms, ...legs];

const BY_SLUG = new Map(EXERCISES.map((e) => [e.slug, e]));

export function getExercise(slug: string): Exercise | undefined {
  return BY_SLUG.get(slug);
}
