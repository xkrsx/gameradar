import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllEventsByVenueInsecure } from '../../../database/events';
import {
  getAllVenuesInsecure,
  getSingleVenueByIdInsecure,
} from '../../../database/venues';
import type { fullEvent } from '../../../migrations/00004-createTableEvents';
import SingleEvent from '../../common/SingleEvent/SingleEvent';

export async function generateMetadata(props: Props) {
  const singleVenue = await getSingleVenueByIdInsecure(
    Number((await props.params).id),
  );

  if (!singleVenue) {
    throw new Error('Venue not found');
  }

  return {
    title: singleVenue.name,
    description: `Single Venue Page: ${singleVenue.name}`,
  };
}

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function VenuePage(props: Props) {
  const singleVenue = await getSingleVenueByIdInsecure(
    Number((await props.params).id),
  );

  if (!singleVenue) {
    notFound();
  }
  const events = await getAllEventsByVenueInsecure(singleVenue.id);

  return (
    <div>
      <h1>{singleVenue.name}</h1>
      All the sports in {singleVenue.name}:
      {!events ? (
        <div className="venue">
          <ul>
            <li>
              <strong>Sorry, no events found in this venue</strong>
            </li>
            {/* <li>
                <Link className="system-link" href="/categories">
                  Browse categories
                </Link>
              </li>
              <li>
                <Link className="system-link" href="/venues/add">
                  Add venue
                </Link>

                <Link className="system-link" href="/venues/find">
                  Find venue
                </Link>
              </li> */}
          </ul>
        </div>
      ) : (
        <ul>
          {events.map((event: fullEvent) => (
            <li>
              <Link key={`id-${event.id}`} href={`/events/${event.id}`}>
                {!event.name
                  ? `Game ${event.part1} vs ${event.part2}`
                  : event.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
