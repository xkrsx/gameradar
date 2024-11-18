import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllEventsByParticipantInsecure } from '../../../database/events';
import { getSingleParticipantByIdInsecure } from '../../../database/participants';
import type { fullEvent } from '../../../migrations/00004-createTableEvents';

export async function generateMetadata(props: Props) {
  const singleParticipant = await getSingleParticipantByIdInsecure(
    Number((await props.params).id),
  );

  if (!singleParticipant) {
    throw new Error('Participant not found');
  }

  return {
    title: singleParticipant.name,
    description: `Single Participant Page: ${singleParticipant.name}`,
  };
}

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ParticipantPage(props: Props) {
  const singleParticipant = await getSingleParticipantByIdInsecure(
    Number((await props.params).id),
  );

  if (!singleParticipant) {
    notFound();
  }
  const events = await getAllEventsByParticipantInsecure(singleParticipant.id!);

  return (
    <div>
      <h1>{singleParticipant.name}</h1>
      All the events of {singleParticipant.name}:
      {!events ? (
        <div className="event">
          <ul>
            <li>
              <strong>Sorry, no events found in this category</strong>
            </li>
            {/* <li>
                <Link className="system-link" href="/categories">
                  Browse categories
                </Link>
              </li>
              <li>
                <Link className="system-link" href="/events/add">
                  Add event
                </Link>

                <Link className="system-link" href="/events/find">
                  Find event
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
