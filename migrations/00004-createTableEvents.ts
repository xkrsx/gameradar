import type { Sql } from 'postgres';

export type Event = {
  id: number;
  name: string;
  sportId: number;
  part1Id: number;
  part2Id: number;
  timeStart: Date;
  venueId: number | null;
  description: string | null;
  tickets: string | null;
  userId: number;
  slug: string | null;
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
