import { cache } from 'react';
import type { Sport } from '../migrations/00001-createTableSports';
import { sql } from './connect';

// retrieves all sports from the database
export const getAllSportsInsecure = cache(async () => {
  const sports = await sql<Sport[]>`
    SELECT
      *
    FROM
      sports
  `;
  return sports;
});

// retrieves a sport from the database by slug
export const getSingleSportBySlugInsecure = cache(async (slug: string) => {
  const [sport] = await sql<Sport[]>`
    SELECT
      *
    FROM
      sports
    WHERE
      sports.slug = ${slug}
  `;
  return sport;
});
