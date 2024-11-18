import type { Sql } from 'postgres';
import type { NewUser } from './00000-createTableUsers';
import type { Participant } from './00003-createTableParticipants';

const users: (NewUser & { passwordHash: string })[] = [
  {
    email: 'johndoe123@example.com',
    username: '',
    passwordHash: '',
    createdAt: '2024-11-18 23:45:12.453218',
  },
  {
    email: 'alice.smith@randommail.com',
    username: '',
    passwordHash: '',
    createdAt: '2024-11-17 10:21:36.789123',
  },
  {
    email: 'bob.jones987@mailbox.com',
    username: '',
    passwordHash: '',
    createdAt: '2024-11-15 08:03:44.654321',
  },
  {
    email: 'carol_white56@example.org',
    username: '',
    passwordHash: '',
    createdAt: '2024-11-16 14:30:50.987654',
  },
  {
    email: 'daniel.lee123@webmail.net',
    username: '',
    passwordHash: '',
    createdAt: '2024-11-14 19:18:24.123456',
  },
  {
    email: 'emma.martin456@sampledomain.com',
    username: '',
    passwordHash: '',
    createdAt: '2024-11-19 01:11:12.999888',
  },
  {
    email: 'frank.miller777@fastmail.com',
    username: '',
    passwordHash: '',
    createdAt: '2024-11-13 23:59:59.333444',
  },
  {
    email: 'grace.williams321@mydomain.org',
    username: '',
    passwordHash: '',
    createdAt: '2024-11-12 16:42:08.789555',
  },
  {
    email: 'henry.davis234@randommail.net',
    username: '',
    passwordHash: '',
    createdAt: '2024-11-11 05:30:15.123789',
  },
  {
    email: 'irene.moore876@website.com',
    username: '',
    passwordHash: '',
    createdAt: '2024-11-20 11:22:50.456123',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
      INSERT INTO
        users (
          email,
          username,
          password_hash,
          created_at
        )
      VALUES
        (
          ${user.email},
          ${user.username},
          ${user.passwordHash},
          ${user.createdAt}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`
      DELETE FROM users
      WHERE
        email = ${user.email}
    `;
  }
}
