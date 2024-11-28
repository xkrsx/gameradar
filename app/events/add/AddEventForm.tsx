'use client';

import { useRouter } from 'next/navigation';
import { type ChangeEvent, useState } from 'react';
import type { Sport } from '../../../migrations/00001-createTableSports';
import type { Venue } from '../../../migrations/00002-createTableVenues';
import type { Participant } from '../../../migrations/00003-createTableParticipants';
import type { FullEvent } from '../../../migrations/00004-createTableEvents';
import ErrorMessage from '../../ErrorMessage';

type Props = {
  sports: Sport[];
  participants: Participant[];
  venues: Venue[];
};

export default function AddEventForm(props: Props) {
  const [newEvent, setNewEvent] = useState({
    eventName: '',
    eventSportId: 0,
    eventPart1Id: 0,
    eventPart2Id: 0,
    eventTimeStart: '',
    eventVenueId: 0,
    eventDescription: '',
    eventTickets: '',
    eventSlug: '',
    eventUserId: '',
    eventUserEmail: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/events/', {
      method: 'POST',
      body: JSON.stringify(newEvent),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: FullEvent = await response.json();

    if ('errors' in data) {
      setErrorMessage(String(data.errors));
      return;
    }
    if ('event' in data) {
      router.push(`/events/${data.eventId}`);
    }
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) {
    const value = event.target.value;

    setErrorMessage('');
    setNewEvent({
      ...newEvent,
      [event.target.name]: value,
    });
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await handleCreate(event);
        }}
        className="space-y-6"
      >
        <div>
          Required fields *
          <label
            htmlFor="eventName"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Event Name
          </label>
          <input
            id="eventName"
            name="eventName"
            value={newEvent.eventName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="eventSportId"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Sport *
          </label>
          <select
            id="eventSportId"
            name="eventSportId"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" hidden disabled>
              Select a sport
            </option>
            {props.sports.map((sport) => (
              <option key={`sport-${sport.id}`} value={sport.id}>
                {sport.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="eventPart1Id"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Athlete / Club *
          </label>
          <select
            id="eventPart1Id"
            name="eventPart1Id"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" hidden disabled>
              Select participant 1
            </option>
            {props.participants.map((participant) => (
              <option
                key={`participant-1-${participant.id}`}
                value={participant.id}
              >
                {participant.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="eventPart2Id"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Athlete / Club *
          </label>
          <select
            id="eventPart2Id"
            name="eventPart2Id"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" hidden disabled>
              Select participant 2
            </option>
            {props.participants.map((participant) => (
              <option
                key={`participant-2-${participant.id}`}
                value={participant.id}
              >
                {participant.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="eventTimeStart"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Start Time *
          </label>
          <input
            id="eventTimeStart"
            name="eventTimeStart"
            type="datetime-local"
            value={newEvent.eventTimeStart}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="eventVenueId"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Venue
          </label>
          <select
            id="eventVenueId"
            name="eventVenueId"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" hidden disabled>
              Select a venue
            </option>
            {props.venues.map((venue) => (
              <option key={`venue-${venue.id}`} value={venue.id}>
                {venue.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="eventTickets"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Tickets (€)
          </label>
          <input
            id="eventTickets"
            name="eventTickets"
            type="number"
            value={newEvent.eventTickets}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="eventDescription"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Event Description
          </label>
          <input
            id="eventDescription"
            name="eventDescription"
            value={newEvent.eventDescription}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="eventUserEmail"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Your Email *
          </label>
          <input
            id="eventUserEmail"
            name="eventUserEmail"
            type="email"
            required
            value={newEvent.eventUserEmail}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200 disabled:bg-gray-400">
          Add Event
        </button>
      </form>

      <ErrorMessage>{errorMessage}</ErrorMessage>
    </div>
  );
}
