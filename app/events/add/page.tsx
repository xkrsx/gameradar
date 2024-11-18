'use server';

import { getAllParticipantsInsecure } from '../../../database/participants';
import { getAllSportsInsecure } from '../../../database/sports';
import { getAllVenuesInsecure } from '../../../database/venues';
import AddEventForm from './AddEventForm';

export default async function AddEvent() {
  const sports = await getAllSportsInsecure();
  const participants = await getAllParticipantsInsecure();
  const venues = await getAllVenuesInsecure();

  return (
    <AddEventForm sports={sports} participants={participants} venues={venues} />
  );
}
