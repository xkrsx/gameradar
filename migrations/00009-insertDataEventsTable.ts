import type { Sql } from 'postgres';
import type { NewEvent } from './00004-createTableEvents';

const events: NewEvent[] = [
  {
    eventName: 'FC Barcelona vs Real Madrid CF - El Clasico',
    eventSportId: 14, // Soccer
    eventPart1Id: 1, // FC Barcelona
    eventPart2Id: 2, // Real Madrid CF
    eventTimeStart: '2024-11-18 22:52:00',
    eventVenueId: 2, // Camp Nou
    eventDescription:
      "A thrilling El Clasico soccer match between two of Spain's biggest teams.",
    eventTickets: 138, // Ticket price in EUR (150 USD)
    eventSlug: '',
    eventUserId: 1, // johndoe123@example.com
  },
  {
    eventName: 'Golden State Warriors vs Chicago Bulls - NBA Game',
    eventSportId: 4, // Basketball
    eventPart1Id: 4, // Golden State Warriors
    eventPart2Id: 5, // Chicago Bulls
    eventTimeStart: '2024-11-19 16:30:00',
    eventVenueId: 3, // Chase Center
    eventDescription:
      'A major NBA matchup between the Golden State Warriors and Chicago Bulls.',
    eventTickets: 110, // Ticket price in EUR (120 USD)
    eventSlug: '',
    eventUserId: 2, // alice.smith@randommail.com
  },
  {
    eventName: 'Usain Bolt vs Justin Gatlin - 100m Dash',
    eventSportId: 36, // Track and Field
    eventPart1Id: 6, // Usain Bolt
    eventPart2Id: 7, // Justin Gatlin
    eventTimeStart: '2024-11-20 19:00:00',
    eventVenueId: 6, // National Stadium
    eventDescription:
      'A thrilling 100m race between two of the fastest men in history.',
    eventTickets: 69, // Ticket price in EUR (75 USD)
    eventSlug: '',
    eventUserId: 3, // bob.jones987@mailbox.com
  },
  {
    eventName: 'Michael Phelps vs Ryan Lochte - Swimming Showdown',
    eventSportId: 32, // Swimming
    eventPart1Id: 7, // Michael Phelps
    eventPart2Id: 8, // Ryan Lochte
    eventTimeStart: '2024-11-21 08:00:00',
    eventVenueId: 7, // Olympic Aquatics Stadium
    eventDescription:
      'A legendary swimming showdown between Michael Phelps and Ryan Lochte.',
    eventTickets: 184, // Ticket price in EUR (200 USD)
    eventSlug: '',
    eventUserId: 4, // carol_white56@example.org
  },
  {
    eventName: 'Roger Federer vs Rafael Nadal - Grand Slam Final',
    eventSportId: 35, // Tennis
    eventPart1Id: 9, // Roger Federer
    eventPart2Id: 15, // Rafael Nadal
    eventTimeStart: '2024-11-22 14:00:00',
    eventVenueId: 7, // Roland Garros
    eventDescription:
      'The ultimate tennis showdown between two Grand Slam legends.',
    eventTickets: 368, // Ticket price in EUR (400 USD)
    eventSlug: '',
    eventUserId: 5, // daniel.lee123@webmail.net
  },
  {
    eventName: 'Paris Saint-Germain vs FC Barcelona - Champions League',
    eventSportId: 14, // Soccer
    eventPart1Id: 13, // Paris Saint-Germain
    eventPart2Id: 1, // FC Barcelona
    eventTimeStart: '2024-11-23 18:30:00',
    eventVenueId: 12, // Parc des Princes
    eventDescription:
      'A Champions League match between PSG and Barcelona, featuring top European talent.',
    eventTickets: 166, // Ticket price in EUR (180 USD)
    eventSlug: '',
    eventUserId: 6, // emma.martin456@sampledomain.com
  },
  {
    eventName: 'FC Barcelona vs Paris Saint-Germain - UEFA Champions League',
    eventSportId: 14, // Soccer
    eventPart1Id: 1, // FC Barcelona
    eventPart2Id: 13, // Paris Saint-Germain
    eventTimeStart: '2024-11-24 20:00:00',
    eventVenueId: 2, // Camp Nou
    eventDescription:
      'A clash between FC Barcelona and Paris Saint-Germain in the UEFA Champions League.',
    eventTickets: 184, // Ticket price in EUR (200 USD)
    eventSlug: '',
    eventUserId: 7, // frank.miller777@fastmail.com
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
          slug,
          _user_id
        )
      VALUES
        (
          ${event.eventName},
          ${event.eventSportId},
          ${event.eventPart1Id},
          ${event.eventPart2Id},
          ${event.eventTimeStart},
          ${event.eventVenueId},
          ${event.eventDescription},
          ${event.eventTickets},
          ${event.eventSlug},
          ${event.eventUserId}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const event of events) {
    await sql`
      DELETE FROM events
      WHERE
        name = ${event.eventName}
    `;
  }
}
