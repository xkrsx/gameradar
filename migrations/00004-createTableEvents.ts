import type { Sql } from 'postgres';
import { z } from 'zod';

export const eventSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Event name must have at least 3 characters.' })
    .max(255, { message: 'Event name must have maximum 255 characters.' }),
  sportId: z.number(),
  part1Id: z.number(),
  part2Id: z.number(),
  timeStart: z.string(),
  venueId: z.number().nullable(),
  description: z
    .string()
    .min(3, {
      message: 'Event description must have at least 3 characters.',
    })
    .nullable(),
  tickets: z.string().nullable(),
  slug: z.string().nullable(),
  userId: z.number(),
});

export type NewEvent = {
  eventName: string;
  eventSportId: number;
  eventPart1Id: number;
  eventPart2Id: number;
  eventTimeStart: string;
  eventVenueId: number | null;
  eventDescription: string | null;
  eventTickets: string | null;
  eventSlug: string | null;
  eventUserId: number;
};

export type Event = NewEvent & {
  eventId: number;
};

export type FullEvent = Event & {
  sportName: string;
  part1Name: string;
  part2Name: string;
  venueName: string;
  userUsername: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE events (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(255) NULL,
      _sport_id integer NOT NULL REFERENCES sports (id),
      _part1_id integer NOT NULL REFERENCES participants (id),
      _part2_id integer NOT NULL REFERENCES participants (id),
      time_start TIMESTAMP WITHOUT TIME ZONE NOT NULL,
      _venue_id integer NOT NULL REFERENCES venues (id),
      description text NULL,
      tickets text NULL,
      _user_id integer NOT NULL REFERENCES users (id),
      slug varchar(255) NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE events`;
}
