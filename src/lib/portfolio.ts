import "server-only";

import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { logo } from "../../content/portfolio/logo";
import { photos } from "../../content/portfolio/photos";
import { poster } from "../../content/portfolio/poster";
import { slides } from "../../content/portfolio/slides";
import { web } from "../../content/portfolio/web";
import { writing } from "../../content/portfolio/writing";
import type { Photo, ShowcaseData, ShowcasePhoto, ShowcaseWork, Work, WorkCategory } from "./portfolio-types";

const publicImages = path.join(process.cwd(), "public", "images");
const worksByCategory: Record<WorkCategory, Work[]> = { web, slides, logo, poster, writing };

export function img(imagePath: string | undefined) {
  if (!imagePath) return undefined;
  const cleanPath = imagePath.replace(/^\/?images\//, "").replace(/^\/+/, "");
  const absolutePath = path.resolve(publicImages, cleanPath);
  if (!absolutePath.startsWith(`${publicImages}${path.sep}`) || !existsSync(absolutePath)) return undefined;
  return `/images/${cleanPath.replaceAll(path.sep, "/")}`;
}

function getPages(category: WorkCategory, slug: string, captions: string[] = []) {
  const directory = path.join(publicImages, "works", category, slug, "pages");
  if (!existsSync(directory)) return [];

  return readdirSync(directory)
    .filter((name) => /\.webp$/i.test(name) && !/\.thumb\.webp$/i.test(name))
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }))
    .flatMap((name, index) => {
      const src = img(`works/${category}/${slug}/pages/${name}`);
      return src ? [{ src, title: `${slug} · ${String(index + 1).padStart(2, "0")}`, caption: captions[index] }] : [];
    });
}

export function getItems(category: WorkCategory): ShowcaseWork[] {
  return worksByCategory[category]
    .filter((item) => !item.hidden)
    .map((item) => ({
      ...item,
      category,
      cover: img(`works/${category}/${item.slug}/cover.webp`),
      pages: getPages(category, item.slug, item.captions),
    }));
}

export function getPhotos(): ShowcasePhoto[] {
  return photos
    .filter((photo: Photo) => !photo.hidden)
    .map((photo) => ({ ...photo, src: img(photo.image) }));
}

export function getShowcaseData(): ShowcaseData {
  return {
    web: getItems("web"),
    slides: getItems("slides"),
    logo: getItems("logo"),
    poster: getItems("poster"),
    writing: getItems("writing"),
    photos: getPhotos(),
  };
}
