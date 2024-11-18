import Nav from '../Nav/Nav';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-4 mt-8">
      <div className="container mx-auto text-center space-y-4">
        <Nav />
        <p className="text-sm text-gray-400">
          Project by{' '}
          <a
            href="https://github.com/xkrsx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 transition duration-200"
          >
            Kryzys
          </a>{' '}
          /{' '}
          <a
            href="https://github.com/xkrsx/gameradar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 transition duration-200"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
