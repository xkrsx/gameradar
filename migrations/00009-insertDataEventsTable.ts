import type { Sql } from 'postgres';
import type { NewEvent } from './00004-createTableEvents';

const events: NewEvent[] = [
  {
    name: 'FC Barcelona vs Real Madrid CF - El Clasico',
    sportId: 14, // Soccer
    part1Id: 1, // FC Barcelona
    part2Id: 2, // Real Madrid CF
    timeStart: new Date('2024-11-18 22:52:00'),
    venueId: 2, // Camp Nou
    description:
      "A thrilling El Clasico soccer match between two of Spain's biggest teams.",
    tickets: '138', // Ticket price in EUR (150 USD)
    userId: 1, // johndoe123@example.com
  },
  {
    name: 'Golden State Warriors vs Chicago Bulls - NBA Game',
    sportId: 4, // Basketball
    part1Id: 4, // Golden State Warriors
    part2Id: 5, // Chicago Bulls
    timeStart: new Date('2024-11-19 16:30:00'),
    venueId: 3, // Chase Center
    description:
      'A major NBA matchup between the Golden State Warriors and Chicago Bulls.',
    tickets: '110', // Ticket price in EUR (120 USD)
    userId: 2, // alice.smith@randommail.com
  },
  {
    name: 'Usain Bolt vs Justin Gatlin - 100m Dash',
    sportId: 36, // Track and Field
    part1Id: 6, // Usain Bolt
    part2Id: 7, // Justin Gatlin
    timeStart: new Date('2024-11-20 19:00:00'),
    venueId: 6, // National Stadium
    description:
      'A thrilling 100m race between two of the fastest men in history.',
    tickets: '69', // Ticket price in EUR (75 USD)
    userId: 3, // bob.jones987@mailbox.com
  },
  {
    name: 'Michael Phelps vs Ryan Lochte - Swimming Showdown',
    sportId: 32, // Swimming
    part1Id: 7, // Michael Phelps
    part2Id: 8, // Ryan Lochte
    timeStart: new Date('2024-11-21 08:00:00'),
    venueId: 7, // Olympic Aquatics Stadium
    description:
      'A legendary swimming showdown between Michael Phelps and Ryan Lochte.',
    tickets: '184', // Ticket price in EUR (200 USD)
    userId: 4, // carol_white56@example.org
  },
  {
    name: 'Roger Federer vs Rafael Nadal - Grand Slam Final',
    sportId: 35, // Tennis
    part1Id: 8, // Roger Federer
    part2Id: 15, // Rafael Nadal
    timeStart: new Date('2024-11-22 14:00:00'),
    venueId: 7, // Roland Garros
    description: 'The ultimate tennis showdown between two Grand Slam legends.',
    tickets: '368', // Ticket price in EUR (400 USD)
    userId: 5, // daniel.lee123@webmail.net
  },
  {
    name: 'Paris Saint-Germain vs FC Barcelona - Champions League',
    sportId: 14, // Soccer
    part1Id: 13, // Paris Saint-Germain
    part2Id: 1, // FC Barcelona
    timeStart: new Date('2024-11-23 18:30:00'),
    venueId: 12, // Parc des Princes
    description:
      'A Champions League match between PSG and Barcelona, featuring top European talent.',
    tickets: '166', // Ticket price in EUR (180 USD)
    userId: 6, // emma.martin456@sampledomain.com
  },
  {
    name: 'FC Barcelona vs Paris Saint-Germain - UEFA Champions League',
    sportId: 14, // Soccer
    part1Id: 1, // FC Barcelona
    part2Id: 13, // Paris Saint-Germain
    timeStart: new Date('2024-11-24 20:00:00'),
    venueId: 2, // Camp Nou
    description:
      'A clash between FC Barcelona and Paris Saint-Germain in the UEFA Champions League.',
    tickets: '184', // Ticket price in EUR (200 USD)
    userId: 7, // frank.miller777@fastmail.com
  },
];

export async function up(sql: Sql) {
  for (const event of events) {
    await sql`
      INSERT INTO
        events (
          name,
          _sport_id,
          _part1_id,
          _part2_id,
          time_start,
          _venue_id,
          description,
          tickets,
          _user_id
        )
      VALUES
        (
          ${event.name},
          ${event.sportId},
          ${event.part1Id},
          ${event.part2Id},
          ${event.timeStart},
          ${event.venueId},
          ${event.description},
          ${event.tickets},
          ${event.userId}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const event of events) {
    await sql`
      DELETE FROM events
      WHERE
        name = ${event.name}
    `;
  }
}
