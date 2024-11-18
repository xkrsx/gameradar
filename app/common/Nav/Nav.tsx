import Link from 'next/link';

export default function Nav() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/events">Events</Link>
        </li>
        <li>
          <Link href="/events/add">Add event</Link>
        </li>
        <li>
          <Link href="/sports">Sports</Link>
        </li>
        <li>
          <Link href="/participants">Athletes / Clubs</Link>
        </li>
        <li>
          <Link href="/venues">Venues</Link>
        </li>
      </ul>
    </div>
  );
}
