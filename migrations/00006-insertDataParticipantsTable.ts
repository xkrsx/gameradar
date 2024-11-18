import type { Sql } from 'postgres';
import type { Participant } from './00003-createTableParticipants';

const participants: Participant[] = [
  { name: 'FC Barcelona', team: true, sportId: 14, venueId: null, slug: null },
  {
    name: 'Real Madrid CF',
    team: true,
    sportId: 14,
    venueId: null,
    slug: null,
  },
  {
    name: 'Serena Williams',
    team: false,
    sportId: 35,
    venueId: null,
    slug: null,
  },
  {
    name: 'Golden State Warriors',
    team: true,
    sportId: 18,
    venueId: null,
    slug: null,
  },
  { name: 'Chicago Bulls', team: true, sportId: 18, venueId: null, slug: null },
  { name: 'Usain Bolt', team: false, sportId: 22, venueId: null, slug: null },
  {
    name: 'Michael Phelps',
    team: false,
    sportId: 31,
    venueId: null,
    slug: null,
  },
  {
    name: 'Roger Federer',
    team: false,
    sportId: 35,
    venueId: null,
    slug: null,
  },
  {
    name: 'New York Yankees',
    team: true,
    sportId: 10,
    venueId: null,
    slug: null,
  },
  { name: 'Simone Biles', team: false, sportId: 36, venueId: null, slug: null },
  { name: 'LA Lakers', team: true, sportId: 18, venueId: null, slug: null },
  { name: 'LeBron James', team: false, sportId: 18, venueId: null, slug: null },
  {
    name: 'Paris Saint-Germain',
    team: true,
    sportId: 14,
    venueId: null,
    slug: null,
  },
  {
    name: 'Cristiano Ronaldo',
    team: false,
    sportId: 14,
    venueId: null,
    slug: null,
  },
  { name: 'Rafael Nadal', team: false, sportId: 35, venueId: null, slug: null },
];

export async function up(sql: Sql) {
  for (const participant of participants) {
    await sql`
      INSERT INTO
        participants (
          name,
          team,
          _sport_id,
          _venue_id,
          slug
        )
      VALUES
        (
          ${participant.name},
          ${participant.team},
          ${participant.sportId},
          ${participant.venueId},
          ${participant.slug}
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
