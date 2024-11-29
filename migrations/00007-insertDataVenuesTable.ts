import type { Sql } from 'postgres';
import type { Venue } from './00002-createTableVenues';

const venues: Omit<Venue, 'id'>[] = [
  { name: 'TBA', location: 'TBA', latitude: '', longitude: '', slug: null },

  {
    name: 'Camp Nou',
    location: 'Barcelona, Spain',
    latitude: '41.3809',
    longitude: '2.1228',
    slug: null,
  },
  {
    name: 'Santiago Bernabéu',
    location: 'Madrid, Spain',
    latitude: '40.4531',
    longitude: '-3.6884',
    slug: null,
  },
  {
    name: 'Arthur Ashe Stadium',
    location: 'New York, USA',
    latitude: '40.7498',
    longitude: '-73.8476',
    slug: null,
  },
  {
    name: 'Chase Center',
    location: 'San Francisco, USA',
    latitude: '37.7680',
    longitude: '-122.3877',
    slug: null,
  },
  {
    name: 'United Center',
    location: 'Chicago, USA',
    latitude: '41.8807',
    longitude: '-87.6742',
    slug: null,
  },
  {
    name: 'National Stadium',
    location: 'Kingston, Jamaica',
    latitude: '18.0106',
    longitude: '-76.7885',
    slug: null,
  },
  {
    name: 'Olympic Aquatics Stadium',
    location: 'Rio de Janeiro, Brazil',
    latitude: '-22.9110',
    longitude: '-43.2302',
    slug: null,
  },
  {
    name: 'Rod Laver Arena',
    location: 'Melbourne, Australia',
    latitude: '-37.8216',
    longitude: '144.9785',
    slug: null,
  },
  {
    name: 'Yankee Stadium',
    location: 'New York, USA',
    latitude: '40.8296',
    longitude: '-73.9262',
    slug: null,
  },
  {
    name: 'Toyota Center',
    location: 'Houston, USA',
    latitude: '29.7508',
    longitude: '-95.3621',
    slug: null,
  },
  {
    name: 'Staples Center',
    location: 'Los Angeles, USA',
    latitude: '34.0430',
    longitude: '-118.2673',
    slug: null,
  },
  {
    name: 'Parc des Princes',
    location: 'Paris, France',
    latitude: '48.8414',
    longitude: '2.2530',
    slug: null,
  },
  {
    name: 'Estádio da Luz',
    location: 'Lisbon, Portugal',
    latitude: '38.7528',
    longitude: '-9.1847',
    slug: null,
  },
  {
    name: 'Roland Garros',
    location: 'Paris, France',
    latitude: '48.8470',
    longitude: '2.2495',
    slug: null,
  },
  {
    name: 'Camp Randall Stadium',
    location: 'Madison, USA',
    latitude: '43.0706',
    longitude: '-89.4125',
    slug: null,
  },
];

export async function up(sql: Sql) {
  for (const venue of venues) {
    await sql`
      INSERT INTO
        venues (
          name,
          location,
          latitude,
          longitude,
          slug
        )
      VALUES
        (
          ${venue.name},
          ${venue.location},
          ${venue.latitude},
          ${venue.longitude},
          ${venue.slug}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const venue of venues) {
    await sql`
      DELETE FROM venues
      WHERE
        name = ${venue.name}
    `;
  }
}
