import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllEventsByVenueInsecure } from '../../../database/events';
import { getSingleVenueByIdInsecure } from '../../../database/venues';

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
      All the events in {singleVenue.name}:
      <ul>
        {events.map((event) => (
          <li key={`id-${event.eventId}`}>
            <Link href={`/events/${event.eventId}`}>
              {!event.eventName
                ? `Game ${event.part1Name} vs ${event.part2Name}`
                : event.eventName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
