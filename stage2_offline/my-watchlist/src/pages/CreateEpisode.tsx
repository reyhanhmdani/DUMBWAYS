import { Link, useNavigate, useOutletContext, useParams } from "react-router";
import type { TypeEps } from "../data/episode";
import type React from "react";
import { useState } from "react";

export default function CreateEpisode() {
  const { seriesId } = useParams<{ seriesId: string }>();
  const navigate = useNavigate();

  const { episode, setEpisode } = useOutletContext<{
    episode: TypeEps[];
    setEpisode: React.Dispatch<React.SetStateAction<TypeEps[]>>;
  }>();

  const [season, setSeason] = useState<number>(1);
  const [episodeNumber, setEpisodeNumber] = useState<number>(1);
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [link, setLink] = useState("");
  const [watched, setWatched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newEpisode: TypeEps = {
      id: Date.now(),
      seriesId: Number(seriesId),
      season,
      episodeNumber,
      title,
      platform,
      link,
      watched,
    };
    setEpisode([...episode, newEpisode]);
    navigate(`/series/${seriesId}`);
  };

  return (
    <div className="min-h-screen  text-[#e2e2e2] p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-xl bg-[#141414] rounded-xl p-6 border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 text-sm">
            ← Back
          </Link>
          <h1 className="text-xl font-bold text-white tracking-tight">Add Episode</h1>
        </div>

        {/* Static Form */}
        <form className="space-y-4 flex flex-col" onSubmit={handleSubmit}>
          {/* Season & Episode Number Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-400" htmlFor="season">
                Season <span className="text-red-600">*</span>
              </label>
              <input
                id="season"
                type="number"
                placeholder="e.g. 1"
                className="bg-[#333333] border-b-2 border-transparent focus:border-red-600 rounded-t-md px-3 py-2.5 text-white w-full transition-colors text-sm outline-none placeholder-zinc-500"
                value={season}
                onChange={(e) => setSeason(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-400" htmlFor="episode_number">
                Episode Number <span className="text-red-600">*</span>
              </label>
              <input
                id="episode_number"
                type="number"
                placeholder="e.g. 1"
                className="bg-[#333333] border-b-2 border-transparent focus:border-red-600 rounded-t-md px-3 py-2.5 text-white w-full transition-colors text-sm outline-none placeholder-zinc-500"
                value={episodeNumber}
                onChange={(e) => setEpisodeNumber(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Episode Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400" htmlFor="episode_title">
              Episode Title <span className="text-red-600">*</span>
            </label>
            <input
              id="episode_title"
              type="text"
              placeholder="e.g. The Flame Hashira Kyojuro Rengoku"
              className="bg-[#333333] border-b-2 border-transparent focus:border-red-600 rounded-t-md px-3 py-2.5 text-white w-full transition-colors text-sm outline-none placeholder-zinc-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Platform */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400" htmlFor="platform">
              Platform (Netflix / Crunchyroll / YouTube / etc.)
            </label>
            <input
              id="platform"
              type="text"
              placeholder="e.g. Netflix"
              className="bg-[#333333] border-b-2 border-transparent focus:border-red-600 rounded-t-md px-3 py-2.5 text-white w-full transition-colors text-sm outline-none placeholder-zinc-500"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            />
          </div>

          {/* Link */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400" htmlFor="episode_link">
              Link (YouTube / Netflix / Others) <span className="text-red-600">*</span>
            </label>
            <input
              id="episode_link"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              className="bg-[#333333] border-b-2 border-transparent focus:border-red-600 rounded-t-md px-3 py-2.5 text-white w-full transition-colors text-sm outline-none placeholder-zinc-500"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          {/* Status Radio */}
          <div className="flex flex-col gap-2 pt-1">
            <label className="text-xs font-semibold text-zinc-400">Status</label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="status"
                  value="not_watched"
                  checked={!watched}
                  onChange={() => setWatched(false)}
                  className="accent-red-600"
                />
                <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">Not Watched</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="status"
                  value="watched"
                  checked={watched}
                  onChange={() => setWatched(true)}
                  className="accent-red-600"
                />
                <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">Watched</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800 mt-3">
            <Link
              to="/"
              className="px-4 py-2 rounded text-xs font-semibold text-zinc-300 bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/20"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-5 py-2 rounded text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-all uppercase tracking-wider shadow-lg"
            >
              Save Episode
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
