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
    name: '',
    sportId: 0,
    part1Id: 0,
    part2Id: 0,
    timeStart: '',
    venueId: 0,
    description: '',
    tickets: '',
    slug: '',
    email: '',
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
    if (newEvent.name.length < 3) {
      setErrorMessage('Event name must have at least 3 characters.');
    }
    if (newEvent.name.length >= 255) {
      setErrorMessage('Event name must have maximum 255 characters.');
    }
    if (newEvent.description.length < 3) {
      setErrorMessage('Event description must have at least 3 characters.');
    }
    if (newEvent.name.length >= 3 && newEvent.name.length <= 255) {
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
              name="name"
              value={newEvent.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Sport
            <select name="sportId" onChange={handleChange}>
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
            <select name="part1Id" onChange={handleChange}>
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
            <select name="part2Id" onChange={handleChange}>
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
              name="timeStart"
              value={newEvent.timeStart}
              onChange={handleChange}
            />
          </label>
          <label>
            Venue
            <select name="venueId" onChange={handleChange}>
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
              name="tickets"
              type="number"
              value={newEvent.tickets}
              onChange={handleChange}
            />
          </label>
          <label>
            Description
            <input
              name="description"
              required
              value={newEvent.description}
              onChange={handleChange}
            />
          </label>
          <label>
            your email
            <input
              name="email"
              value={newEvent.email}
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
