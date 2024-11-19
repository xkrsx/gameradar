import { cache } from 'react';
import type {
  Event,
  FullEvent,
  NewEvent,
} from '../migrations/00004-createTableEvents';
import { sql } from './connect';

export const createEventInsecure = cache(async (event: NewEvent) => {
  const [newEvent] = await sql<NewEvent[]>`
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
        slug,
        _user_id
      )
    VALUES
      (
        ${event.eventName},
        ${event.eventSportId},
        ${event.eventPart1Id},
        ${event.eventPart2Id},
        ${event.eventTimeStart},
        ${event.eventVenueId},
        ${event.eventDescription},
        ${event.eventTickets},
        '',
        ${event.eventUserId}
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
      events.slug,
      events._user_id
  `;
  return newEvent;
});

// retrieves all events from the database
export const getAllEventsInsecure = cache(async () => {
  const events = await sql<FullEvent[]>`
    SELECT
      events.id AS event_id,
      events.name AS event_name,
      events._sport_id AS event_sport_id,
      events._part1_id AS event_part1_id,
      events._part2_id AS event_part2_id,
      events.time_start AS event_time_start,
      events._venue_id AS event_venue_id,
      events.description AS event_description,
      events.tickets AS event_tickets,
      events._user_id AS event_user_id,
      sports.name AS sport_name,
      part1.name AS part1_name,
      part2.name AS part2_name,
      venues.name AS venue_name,
      users.username AS user_username
    FROM
      events
      LEFT JOIN sports ON sports.id = events._sport_id
      LEFT JOIN participants AS part1 ON part1.id = events._part1_id
      LEFT JOIN participants AS part2 ON part2.id = events._part2_id
      LEFT JOIN venues ON venues.id = events._venue_id
      LEFT JOIN users ON users.id = events._user_id
  `;
  return events;
});

// retrieves an event from the database by id
export const getSingleEventByIdInsecure = cache(async (id: number) => {
  const [event] = await sql<FullEvent[]>`
    SELECT
      events.id AS event_id,
      events.name AS event_name,
      events._sport_id AS event_sport_id,
      events._part1_id AS event_part1_id,
      events._part2_id AS event_part2_id,
      events.time_start AS event_time_start,
      events._venue_id AS event_venue_id,
      events.description AS event_description,
      events.tickets AS event_tickets,
      events._user_id AS event_user_id,
      sports.name AS sport_name,
      part1.name AS part1_name,
      part2.name AS part2_name,
      venues.name AS venue_name,
      users.username AS user_username
    FROM
      events
      LEFT JOIN sports ON sports.id = events._sport_id
      LEFT JOIN participants AS part1 ON part1.id = events._part1_id
      LEFT JOIN participants AS part2 ON part2.id = events._part2_id
      LEFT JOIN venues ON venues.id = events._venue_id
      LEFT JOIN users ON users.id = events._user_id
    WHERE
      events.id = ${id}
  `;
  return event;
});

// retrieves an event from the database by name
export const getSingleEventByNameInsecure = cache(async (name: string) => {
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
      events.name = ${name.toLocaleLowerCase()}
  `;
  return event;
});

// retrieves all events from the database by sport
export const getAllEventsBySportInsecure = cache(async (id: number) => {
  const event = await sql<FullEvent[]>`
    SELECT
      events.id AS event_id,
      events.name AS event_name,
      events._sport_id AS event_sport_id,
      events._part1_id AS event_part1_id,
      events._part2_id AS event_part2_id,
      events.time_start AS event_time_start,
      events._venue_id AS event_venue_id,
      events.description AS event_description,
      events.tickets AS event_tickets,
      events._user_id AS event_user_id
    FROM
      events
      LEFT JOIN sports ON sports.id = events._sport_id
      LEFT JOIN participants ON participants.id = events._part1_id
      AND participants.id = events._part2_id
      LEFT JOIN venues ON venues.id = events._venue_id
      LEFT JOIN users ON users.id = events._user_id
    WHERE
      events._sport_id = ${id}
  `;
  return event;
});

// retrieves all events from the database by venue
export const getAllEventsByVenueInsecure = cache(async (id: number) => {
  const event = await sql<FullEvent[]>`
    SELECT
      events.id AS event_id,
      events.name AS event_name,
      events._sport_id AS event_sport_id,
      events._part1_id AS event_part1_id,
      events._part2_id AS event_part2_id,
      events.time_start AS event_time_start,
      events._venue_id AS event_venue_id,
      events.description AS event_description,
      events.tickets AS event_tickets,
      events._user_id AS event_user_id
    FROM
      events
      LEFT JOIN sports ON sports.id = events._sport_id
      LEFT JOIN participants ON participants.id = events._part1_id
      AND participants.id = events._part2_id
      LEFT JOIN venues ON venues.id = events._venue_id
      LEFT JOIN users ON users.id = events._user_id
    WHERE
      events._venue_id = ${id}
  `;
  return event;
});

// retrieves all events from the database by participant
export const getAllEventsByParticipantInsecure = cache(async (id: number) => {
  const event = await sql<FullEvent[]>`
    SELECT
      events.id AS event_id,
      events.name AS event_name,
      events._sport_id AS event_sport_id,
      events._part1_id AS event_part1_id,
      events._part2_id AS event_part2_id,
      events.time_start AS event_time_start,
      events._venue_id AS event_venue_id,
      events.description AS event_description,
      events.tickets AS event_tickets,
      events._user_id AS event_user_id
    FROM
      events
      LEFT JOIN sports ON sports.id = events._sport_id
      LEFT JOIN participants ON participants.id = events._part1_id
      AND participants.id = events._part2_id
      LEFT JOIN venues ON venues.id = events._venue_id
      LEFT JOIN users ON users.id = events._user_id
    WHERE
      events._part1_id = ${id}
      OR events._part2_id = ${id}
  `;
  return event;
});
