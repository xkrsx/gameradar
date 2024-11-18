import type { Event } from '../../../migrations/00004-createTableEvents';

type Props = {
  event: Event;
};

export default function SingleEvent(props: Props) {
  return (
    <div>
      <h1>Single Event</h1>
      <p>Single Event Page</p>
      {props.event.name}
    </div>
  );
}
