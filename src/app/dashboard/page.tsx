'use client';

import { useEffect, useState, useCallback } from 'react';
import { getCharacters } from '@/services/api';
import { Character } from '@/types';
import CharacterCard from '@/components/CharacterCard';
import StatsCard from '@/components/StatsCard';
import DashboardHeader from '@/components/DashboardHeader';
import FiltersPanel from '@/components/FiltersPanel';
import LoadingState from '@/components/LoadingState';
import { useDebounce } from '@/utils/hooks';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<Character['status'] | 'all'>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const debouncedSearch = useDebounce(search, 500);

  const fetchCharacters = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching characters...', { page, search: debouncedSearch, status: statusFilter });

      const response = await getCharacters({
        page,
        name: debouncedSearch,
        status: statusFilter === 'all' ? '' : statusFilter,
      });

      console.log('API Response:', response);

      if (response && response.results) {
        setCharacters(response.results);
        setTotalPages(response.info?.pages || 0);
        setTotalResults(response.info?.count || 0);
      } else {
        setCharacters([]);
        setTotalPages(0);
        setTotalResults(0);
      }
    } catch (err: unknown) {
      console.error('Fetch Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al conectar con la Ciudadela';
      setError(errorMessage);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, statusFilter]);

  // Auth & Initial Fetch
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    console.log('Auth check in Dashboard:', auth);

    if (auth !== 'true') {
      console.log('User not authenticated, redirecting to login...');
      router.push('/login');
      return;
    }

    fetchCharacters();
  }, [fetchCharacters, router]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter]);

  const stats = {
    total: characters.length,
    alive: characters.filter(c => c.status === 'Alive').length,
    dead: characters.filter(c => c.status === 'Dead').length,
    unknown: characters.filter(c => c.status === 'unknown').length,
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    window.dispatchEvent(new Event("auth-update"));
    router.push('/login');
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <FiltersPanel
          search={search}
          status={statusFilter}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
        />

        <div className="mt-8 p-4 rounded-xl bg-black/20 border border-white/5">
          <p className="text-[10px] text-[var(--secondary)] font-black uppercase tracking-widest mb-1">Sector 7-G</p>
          <p className="text-xs text-zinc-400">Dimensión actual: C-137</p>
        </div>

        <button
          onClick={handleLogout}
          className="px-6 py-3 rounded-xl bg-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-widest hover:bg-[var(--danger)] hover:text-white transition-all mt-8 w-full"
        >
          Close Session
        </button>
      </aside>

      <main className="dashboard-content">
        <DashboardHeader
          title="Multiverse Registry"
          subtitle="Real-time monitoring of interdimensional entities"
        />

        <div className="stats-grid">
          <StatsCard title="Found" value={stats.total} variant="default" />
          <StatsCard title="Active" value={stats.alive} variant="success" />
          <StatsCard title="Terminated" value={stats.dead} variant="danger" />
          <StatsCard title="Unknown" value={stats.unknown} variant="warning" />
        </div>

        <div className="mb-6 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
          <div>
            Total Matches: <span className="text-[var(--primary)]">{totalResults}</span>
          </div>
          <div>
            Page {page} / {totalPages}
          </div>
        </div>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <div className="p-10 text-center rounded-2xl bg-red-900/20 border border-red-500/20 text-red-500 font-bold uppercase tracking-widest text-sm">
            {error}
          </div>
        ) : characters.length === 0 ? (
          <div className="p-10 text-center rounded-2xl bg-zinc-900/50 border border-white/5 text-zinc-500 uppercase tracking-widest text-sm">
            No entities detected in this coordinate range.
          </div>
        ) : (
          <>
            <div className="card-grid">
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-4 mt-12 pb-10">
                <button
                  className="px-8 py-3 rounded-full bg-zinc-800 text-white text-[10px] font-black uppercase tracking-widest hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  disabled={page <= 1}
                  onClick={() => setPage(p => p - 1)}
                >
                  Prev Dim
                </button>

                <button
                  className="px-8 py-3 rounded-full bg-[var(--primary)] text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(151,206,76,0.2)]"
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => p + 1)}
                >
                  Next Dim
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
