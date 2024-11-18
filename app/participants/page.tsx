import Link from 'next/link';
import { getAllParticipantsInsecure } from '../../database/participants';

export default async function ParticipantsPage() {
  const participants = await getAllParticipantsInsecure();
  return (
    <div>
      <h1>Browse all Participants</h1>
      <div>
        {participants.map((participant) => {
          return (
            <Link
              key={`id-${participant.id}`}
              href={`/participants/${participant.id}`}
            >
              <div>
                <div>{participant.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
