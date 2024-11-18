import Link from 'next/link';
import { getAllEventsInsecure } from '../../database/events';

export default async function EventsPage() {
  const events = await getAllEventsInsecure();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Browse all Events</h1>

      {!events ? (
        <div className="text-center py-8">
          <strong className="text-xl text-gray-700">
            Sorry, no events found in this category
          </strong>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center">
          {events.map((event) => (
            <Link key={`id-${event.eventId}`} href={`/events/${event.eventId}`}>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-blue-50 hover:scale-105 transition-all">
                <div className="text-lg font-medium text-gray-800 text-center">
                  {!event.eventName
                    ? `Game ${event.part1Name} vs ${event.part2Name}`
                    : event.eventName}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
