import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllEventsBySportInsecure } from '../../../database/events';
import { getSingleSportBySlugInsecure } from '../../../database/sports';
import type { Event } from '../../../migrations/00004-createTableEvents';
import SingleEvent from '../../common/SingleEvent/SingleEvent';

export async function generateMetadata(props: Props) {
  const singleSport = await getSingleSportBySlugInsecure(
    (await props.params).slug,
  );

  if (!singleSport) {
    throw new Error('Sport not found');
  }

  return {
    title: singleSport.name,
    description: `Single Sport Page: ${singleSport.name}`,
  };
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SportPage(props: Props) {
  const singleSport = await getSingleSportBySlugInsecure(
    (await props.params).slug,
  );

  if (!singleSport) {
    notFound();
  }
  const events = await getAllEventsBySportInsecure(singleSport.id!);

  return (
    <div>
      <h1>{singleSport.name}</h1>
      All the events in {singleSport.name}:
      {!events ? (
        <div>
          <ul>
            <li>
              <strong>Sorry, no events found in this category</strong>
            </li>
            {/* <li>
                <Link href="/categories">
                  Browse categories
                </Link>
              </li>
              <li>
                <Link href="/events/add">
                  Add event
                </Link>

                <Link href="/events/find">
                  Find event
                </Link>
              </li> */}
          </ul>
        </div>
      ) : (
        <ul>
          {events.map((event) => (
            <li>
              <Link
                key={`id-${event.eventId}`}
                href={`/events/${event.eventId}`}
              >
                {!event.eventName
                  ? `Game ${event.part1Name} vs ${event.part2Name}`
                  : event.eventName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
