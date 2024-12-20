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
          _venue_id
        )
      VALUES
        (
          ${participant.name.toLocaleLowerCase()},
          ${participant.team},
          ${participant.sportId},
          ${participant.venueId}
        )
      RETURNING
        participants.id,
        participants.name,
        participants.team,
        participants._sport_id AS sport_id,
        participants._venue_id AS venue_id
    `;
    return newParticipant;
  },
);

// retrieves all participants from the database
export const getAllParticipantsInsecure = cache(async () => {
  const participants = await sql<Participant[]>`
    SELECT
      participants.id,
      participants.name,
      participants.team,
      participants._sport_id AS sport_id,
      participants._venue_id AS venue_id
    FROM
      participants
  `;
  return participants;
});

// retrieves a participant from the database by id
export const getSingleParticipantByIdInsecure = cache(async (id: number) => {
  const [participant] = await sql<Participant[]>`
    SELECT
      participants.id,
      participants.name,
      participants.team,
      participants._sport_id AS sport_id,
      participants._venue_id AS venue_id
    FROM
      participants
    WHERE
      id = ${id}
  `;
  return participant;
});

// retrieves a participant from the database by name
export const getSingleParticipantByNameInsecure = cache(
  async (name: string) => {
    const [participant] = await sql<Participant[]>`
      SELECT
        participants.id,
        participants.name,
        participants.team,
        participants._sport_id AS sport_id,
        participants._venue_id AS venue_id
      FROM
        participants
      WHERE
        name = ${name.toLocaleLowerCase()}
    `;
    return participant;
  },
);
