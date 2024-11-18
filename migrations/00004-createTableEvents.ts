import type { Sql } from 'postgres';
import { z } from 'zod';

export const eventSchema = z.object({
  eventName: z.string().optional(),
  eventSportId: z.number(),
  eventPart1Id: z.number(),
  eventPart2Id: z.number(),
  eventTimeStart: z.string(),
  eventVenueId: z.number().nullable(),
  eventDescription: z.string().nullable(),
  eventTickets: z.string().nullable(),
  eventSlug: z.string().nullable(),
  eventUserId: z.number(),
});

export type NewEvent = {
  eventName: string;
  eventSportId: number;
  eventPart1Id: number;
  eventPart2Id: number;
  eventTimeStart: string;
  eventVenueId: number | null;
  eventDescription: string | null;
  eventTickets: number | null;
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
  userUsername?: string;
  eventUserEmail: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE events (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(255) NULL,
      _sport_id integer NOT NULL REFERENCES sports (id),
      _part1_id integer NOT NULL REFERENCES participants (id) ON DELETE cascade,
      _part2_id integer NOT NULL REFERENCES participants (id) ON DELETE cascade,
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
