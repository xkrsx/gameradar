import { notFound } from 'next/navigation';
import { getSingleEventByIdInsecure } from '../../../database/events';
import SingleEvent from '../../common/SingleEvent/SingleEvent';

export async function generateMetadata(props: Props) {
  const singleEvent = await getSingleEventByIdInsecure(
    Number((await props.params).id),
  );

  if (!singleEvent) {
    throw new Error('Event not found');
  }

  return {
    title: singleEvent,
    description: `Single Event Page: ${singleEvent}`,
  };
}

type Props = {
  params: Promise<{
    id: string;
  }>;
};
export default async function EventPage(props: Props) {
  const event = await getSingleEventByIdInsecure(
    Number((await props.params).id),
  );

  if (!event) {
    notFound();
  }

  return (
    <div>
      <h1>Event</h1>
      <SingleEvent event={event} />
    </div>
  );
}
