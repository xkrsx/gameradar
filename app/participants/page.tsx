import Link from 'next/link';
import { getAllParticipantsInsecure } from '../../database/participants';

export default async function ParticipantsPage() {
  const participants = await getAllParticipantsInsecure();
  return (
    <div className="wrapper">
      <h1>Browse all Participants</h1>
      <div className="participants">
        {participants.map((participant) => {
          return (
            <Link
              key={`id-${participant.id}`}
              href={`/participants/${participant.id}`}
            >
              <div className="participant">
                <div className="participant-name">{participant.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
