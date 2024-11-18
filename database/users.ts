import { cache } from 'react';
import type { Guest } from '../migrations/00000-createTableUsers';
import { sql } from './connect';

// inserts a new user into the database
export const createUserInsecure = cache(async (email: string) => {
  const [newUser] = await sql<Guest[]>`
    INSERT INTO
      users (
        email,
        username,
        password_hash
      )
    VALUES
      (
        ${email.toLowerCase()},
        '',
        ''
      )
    RETURNING
      users.id,
      users.email
  `;
  return newUser;
});

// retrieves a user from the database by email
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
