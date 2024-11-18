import Link from 'next/link';
import { getAllEventsInsecure } from '../../database/events';

export default async function EventsPage() {
  const events = await getAllEventsInsecure();
  return (
    <div>
      <h1>Browse all events</h1>
      <div>
        {!events ? (
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

                <Link  href="/events/find">
                  Find event
                </Link>
              </li> */}
          </ul>
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
    </div>
  );
}
