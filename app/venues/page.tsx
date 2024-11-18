import Link from 'next/link';
import { getAllVenuesInsecure } from '../../database/venues';

export default async function VenuesPage() {
  const venues = await getAllVenuesInsecure();
  return (
    <div>
      <h1>Browse all venues</h1>
      <div>
        {venues.map((venue) => {
          return (
            <Link key={`id-${venue.id}`} href={`/venues/${venue.id}`}>
              <div>
                <div>{venue.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
