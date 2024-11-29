import type { Sql } from 'postgres';

export type Participant = {
  id: number;
  name: string;
  team: boolean;
  sportId: number;
  venueId: number | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE participants (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(255) NOT NULL UNIQUE,
      team boolean NOT NULL DEFAULT TRUE,
      _sport_id integer NOT NULL REFERENCES sports (id),
      _venue_id integer NULL REFERENCES venues (id),
      slug varchar(255) NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE participants`;
}
