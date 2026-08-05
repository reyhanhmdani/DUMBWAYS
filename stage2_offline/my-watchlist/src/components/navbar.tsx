import { Button } from "./ui/button";

interface NavbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onAddNew: () => void;
}

export function Navbar({ search, onSearchChange, onAddNew }: NavbarProps) {
  return (
    <div className="flex flex-col mx-auto max-w-5xl sm:flex-row justify-between items-stretch sm:items-center gap-3 py-3 px-4 bg-zinc-950 border-b border-slate-800">
      <div className="flex justify-between items-center">
        <div className="text-red-500 font-bold text-xl tracking-wide flex items-center gap-2">
         NETFLIX
        </div>
        <Button size="sm" className="bg-red-600 text-white hover:bg-red-500 font-medium sm:hidden" onClick={onAddNew}>
          + Add New
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search my watchlist..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="text-white bg-slate-900 px-3 py-1.5 rounded-md border border-slate-800 focus:outline-none w-full sm:w-64 text-sm"
        />

        <Button size="sm" className="bg-red-600 text-white hover:bg-red-500 font-medium hidden sm:inline-flex" onClick={onAddNew}>
          + Add New
        </Button>
      </div>
    </div>
  );
}
