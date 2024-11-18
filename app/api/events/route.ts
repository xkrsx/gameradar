import { create } from 'domain';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { ZodIssue } from 'zod';
import { createEventInsecure } from '../../../database/events';
import { createUserInsecure } from '../../../database/users';
import {
  eventSchema,
  type NewEvent,
} from '../../../migrations/00004-createTableEvents';

export type EventResponseBodyPost =
  | {
      event: NewEvent;
    }
  | { error: string };

export async function POST(
  request: Request,
): Promise<NextResponse<EventResponseBodyPost>> {
  const requestBody: NewEvent & { eventUserEmail: string } =
    await request.json();

  console.log('requestBody:', requestBody);

  const newUser = await createUserInsecure(requestBody.eventUserEmail);

  console.log('newUser:', newUser);

  const { eventUserEmail, ...remainingRequestBody } = requestBody;

  const updatedBody = {
    ...remainingRequestBody,
    eventSportId: Number(requestBody.eventSportId),
    eventPart1Id: Number(requestBody.eventPart1Id),
    eventPart2Id: Number(requestBody.eventPart2Id),
    eventVenueId: Number(requestBody.eventVenueId),
    eventUserId: Number(newUser!.id),
  };

  console.log('updatedBody:', updatedBody);

  // Validation schema for request body
  const result = eventSchema.safeParse(updatedBody);

  console.log('result:', result);

  // If client sends request body with incorrect data,
  // return a response with a 400 status code to the client
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request does not contain event object.',
        errorIssues: result.error.issues,
      },
      { status: 400 },
    );
  }

  const newEvent = await createEventInsecure({
    eventName: result.data.eventName,
    eventSportId: result.data.eventSportId,
    eventPart1Id: result.data.eventPart1Id,
    eventPart2Id: result.data.eventPart2Id,
    eventTimeStart: result.data.eventTimeStart,
    eventVenueId: result.data.eventVenueId,
    eventDescription: result.data.eventDescription,
    eventTickets: result.data.eventTickets,
    eventSlug: result.data.eventSlug,
    eventUserId: result.data.eventUserId,
  });

  console.log('newEvent:', newEvent);

  if (!newEvent) {
    return NextResponse.json(
      { error: 'Failed to create event.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ event: newEvent });
}
