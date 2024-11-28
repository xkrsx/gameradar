import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllEventsBySportInsecure } from '../../../database/events';
import { getSingleSportBySlugInsecure } from '../../../database/sports';

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
  const events = await getAllEventsBySportInsecure(singleSport.id);

  return (
    <div>
      <h1>{singleSport.name}</h1>
      All the events in {singleSport.name}:
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
