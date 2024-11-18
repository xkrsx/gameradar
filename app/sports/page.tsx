import Link from 'next/link';
import { getAllSportsInsecure } from '../../database/sports';

export default async function SportsPage() {
  const sports = await getAllSportsInsecure();
  return (
    <div>
      <h1>Browse all sports</h1>
      <div>
        {sports.map((sport) => {
          return (
            <Link key={`id-${sport.id}`} href={`/sports/${sport.slug}`}>
              <div>
                <div>{sport.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
