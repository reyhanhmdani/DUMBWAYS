import { useParams, Link, useOutletContext } from "react-router";
import { Button } from "../components/ui/button";
import type { TypeEps } from "../data/episode";
import type { TypeSeries } from "../data/watchlist";

export default function DetailSeries() {
  const { id } = useParams<{ id: string }>();
  // const navigate = useNavigate();

  // const series = DataSeries.find((s) => s.id === Number(id));
  const { series, setSeries, episode } = useOutletContext<{
    series: TypeSeries[];
    setSeries: React.Dispatch<React.SetStateAction<TypeSeries[]>>;
    episode: TypeEps[];
  }>();

  const currentSeries = series.find((item) => item.id === Number(id));
  if (!currentSeries) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-500 font-bold text-lg mb-2">404</p>
          <h1 className="text-2xl font-bold mb-4">Series tidak ditemukan</h1>
          <Link to="/" className="text-xs bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md">
            Kembali ke Home
          </Link>
        </div>
      </div>
    );
  }

  // Filter episodes belonging to this series
  const filteredEpisode = episode.filter((ep) => ep.seriesId === currentSeries.id);
  const watchedEps = filteredEpisode.filter((ep) => ep.watched).length;
  const totalEps = filteredEpisode.length;
  const progressPercent = totalEps > 0 ? Math.round((watchedEps / totalEps) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#121414] text-[#e2e2e2] px-4 md:px-8 py-6 max-w-6xl mx-auto flex flex-col items-center">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6 w-full">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-white hover:text-red-500 transition-colors">
            ← Back
          </Link>
          <h1 className="text-xl font-bold md:hidden truncate">{currentSeries.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/EditSeries/${currentSeries.id}`}
            className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#282a2b] text-white border border-[#333535] hover:bg-[#38393a] transition-colors text-xs font-semibold"
          >
            Edit
          </Link>
        </div>
      </div>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-8 w-full">
        {/* Poster */}
        <div className="w-full md:w-1/3 max-w-[320px] mx-auto md:mx-0 shrink-0">
          <div className="rounded-xl overflow-hidden shadow-2xl relative aspect-[2/3] bg-[#222]">
            <img src={currentSeries.poster} alt={currentSeries.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Details Column */}
        <div className="flex flex-col justify-between md:w-2/3">
          <div>
            <h1 className="hidden md:block text-3xl font-extrabold text-white mb-2">{currentSeries.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-md border border-[#333535] bg-[#1a1c1c] text-xs font-medium text-white">
                {currentSeries.type}
              </span>
              <span className="text-sm text-zinc-400">
                {currentSeries.year} • {currentSeries.genre}
              </span>
            </div>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">{currentSeries.description}</p>
          </div>

          {/* Season Selector & Progress Card */}
          <div className="bg-[#1a1c1c] p-4 rounded-xl border border-[#333535] mt-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-3">
              <select className="bg-[#333535] border border-[#333535] text-white text-xs rounded-lg px-3 py-2 outline-none cursor-pointer">
                <option>Season 1</option>
                <option>Season 2</option>
              </select>
              <div className="flex items-center gap-3 w-full sm:w-1/2">
                <div className="flex-1 h-2 bg-[#333535] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-600 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-white whitespace-nowrap">{progressPercent}%</span>
              </div>
            </div>
            <div className="text-xs text-zinc-400 text-right">
              {watchedEps} / {totalEps} episodes watched
            </div>
          </div>
        </div>
      </div>
      {/* Episodes Section */}
      <div className="w-full mt-4">
        <div className="flex items-center justify-between mb-4 border-b border-[#333535] pb-3">
          <h2 className="text-xl font-bold text-white">Episodes</h2>
          <Button size="default" className="bg-red-600 text-white hover:bg-red-500 font-medium">
            <Link to={`/series/${currentSeries.id}/createEpisode`}> Add New</Link>
          </Button>
        </div>

        {/* Episode List */}
        <div className="flex flex-col gap-2">
          {filteredEpisode.length > 0 ? (
            filteredEpisode.map((episode) => (
              <div
                key={episode.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#1a1c1c] transition-colors border border-transparent hover:border-[#333535] group cursor-pointer"
              >
                <span className="w-6 text-center text-xs font-bold text-zinc-400 group-hover:text-red-500">
                  {episode.episodeNumber}
                </span>

                <div className="w-24 aspect-video rounded-md overflow-hidden shrink-0 bg-[#333535] relative">
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-500">
                    ▶
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-white group-hover:text-red-500 transition-colors truncate">
                    {episode.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={episode.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white"
                  >
                    🔗 {episode.platform || "Watch"}
                  </a>

                  <span className={`text-base ${episode.watched ? "text-emerald-400" : "text-zinc-600"}`}>
                    {episode.watched ? "✅" : "⭕"}
                  </span>
                </div>

                {/* tombol edit eps */}
                <Link
                  to={`/series/${currentSeries.id}/editEpisode/${episode.id}`}
                  className="text-xs text-zinc-400 hover:text-white px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 rounded transition-colors"
                >
                  Edit
                </Link>
              </div>
            ))
          ) : (
            <p className="text-xs text-zinc-500 py-4 text-center">Belum ada episode terdaftar untuk series ini.</p>
          )}
        </div>
      </div>
    </div>
  );
}
