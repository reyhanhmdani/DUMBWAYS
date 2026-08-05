import { useState } from "react";
import "./App.css";
import type { TypeSeries } from "./data/watchlist";
import type { TypeEps } from "./data/episode";
import { Link, useOutletContext } from "react-router";
import { Button } from "./components/ui/button";

interface OutletContextType {
  series: TypeSeries[];
  setSeries: React.Dispatch<React.SetStateAction<TypeSeries[]>>;
  episode: TypeEps[];
  setEpisode: React.Dispatch<React.SetStateAction<TypeEps[]>>;
  search: string;
  setSearch: (val: string) => void;
}

function App() {
  const { series = [], episode = [], search = "" } = useOutletContext<OutletContextType>();
  const [sortBy, setSortBy] = useState<string>("default");

  const getProgress = (seriesId: number) => {
    const seriesEps = episode.filter((ep) => ep.seriesId === seriesId);
    const watchedCount = seriesEps.filter((ep) => ep.watched).length;
    const totalEps = seriesEps.length;
    return totalEps > 0 ? Math.round((watchedCount / totalEps) * 100) : 0;
  };

  const filteredSeries = series.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedSeries = [...filteredSeries].sort((a, b) => {
    if (sortBy === "title-asc") return a.title.localeCompare(b.title);
    if (sortBy === "title-desc") return b.title.localeCompare(a.title);
    if (sortBy === "year-desc") return b.year - a.year;
    if (sortBy === "year-asc") return a.year - b.year;
    if (sortBy === "progress-desc") return getProgress(b.id) - getProgress(a.id);
    if (sortBy === "progress-asc") return getProgress(a.id) - getProgress(b.id);
    return 0;
  });

  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">My Watchlist</h2>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs text-zinc-400 font-medium">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#1a1c1c] border border-[#333535] text-xs text-zinc-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-red-600 cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="title-asc">Judul (A - Z)</option>
            <option value="title-desc">Judul (Z - A)</option>
            <option value="year-desc">Tahun (Terbaru)</option>
            <option value="year-asc">Tahun (Terlama)</option>
            <option value="progress-desc">Progress (Tertinggi)</option>
            <option value="progress-asc">Progress (Terendah)</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {sortedSeries.map((item) => {
          const seriesEps = episode.filter((ep) => ep.seriesId === item.id);
          const watchedCount = seriesEps.filter((ep) => ep.watched).length;
          const totalEps = seriesEps.length;
          const progressPercent = totalEps > 0 ? Math.round((watchedCount / totalEps) * 100) : 0;

          return (
            <div key={item.id} className="flex items-center gap-4 bg-[#1a1c1c] border border-[#333535] p-4 rounded-xl">
              <img src={item.poster} alt={item.title} className="w-20 h-28 object-cover rounded-lg shrink-0 bg-zinc-800" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white truncate">{item.title}</h3>
                  <span className="text-xs bg-purple-950 text-purple-300 px-2 py-0.5 rounded-full border border-purple-800">
                    {item.type}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 mb-2">
                  {item.year} • {item.genre}
                </p>

                <p className="text-sm text-zinc-300 line-clamp-2 mb-3">{item.description}</p>

                {/* Progress Bar Dinamis */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-red-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-zinc-400 min-w-[32px] text-right">
                    {progressPercent}%
                  </span>
                </div>

                <Link to={`/Series/${item.id}`}>
                  <Button size="sm" className="bg-red-600 hover:bg-red-500">
                    Detail
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
