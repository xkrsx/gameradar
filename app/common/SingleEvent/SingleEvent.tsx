import type { FullEvent } from '../../../migrations/00004-createTableEvents';

type Props = {
  event: FullEvent;
};

export default function SingleEvent(props: Props) {
  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">
        {props.event.eventName || 'Game'}
      </h1>
      <h2 className="text-xl text-gray-700">
        {props.event.part1Name} <span className="text-gray-500">vs</span>{' '}
        {props.event.part2Name}
      </h2>
      <p className="text-gray-600 font-semibold">{props.event.sportName}</p>
      <p className="text-gray-500">
        {new Date(props.event.eventTimeStart).toLocaleString()}
      </p>
      <p className="text-gray-600">{props.event.venueName}</p>
      <p className="text-gray-700">{props.event.eventDescription}</p>
      <p className="text-lg font-semibold text-gray-800">
        {props.event.eventTickets} €
      </p>
    </div>
  );
}
