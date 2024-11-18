import type { Sql } from 'postgres';
import { z } from 'zod';

export type Guest = {
  id: number;
  email: string;
  createdAt: string;
};

export type NewUser = {
  id?: number;
  username: string;
  email: string;
  createdAt: string;
};

export const guestSchema = z.object({
  email: z
    .string()
    .min(3, { message: 'E-mail must have at least 3 characters.' })
    .max(80, { message: 'E-mail must have maximum 80 characters.' })
    .email({ message: 'E-mail must be a valid address.' }),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      email varchar(80) NOT NULL UNIQUE,
      username varchar(80) NULL,
      password_hash varchar(80) NULL,
      created_at timestamp DEFAULT now() NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users`;
}
