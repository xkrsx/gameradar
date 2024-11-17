import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE participants (
      id bigint NOT NULL,
      name varchar(255) NOT NULL,
      sport_id bigint NOT NULL,
      venue_id bigint NOT NULL,
      slug varchar(255) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE participants`;
}
