import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE events (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(255) NULL,
      sport_id integer NOT NULL REFERENCES sports (id) ON DELETE cascade,
      part1_id integer NOT NULL REFERENCES participants (id) ON DELETE cascade,
      part2_id integer NOT NULL REFERENCES participants (id) ON DELETE cascade,
      time_start TIMESTAMP WITHOUT TIME ZONE NOT NULL,
      venue_id integer NOT NULL REFERENCES venues (id) ON DELETE cascade,
      description text NULL,
      tickets text NULL,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade,
      slug varchar(255) NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE events`;
}
