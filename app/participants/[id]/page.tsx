import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllEventsByParticipantInsecure } from '../../../database/events';
import { getSingleParticipantByIdInsecure } from '../../../database/participants';

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
  const events = await getAllEventsByParticipantInsecure(singleParticipant.id);

  return (
    <div>
      <h1>{singleParticipant.name}</h1>
      All the events of {singleParticipant.name}:
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
