import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE participants (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(255) NOT NULL UNIQUE,
      sport_id integer NOT NULL REFERENCES sports (id) ON DELETE cascade,
      venue_id integer NULL REFERENCES venues (id) ON DELETE cascade,
      slug varchar(255) NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE participants`;
}
