import type { Sql } from 'postgres';
import type { Sport } from './00001-createTableSports';

export const sports: Omit<Sport, 'id'>[] = [
  { name: 'Archery', slug: 'archery' },
  { name: 'Badminton', slug: 'badminton' },
  { name: 'Baseball', slug: 'baseball' },
  { name: 'Basketball', slug: 'basketball' },
  { name: 'Beach Volleyball', slug: 'beach-volleyball' },
  { name: 'Boxing', slug: 'boxing' },
  { name: 'Cricket', slug: 'cricket' },
  { name: 'Cycling', slug: 'cycling' },
  { name: 'Diving', slug: 'diving' },
  { name: 'Equestrian', slug: 'equestrian' },
  { name: 'Fencing', slug: 'fencing' },
  { name: 'Field Hockey', slug: 'field-hockey' },
  { name: 'Figure Skating', slug: 'figure-skating' },
  { name: 'Football', slug: 'football' },
  { name: 'Golf', slug: 'golf' },
  { name: 'Gymnastics', slug: 'gymnastics' },
  { name: 'Handball', slug: 'handball' },
  { name: 'Ice Hockey', slug: 'ice-hockey' },
  { name: 'Judo', slug: 'judo' },
  { name: 'Karate', slug: 'karate' },
  { name: 'Martial Arts', slug: 'martial-arts' },
  { name: 'Rowing', slug: 'rowing' },
  { name: 'Rugby', slug: 'rugby' },
  { name: 'Sailing', slug: 'sailing' },
  { name: 'Shooting', slug: 'shooting' },
  { name: 'Skateboarding', slug: 'skateboarding' },
  { name: 'Skiing', slug: 'skiing' },
  { name: 'Snowboarding', slug: 'snowboarding' },
  { name: 'Soccer', slug: 'soccer' },
  { name: 'Softball', slug: 'softball' },
  { name: 'Surfing', slug: 'surfing' },
  { name: 'Swimming', slug: 'swimming' },
  { name: 'Table Tennis', slug: 'table-tennis' },
  { name: 'Taekwondo', slug: 'taekwondo' },
  { name: 'Tennis', slug: 'tennis' },
  { name: 'Track and Field', slug: 'track-and-field' },
  { name: 'Triathlon', slug: 'triathlon' },
  { name: 'Volleyball', slug: 'volleyball' },
  { name: 'Weightlifting', slug: 'weightlifting' },
  { name: 'Wrestling', slug: 'wrestling' },
];

export async function up(sql: Sql) {
  for (const sport of sports) {
    await sql`
      INSERT INTO
        sports (name, slug)
      VALUES
        (
          ${sport.name},
          ${sport.slug}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const sport of sports) {
    await sql`
      DELETE FROM sports
      WHERE
        name = ${sport.name}
    `;
  }
}
