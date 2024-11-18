import Nav from '../Nav/Nav';

export default function Header() {
  return (
    <div>
      <Nav />
      Project by{' '}
      <a href="https://github.com/xkrsx" target="_blank">
        Kryzys
      </a>{' '}
      /{' '}
      <a href="https://github.com/xkrsx/gameradar" target="_blank">
        GitHub
      </a>
      .
    </div>
  );
}
