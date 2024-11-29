import type { Sql } from 'postgres';
import type { Participant } from './00003-createTableParticipants';

const participants: Omit<Participant, 'id'>[] = [
  { name: 'FC Barcelona', team: true, sportId: 14, venueId: null },
  {
    name: 'Real Madrid CF',
    team: true,
    sportId: 14,
    venueId: null,
  },
  {
    name: 'Serena Williams',
    team: false,
    sportId: 35,
    venueId: null,
  },
  {
    name: 'Golden State Warriors',
    team: true,
    sportId: 18,
    venueId: null,
  },
  { name: 'Chicago Bulls', team: true, sportId: 18, venueId: null },
  { name: 'Usain Bolt', team: false, sportId: 22, venueId: null },
  {
    name: 'Michael Phelps',
    team: false,
    sportId: 31,
    venueId: null,
  },
  {
    name: 'Roger Federer',
    team: false,
    sportId: 35,
    venueId: null,
  },
  {
    name: 'New York Yankees',
    team: true,
    sportId: 10,
    venueId: null,
  },
  { name: 'Simone Biles', team: false, sportId: 36, venueId: null },
  { name: 'LA Lakers', team: true, sportId: 18, venueId: null },
  { name: 'LeBron James', team: false, sportId: 18, venueId: null },
  {
    name: 'Paris Saint-Germain',
    team: true,
    sportId: 14,
    venueId: null,
  },
  {
    name: 'Cristiano Ronaldo',
    team: false,
    sportId: 14,
    venueId: null,
  },
  { name: 'Rafael Nadal', team: false, sportId: 35, venueId: null },
];

export async function up(sql: Sql) {
  for (const participant of participants) {
    await sql`
      INSERT INTO
        participants (
          name,
          team,
          _sport_id,
          _venue_id
        )
      VALUES
        (
          ${participant.name},
          ${participant.team},
          ${participant.sportId},
          ${participant.venueId}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const participant of participants) {
    await sql`
      DELETE FROM participants
      WHERE
        name = ${participant.name}
    `;
  }
}
