import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE venues (
      id bigint NOT NULL,
      name varchar(255) NOT NULL,
      location varchar(255) NOT NULL,
      latitude varchar(255) NOT NULL,
      longitude varchar(255) NOT NULL,
      slug varchar(255) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE venues`;
}
