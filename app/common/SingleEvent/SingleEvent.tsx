import type { FullEvent } from '../../../migrations/00004-createTableEvents';

type Props = {
  event: FullEvent;
};

export default function SingleEvent(props: Props) {
  return (
    <div>
      <h1>{!props.event.eventName ? 'Game' : props.event.eventName}</h1>
      <h2>
        {props.event.part1Name} : {props.event.part2Name}
      </h2>
      <p>{props.event.sportName}</p>
      <p>{String(props.event.eventTimeStart)}</p>
      <p>{props.event.venueName}</p>
      <p>{props.event.eventDescription}</p>
      <p>{props.event.eventTickets} €</p>
    </div>
  );
}
