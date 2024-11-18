'use client';

import { useRouter } from 'next/navigation';
import { type ChangeEvent, useState } from 'react';
import type { Sport } from '../../../migrations/00001-createTableSports';
import type { Venue } from '../../../migrations/00002-createTableVenues';
import type { Participant } from '../../../migrations/00003-createTableParticipants';
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
  const [isDisabled, setIsDisabled] = useState(false);

  const router = useRouter();

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    checkForm();

    const response = await fetch('/api/events/', {
      method: 'POST',
      body: JSON.stringify(newEvent),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if ('errors' in data) {
      setErrorMessage(String(data.errors));
      return;
    }
    if ('event' in data) {
      router.push(`/events/${data.event.id}`);
    }
  }

  function checkForm() {
    if (newEvent.eventName.length < 3) {
      setErrorMessage('Event name must have at least 3 characters.');
    }
    if (newEvent.eventName.length >= 255) {
      setErrorMessage('Event name must have maximum 255 characters.');
    }
    if (newEvent.eventDescription.length < 3) {
      setErrorMessage('Event description must have at least 3 characters.');
    }
    if (newEvent.eventName.length >= 3 && newEvent.eventName.length <= 255) {
      setIsDisabled(false);
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
    <div className="wrapper">
      <h1>Add event</h1>
      <div className="add-event">
        <form
          className="form"
          onSubmit={async (event) => {
            // eslint error: no preventDefault() even though there is one in called function
            event.preventDefault();
            await handleCreate(event);
          }}
        >
          <label>
            Name
            <input
              required
              name="eventName"
              value={newEvent.eventName}
              onChange={handleChange}
            />
          </label>
          <label>
            Sport
            <select name="eventSportId" onChange={handleChange}>
              <option defaultValue="true" hidden disabled />

              {props.sports.map((sport) => {
                return (
                  <option key={`option-key-${sport.name}`} value={sport.id}>
                    {sport.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            Participant 1
            <select name="eventPart1Id" onChange={handleChange}>
              <option defaultValue="true" hidden disabled />

              {props.participants.map((participant) => {
                return (
                  <option
                    key={`option-key-${participant.name}`}
                    value={participant.id}
                  >
                    {participant.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            Participant 2
            <select name="eventPart2Id" onChange={handleChange}>
              <option defaultValue="true" hidden disabled />

              {props.participants.map((participant) => {
                return (
                  <option
                    key={`option-key-${participant.name}`}
                    value={participant.id}
                  >
                    {participant.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            Start time
            <input
              aria-label="Date and time"
              type="datetime-local"
              required
              name="eventTimeStart"
              value={newEvent.eventTimeStart}
              onChange={handleChange}
            />
          </label>
          <label>
            Venue
            <select name="eventVenueId" onChange={handleChange}>
              <option defaultValue="true" hidden disabled />

              {props.venues.map((venue) => {
                return (
                  <option key={`option-key-${venue.name}`} value={venue.id}>
                    {venue.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            Tickets €
            <input
              name="eventTickets"
              type="number"
              value={newEvent.eventTickets}
              onChange={handleChange}
            />
          </label>
          <label>
            Description
            <input
              name="eventDescription"
              required
              value={newEvent.eventDescription}
              onChange={handleChange}
            />
          </label>
          <label>
            your email
            <input
              type="email"
              name="eventUserEmail"
              value={newEvent.eventUserEmail}
              onChange={handleChange}
            />
          </label>
          <button className="button-confirm" disabled={isDisabled}>
            Add event
          </button>
        </form>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </div>
    </div>
  );
}
