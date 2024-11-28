import { NextResponse } from 'next/server';
import { createEventInsecure } from '../../../database/events';
import {
  createUserInsecure,
  getUserByEmailInsecure,
} from '../../../database/users';
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

  let newUser = undefined;

  const checkUserEmail = await getUserByEmailInsecure(
    requestBody.eventUserEmail,
  );
  if (!checkUserEmail) {
    newUser = (await createUserInsecure(requestBody.eventUserEmail))!.id;
  } else {
    newUser = checkUserEmail.id;
  }

  const { eventUserEmail, ...remainingRequestBody } = requestBody;

  const updatedBody = {
    ...remainingRequestBody,
    eventSportId: Number(requestBody.sportId),
    eventPart1Id: Number(requestBody.part1Id),
    eventPart2Id: Number(requestBody.part2Id),
    eventVenueId: Number(requestBody.venueId),
    eventUserId: Number(newUser),
  };

  // Validation schema for request body
  const result = eventSchema.safeParse(updatedBody);

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
    name: result.data.eventName as string,
    sportId: result.data.eventSportId,
    part1Id: result.data.eventPart1Id,
    part2Id: result.data.eventPart2Id,
    timeStart: new Date(result.data.eventTimeStart),
    venueId: result.data.eventVenueId as number,
    description: result.data.eventDescription,
    tickets: result.data.eventTickets ?? null,
    userId: result.data.eventUserId,
  });

  if (!newEvent) {
    return NextResponse.json(
      { error: 'Failed to create event.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ event: newEvent });
}
