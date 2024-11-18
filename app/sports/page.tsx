import Link from 'next/link';
import { getAllSportsInsecure } from '../../database/sports';

export default async function SportsPage() {
  const sports = await getAllSportsInsecure();
  return (
    <div className="wrapper">
      <h1>Browse all sports</h1>
      <div className="sports">
        {sports.map((sport) => {
          return (
            <Link key={`id-${sport.id}`} href={`/sports/${sport.slug}`}>
              <div className="sport">
                <div className="sport-name">{sport.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
