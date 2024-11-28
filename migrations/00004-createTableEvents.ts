import type { Sql } from 'postgres';
import { z } from 'zod';

export const eventSchema = z.object({
  name: z.string().optional(),
  sportId: z.number(),
  part1Id: z.number(),
  part2Id: z.number(),
  timeStart: z.date(),
  venueId: z.number().nullable(),
  description: z.string().nullable(),
  tickets: z.string().nullable(),
  userId: z.number(),
});

export type NewEvent = {
  name: string | null;
  sportId: number;
  part1Id: number;
  part2Id: number;
  timeStart: Date;
  venueId: number;
  description: string | null;
  tickets: string | null;
  userId: number;
};

export type Event = NewEvent & {
  id: number;
};

export type FullEvent = {
  eventId: number;
  eventName: string | null;
  eventSportId: number;
  eventPart1Id: number;
  eventPart2Id: number;
  eventTimeStart: Date;
  eventVenueId: number;
  eventDescription: string | null;
  eventTickets: string | null;
  eventUserId: number;
  sportName: string | null;
  part1Name: string | null;
  part2Name: string | null;
  venueName: string | null;
  userUsername: string | null;
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
