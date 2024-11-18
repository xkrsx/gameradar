'use server';

import { getAllSportsInsecure } from '../../../database/sports';
import AddEventForm from './AddEventForm';

export default async function AddEvent() {
  const sports = await getAllSportsInsecure();

  return <AddEventForm sports={sports} />;
}
