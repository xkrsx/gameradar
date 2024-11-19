import Link from 'next/link';
import { getAllVenuesInsecure } from '../../database/venues';

export default async function VenuesPage() {
  const venues = await getAllVenuesInsecure();
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Browse all Venues</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {venues.map((venue) => {
          return (
            <Link key={`id-${venue.id}`} href={`/venues/${venue.id}`}>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-blue-50 hover:scale-105 transition-all">
                <div className="text-lg font-medium text-gray-800 text-center">
                  {venue.name}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
