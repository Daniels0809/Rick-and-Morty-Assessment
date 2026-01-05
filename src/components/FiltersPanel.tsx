import { Character } from '@/types';

interface FiltersPanelProps {
  search: string;
  status: Character['status'] | 'all';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: Character['status'] | 'all') => void;
}

export default function FiltersPanel({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: FiltersPanelProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold mb-2 text-portal">Trans-Dimensional Filters</h3>

      <div>
        <label className="text-sm font-semibold mb-1 block text-muted">Search Entity</label>
        <input
          type="text"
          className="form-control"
          placeholder="Name (e.g. Rick)..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-semibold mb-1 block text-muted">Vital Status</label>
        <select
          className="form-select"
          value={status}
          onChange={e => onStatusChange(e.target.value as Character['status'] | 'all')}
        >
          <option value="all">All Realities</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Deceased</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div className="mt-4 p-4 rounded bg-[rgba(0,181,204,0.1)] border border-[rgba(0,181,204,0.2)]">
        <small className="text-rick italic">
          "Don't think about it, Morty. Just filter the list!"
        </small>
      </div>
    </div>
  );
}
