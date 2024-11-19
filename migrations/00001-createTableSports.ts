import type { Sql } from 'postgres';

export type Sport = {
  id?: number;
  name: string;
  slug: string | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE sports (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(255) NOT NULL,
      slug varchar(255) NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE sports`;
}
