import { cache } from 'react';
import type { Participant } from '../migrations/00003-createTableParticipants';
import { sql } from './connect';

export const createParticipantInsecure = cache(
  async (participant: Omit<Participant, 'id'>) => {
    const [newParticipant] = await sql<Participant[]>`
      INSERT INTO
        participants (
          name,
          team,
          _sport_id,
          _venue_id,
          slug
        ),
      VALUES
        (
          ${participant.name.toLocaleLowerCase()},
          ${participant.team},
          ${participant.sportId},
          ${participant.venueId},
          ${participant.slug ? participant.slug.toLowerCase() : null},
        )
      RETURNING
        participants.id,
        participants.name,
        participants.team,
        participants._sport_id,
        participants._venue_id
    `;
    return newParticipant;
  },
);

// retrieves a participant from the database by name
export const getParticipantByEmailInsecure = cache(async (name: string) => {
  const [participant] = await sql<Participant[]>`
    SELECT
      participants.id,
      participants.name,
      participants.team,
      participants._sport_id,
      participants._venue_id
    FROM
      participants
    WHERE
      name = ${name.toLocaleLowerCase()}
  `;
  return participant;
});
