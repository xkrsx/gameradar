import { cache } from 'react';
import type { Sport } from '../migrations/00001-createTableSports';
import { sql } from './connect';

// retrieves a sport from the database by id
export const getSingleSportByIdInsecure = cache(async (id: number) => {
  const [sport] = await sql<Sport[]>`
    SELECT
      *
    FROM
      sports
    WHERE
      sports.id = ${id}
  `;
  return sport;
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
