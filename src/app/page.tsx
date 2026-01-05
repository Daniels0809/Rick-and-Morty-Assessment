import Link from "next/link";

export default function Home() {
  return (
    <div className="hero-container">
      <div className="portal-bg"></div>

      <div className="hero-content relative">
        <h1 className="text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] drop-shadow-[0_0_10px_rgba(151,206,76,0.5)]">
          Rick and Morty<br />Assessment
        </h1>

        <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-300 leading-relaxed">
          Wubba Lubba Dub Dub! Welcome to the interdimensional character database.
          Refactored with Type safety and clean architecture across the multiverse.
        </p>

        <div className="flex gap-6 justify-center mb-16">
          <Link
            href="/login"
            className="btn btn-portal text-lg px-8 py-4"
          >
            Login to Access
          </Link>
          <Link
            href="https://rickandmortyapi.com/"
            target="_blank"
            className="btn btn-secondary text-lg px-8 py-4"
          >
            API Docs
          </Link>
        </div>

        <div className="text-left bg-[rgba(30,33,40,0.9)] p-8 rounded-xl border border-gray-700 backdrop-blur-sm max-w-2xl mx-auto shadow-2xl">
          <h3 className="text-xl font-bold mb-4 text-portal border-b border-gray-700 pb-2">Mission Report: Refactoring</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center"><span className="text-secondary mr-2">✓</span> <strong>Architecture:</strong> Segregated Logic, UI, and Dimensional Services.</li>
            <li className="flex items-center"><span className="text-secondary mr-2">✓</span> <strong>TypeScript:</strong> Omni-present strict typing enabled.</li>
            <li className="flex items-center"><span className="text-secondary mr-2">✓</span> <strong>Performance:</strong> Debounced search & optimized render cycles.</li>
            <li className="flex items-center"><span className="text-secondary mr-2">✓</span> <strong>UX:</strong> Portal-themed interface with immediate feedback.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
