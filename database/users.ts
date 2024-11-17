import { cache } from 'react';
import type { Guest } from '../migrations/00000-createTableUsers';
import { sql } from './connect';

export const createUserInsecure = cache(async (email: string) => {
  const [newUser] = await sql<Guest[]>`
    INSERT INTO
      users (username)
    VALUES
      (
        ${email.toLowerCase()},
      )
    RETURNING
      users.id,
      users.username
  `;
  return newUser;
});

export const getUserByEmailInsecure = cache(async (email: string) => {
  const [user] = await sql<Guest[]>`
    SELECT
      users.id,
      users.email
    FROM
      users
    WHERE
      email = ${email.toLowerCase()}
  `;
  return user;
});
