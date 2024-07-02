import { type ClassValue, clsx } from "clsx";
import randomColor from "randomcolor";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateColorBaseOnSeed({
  seed,
  luminosity,
}: {
  seed: string;
  luminosity: "light" | "dark";
}) {
  const color = randomColor({
    luminosity,
    seed,
  });
  return color;
}
