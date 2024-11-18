import Link from 'next/link';
import { getAllSportsInsecure } from '../../database/sports';

export default async function SportsPage() {
  const sports = await getAllSportsInsecure();
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Browse all Sports</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {sports.map((sport) => {
          return (
            <Link key={`id-${sport.id}`} href={`/sports/${sport.slug}`}>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:bg-blue-50 hover:scale-105 transition-all">
                <div className="text-lg font-medium text-gray-800 text-center">
                  {sport.name}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
