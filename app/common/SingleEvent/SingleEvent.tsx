import type { fullEvent } from '../../../migrations/00004-createTableEvents';

type Props = {
  event: fullEvent;
};

export default function SingleEvent(props: Props) {
  return (
    <div>
      <h1>{!props.event.name ? 'Game' : props.event.name}</h1>
      <h2>
        {props.event.part1} : {props.event.part2}
      </h2>
      <p>{props.event.description}</p>
    </div>
  );
}
