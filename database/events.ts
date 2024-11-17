import { cache } from 'react';
import type { Event } from '../migrations/00004-createTableEvents';
import { sql } from './connect';

export const createEventInsecure = cache(async (event: Omit<Event, 'id'>) => {
  const [newEvent] = await sql<Event[]>`
    INSERT INTO
      events (
        name,
        _sport_id,
        _part1_id,
        _part2_id,
        time_start,
        _venue_id,
        description,
        tickets,
        _user_id,
        slug
      ),
    VALUES
      (
        ${event.name.toLocaleLowerCase()},
        ${event.sportId},
        ${event.part1Id},
        ${event.part2Id},
        ${event.timeStart},
        ${event.venueId},
        ${event.description},
        ${event.tickets},
        ${event.userId},
        ${event.slug ? event.slug.toLowerCase() : null},
      )
    RETURNING
      events.id,
      events.name,
      events._sport_id,
      events._part1_id,
      events._part2_id,
      events.time_start,
      events._venue_id,
      events.description,
      events.tickets,
      events._user_id
  `;
  return newEvent;
});

// retrieves an event from the database by name
export const getEventByNameInsecure = cache(async (name: string) => {
  const [event] = await sql<Event[]>`
    SELECT
      events.id,
      events.name,
      events.team,
      events._sport_id,
      events._venue_id
    FROM
      events
    WHERE
      name = ${name.toLocaleLowerCase()}
  `;
  return event;
});

// retrieves an event from the database by sport
export const getEventBySportInsecure = cache(async (sport: string) => {
  const [event] = await sql<Event[]>`
    SELECT
      events.id,
      events.name,
      events._sport_id,
      events._part1_id,
      events._part2_id,
      events.time_start,
      events._venue_id,
      events.description,
      events.tickets,
      events._user_id
    FROM
      events
    WHERE
      name = ${sport}
  `;
  return event;
});
