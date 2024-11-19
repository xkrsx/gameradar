import Link from 'next/link';
import { getAllParticipantsInsecure } from '../../database/participants';

export default async function ParticipantsPage() {
  const participants = await getAllParticipantsInsecure();
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">
        Browse all Athletes / Sport Clubs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {participants.map((participant) => {
          return (
            <Link
              key={`id-${participant.id}`}
              href={`/participants/${participant.id}`}
            >
              <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-blue-50 hover:scale-105 transition-all">
                <div className="text-lg font-medium text-gray-800 text-center">
                  {participant.name}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
