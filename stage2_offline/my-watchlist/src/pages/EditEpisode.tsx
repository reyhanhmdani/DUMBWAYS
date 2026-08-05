import { useNavigate, useOutletContext, useParams, Link } from "react-router";
import React, { useState } from "react";
import type { TypeEps } from "../data/episode";

export default function EditEpisode() {
  const { seriesId, episodeId } = useParams<{ seriesId: string; episodeId: string }>();
  const navigate = useNavigate();

  const { episode, setEpisode } = useOutletContext<{
    episode: TypeEps[];
    setEpisode: React.Dispatch<React.SetStateAction<TypeEps[]>>;
  }>();

  const existingEpisode = episode.find((eps) => eps.id === Number(episodeId));
  // cara lama
  // const [season, setSeason] = useState(() => existingEpisode?.season ?? 1);
  // const [episodeNumber, setEpisodeNumber] = useState(() => existingEpisode?.season ?? 1);
  // const [title, setTitle] = useState(() => existingEpisode?.title || "");
  // const [platform, setPlatform] = useState(() => existingEpisode?.platform || "");
  // dan field lain

  // Object State
  const [formData, setFormData] = useState({
    season: existingEpisode?.season ?? 1,
    episodeNumber: existingEpisode?.episodeNumber ?? 1,
    title: existingEpisode?.title ?? "",
    platform: existingEpisode?.platform ?? "",
    link: existingEpisode?.link ?? "",
    watched: existingEpisode?.watched ?? false,
  });

  if (!existingEpisode) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-500 font-bold text-lg mb-2">404</p>
          <h1 className="text-2xl font-bold mb-4">Episode tidak ditemukan</h1>
          <Link to={`/series/${seriesId}`} className="text-xs bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md">
            Kembali ke Home
          </Link>
        </div>
      </div>
    );
  }

  // helper 1 fungsi untuk handle semua input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmitChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    const updateEpisode = episode.map((item) => {
      if (item.id === Number(episodeId)) {
        return {
          ...item,
          ...formData,
        };
      }
      return item;
    });
    setEpisode(updateEpisode);
    navigate(`/series/${seriesId}`);
  };

  const handleDelete = () => {
    const konfirmasi = window.confirm(`Apakah anda yakin ingin menghapus nya`);

    if (konfirmasi) {
      const data = episode.filter((item) => item.id !== Number(episodeId));
      setEpisode(data);

      navigate(`/series/${seriesId}`);
    }
  };

  return (
    <div className="min-h-screen  text-[#e2e2e2] p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-xl bg-[#141414] rounded-xl p-6 border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <Link
              to={`/series/${seriesId}`}
              className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 text-sm"
            >
              ← Back
            </Link>
            <h1 className="text-xl font-bold text-white tracking-tight">Edit/Show Episode</h1>
          </div>
          <button
            type="button"
            aria-label="Delete Episode"
            className="flex items-center justify-center p-2 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all text-xs font-semibold gap-1.5"
            onClick={handleDelete}
          >
            🗑️ Delete
          </button>
        </div>

        <form className="space-y-4 flex flex-col" onSubmit={handleSubmitChange}>
          {/* Season & Episode Number Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-400" htmlFor="season">
                Season <span className="text-red-600">*</span>
              </label>
              <input
                id="season"
                name="season"
                type="number"
                placeholder="e.g. 1"
                className="bg-[#333333] border-b-2 border-transparent focus:border-red-600 rounded-t-md px-3 py-2.5 text-white w-full transition-colors text-sm outline-none placeholder-zinc-500"
                value={formData.season}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-400" htmlFor="episode_number">
                Episode Number <span className="text-red-600">*</span>
              </label>
              <input
                id="episode_number"
                name="episodeNumber"
                type="number"
                placeholder="e.g. 1"
                className="bg-[#333333] border-b-2 border-transparent focus:border-red-600 rounded-t-md px-3 py-2.5 text-white w-full transition-colors text-sm outline-none placeholder-zinc-500"
                value={formData.episodeNumber}
                onChange={handleChange}
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
              name="title"
              type="text"
              placeholder="e.g. The Flame Hashira Kyojuro Rengoku"
              className="bg-[#333333] border-b-2 border-transparent focus:border-red-600 rounded-t-md px-3 py-2.5 text-white w-full transition-colors text-sm outline-none placeholder-zinc-500"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* Platform */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400" htmlFor="platform">
              Platform (Netflix / Crunchyroll / YouTube / etc.)
            </label>
            <input
              id="platform"
              name="platform"
              type="text"
              placeholder="e.g. Netflix"
              className="bg-[#333333] border-b-2 border-transparent focus:border-red-600 rounded-t-md px-3 py-2.5 text-white w-full transition-colors text-sm outline-none placeholder-zinc-500"
              value={formData.platform}
              onChange={handleChange}
            />
          </div>

          {/* Link */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400" htmlFor="episode_link">
              Link (YouTube / Netflix / Others) <span className="text-red-600">*</span>
            </label>
            <input
              id="episode_link"
              name="link"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              className="bg-[#333333] border-b-2 border-transparent focus:border-red-600 rounded-t-md px-3 py-2.5 text-white w-full transition-colors text-sm outline-none placeholder-zinc-500"
              value={formData.link}
              onChange={handleChange}
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
                  checked={!formData.watched}
                  onChange={() => setFormData((prev) => ({ ...prev, watched: false }))}
                  className="accent-red-600"
                />
                <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">Not Watched</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="status"
                  value="watched"
                  checked={formData.watched}
                  onChange={() => setFormData((prev) => ({ ...prev, watched: true }))}
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
