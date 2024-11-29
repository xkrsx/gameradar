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
  const requestBody: NewEvent & { userEmail: string } = await request.json();

  console.log('requestBody:', requestBody);

  let newUser = undefined;

  const checkUserEmail = await getUserByEmailInsecure(requestBody.userEmail);
  if (!checkUserEmail) {
    newUser = (await createUserInsecure(requestBody.userEmail))!.id;
  } else {
    newUser = checkUserEmail.id;
  }

  const { userEmail, ...remainingRequestBody } = requestBody;

  console.log('requestBody 2:', requestBody);

  const updatedBody = {
    ...remainingRequestBody,
    sportId: Number(requestBody.sportId),
    part1Id: Number(requestBody.part1Id),
    part2Id: Number(requestBody.part2Id),
    timeStart: new Date(requestBody.timeStart),
    venueId: Number(requestBody.venueId),
    userId: Number(newUser),
  };

  console.log('updatedBody:', updatedBody);

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
    name: result.data.name as string,
    sportId: result.data.sportId,
    part1Id: result.data.part1Id,
    part2Id: result.data.part2Id,
    timeStart: new Date(result.data.timeStart),
    venueId: result.data.venueId as number,
    description: result.data.description,
    tickets: result.data.tickets ?? null,
    userId: result.data.userId,
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
