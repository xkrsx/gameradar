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
        events.map((event: Event) => (
          <SingleEvent key={`id-${event.id}`} event={event} />
        ))
      )}
    </div>
  );
}
