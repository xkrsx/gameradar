import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { ZodIssue } from 'zod';
import { createEventInsecure } from '../../../database/events';
import {
  eventSchema,
  type FullEvent,
  type NewEvent,
} from '../../../migrations/00004-createTableEvents';

export type EventResponseBodyPost =
  | {
      event: NewEvent;
    }
  | { error: string }
  | { errorIssues: ZodIssue[] };

export async function POST(
  request: Request,
): Promise<NextResponse<EventResponseBodyPost>> {
  const requestBody: NewEvent = await request.json();

  // Validation schema for request body
  const result = eventSchema.safeParse(requestBody);

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
    name: result.data.name,
    sportId: result.data.sportId,
    part1Id: result.data.part1Id,
    part2Id: result.data.part2Id,
    timeStart: result.data.timeStart,
    venueId: result.data.venueId,
    description: result.data.description,
    tickets: result.data.tickets,
    slug: result.data.slug,
  });

  if (!newEvent) {
    return NextResponse.json(
      { error: 'Failed to create event.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ event: newEvent });
}
