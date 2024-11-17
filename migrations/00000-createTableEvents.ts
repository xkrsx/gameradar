import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE events (
      id bigint NOT NULL,
      name varchar(255) NULL,
      sport_id bigint NOT NULL,
      part1_id bigint NOT NULL,
      part2_id bigint NOT NULL,
      date bigint NOT NULL,
      venue_id bigint NOT NULL,
      description bigint NULL,
      tickets bigint NULL,
      slug varchar(255) NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE events`;
}
