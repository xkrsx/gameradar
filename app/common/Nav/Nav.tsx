import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link
            href="/"
            className="text-white hover:text-gray-300 transition duration-200"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/events"
            className="text-white hover:text-gray-300 transition duration-200"
          >
            Events
          </Link>
        </li>
        <li>
          <Link
            href="/events/add"
            className="text-white hover:text-gray-300 transition duration-200"
          >
            Add Event
          </Link>
        </li>
        <li>
          <Link
            href="/sports"
            className="text-white hover:text-gray-300 transition duration-200"
          >
            Sports
          </Link>
        </li>
        <li>
          <Link
            href="/participants"
            className="text-white hover:text-gray-300 transition duration-200"
          >
            Athletes / Clubs
          </Link>
        </li>
        <li>
          <Link
            href="/venues"
            className="text-white hover:text-gray-300 transition duration-200"
          >
            Venues
          </Link>
        </li>
      </ul>
    </nav>
  );
}
