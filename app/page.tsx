import Image from 'next/image';
import Link from 'next/link';
import type { UrlObject } from 'url';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100 text-gray-800 flex flex-col items-center">
      <header className="mt-12 text-center px-4">
        {/* Responsive Logo with Rounded Corners */}
        <div className="w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 mx-auto rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/logo.webp"
            alt="GameRadar Logo"
            width={300}
            height={300}
            className="w-full h-full object-contain"
            priority
          />
        </div>
        {/* Intro Text */}
        <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-gray-700">
          Welcome to{' '}
          <span className="font-semibold text-blue-500">GameRadar</span>, your
          calendar with all the sport events!
        </p>
      </header>
      <main className="mt-10 w-full max-w-3xl">
        <div className="flex flex-wrap justify-center gap-6">
          {/* First Row */}
          <div className="flex w-full justify-between gap-6">
            <LinkCard
              href="/events"
              text="Check all the Events"
              color="from-green-400 to-green-600"
            />
            <LinkCard
              href="/events/add"
              text="Add your own Event"
              color="from-yellow-400 to-yellow-600"
            />
            <LinkCard
              href="/sports"
              text="Browse list of all Sports"
              color="from-blue-400 to-blue-600"
            />
          </div>
          {/* Second Row */}
          <div className="flex w-full justify-around gap-6">
            <LinkCard
              href="/participants"
              text="Looking for Athletes / Clubs?"
              color="from-pink-400 to-pink-600"
            />
            <LinkCard
              href="/venues"
              text="See events happening in each Venue"
              color="from-purple-400 to-purple-600"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

type Props = {
  href: UrlObject | string;
  text: string;
  color: string;
};

function LinkCard(props: Props) {
  return (
    <Link
      href={props.href as UrlObject}
      className={`flex-1 block p-6 bg-gradient-to-r ${props.color} text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all text-center`}
    >
      <p className="text-lg font-semibold text-white drop-shadow-md">
        {props.text}
      </p>
    </Link>
  );
}
