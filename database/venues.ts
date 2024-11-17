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
        ${venue.location.toLowerCase()},
        ${venue.latitude.toLowerCase()},
        ${venue.longitude.toLowerCase()},
        ${venue.slug ? venue.slug.toLowerCase() : null},
      )
    RETURNING
      venues.id,
      venues.name,
      venues.location
  `;
  return newUser;
});
