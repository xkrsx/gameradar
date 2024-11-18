import { cache } from 'react';
import type { Venue } from '../migrations/00002-createTableVenues';
import { sql } from './connect';

export const createVenueInsecure = cache(async (venue: Omit<Venue, 'id'>) => {
  const [newUser] = await sql<Venue[]>`
    INSERT INTO
      venues (
        name,
        location,
        latitude,
        longitude,
        slug
      ),
    VALUES
      (
        ${venue.name.toLowerCase()},
        ${venue.location},
        ${venue.latitude},
        ${venue.longitude},
        ${venue.slug ? venue.slug.toLowerCase() : null},
      )
    RETURNING
      venues.id,
      venues.name,
      venues.location
  `;
  return newUser;
});

// retrieves all venues from the database
export const getAllVenuesInsecure = cache(async () => {
  const venues = await sql<Venue[]>`
    SELECT
      *
    FROM
      venues
  `;
  return venues;
});

// retrieves a venue from the database by id
export const getSingleVenueByIdInsecure = cache(async (id: number) => {
  const [venue] = await sql<Venue[]>`
    SELECT
      *
    FROM
      venues
    WHERE
      venues.id = ${id}
  `;
  return venue;
});
