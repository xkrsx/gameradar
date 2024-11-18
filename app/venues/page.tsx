import Link from 'next/link';
import { getAllVenuesInsecure } from '../../database/venues';

export default async function VenuesPage() {
  const venues = await getAllVenuesInsecure();
  return (
    <div className="wrapper">
      <h1>Browse all venues</h1>
      <div className="venues">
        {venues.map((venue) => {
          return (
            <Link key={`id-${venue.id}`} href={`/venues/${venue.id}`}>
              <div className="venue">
                <div className="venue-name">{venue.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
