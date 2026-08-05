import type React from "react";
import { Link, useNavigate, useOutletContext } from "react-router";
import type { TypeSeries } from "../data/watchlist";
import { useState } from "react";

export default function AddSeries() {
  const navigate = useNavigate();
  // ambil state global dari layout
  const { series, setSeries } = useOutletContext<{
    series: TypeSeries[];
    setSeries: React.Dispatch<React.SetStateAction<TypeSeries[]>>;
  }>();
  
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Movie");
  const [poster, setPoster] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [status, setStatus] = useState("Plan to Watch");
  const [description, setDescription] = useState("");

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPoster(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ga boleh kosong
    if (!title.trim()) return;

    const newSeries: TypeSeries = {
      id: Date.now(),
      title,
      type,
      poster: poster || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500",
      genre: genre || "Action",
      year: year || new Date().getFullYear(),
      status: status || "Plan to Watch",
      description,
    };

    setSeries([...series, newSeries]);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-[#141414] border border-zinc-800 rounded-xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl relative overflow-hidden">
        {/* Title Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Add New Title</h1>
          <p className="text-sm text-zinc-400">Expand your cinematic universe.</p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
            {/* Left Column: Poster Area */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Poster Image</label>
              <label className="relative w-full aspect-[2/3] bg-zinc-900/80 rounded-lg overflow-hidden flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 hover:border-red-600 cursor-pointer transition-colors p-2 group">
                {poster ? (
                  <img src={poster} alt="Preview" className="w-full h-full object-cover rounded" />
                ) : (
                  <div className="flex flex-col items-center text-center p-4">
                    <span className="text-4xl mb-2 text-zinc-500 group-hover:text-white transition-colors">🖼️</span>
                    <span className="text-xs font-bold text-zinc-300 group-hover:text-white">Upload Poster</span>
                    <span className="text-[10px] text-zinc-500 mt-1">JPG, PNG (Max. 2MB)</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </label>
            </div>

            {/* Right Column: Input Fields */}
            <div className="flex flex-col gap-4">
              {/* Title */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest" htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="e.g. Blade Runner 2049"
                  className="bg-zinc-900 border-b-2 border-transparent focus:border-red-600 p-3 rounded-t-md text-sm text-white outline-none transition-all"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Type & Genre */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest" htmlFor="type">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="type"
                    className="bg-zinc-900 border-b-2 border-transparent focus:border-red-600 p-3 rounded-t-md text-sm text-white outline-none transition-all cursor-pointer"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="Movie">Movie</option>
                    <option value="TV Series">TV Series</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest" htmlFor="genre">
                    Genre
                  </label>
                  <input
                    id="genre"
                    type="text"
                    placeholder="e.g. Action, Sci-Fi"
                    className="bg-zinc-900 border-b-2 border-transparent focus:border-red-600 p-3 rounded-t-md text-sm text-white outline-none transition-all"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest" htmlFor="description">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  placeholder="Short description about this show or movie..."
                  className="bg-zinc-900 border-b-2 border-transparent focus:border-red-600 p-3 rounded-t-md text-sm text-white outline-none min-h-[80px] resize-none transition-all"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Release Year & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest" htmlFor="year">
                    Release Year
                  </label>
                  <input
                    id="year"
                    type="number"
                    placeholder="YYYY"
                    min={1900}
                    max={2100}
                    className="bg-zinc-900 border-b-2 border-transparent focus:border-red-600 p-3 rounded-t-md text-sm text-white outline-none transition-all"
                    value={year || ""}
                    onChange={(e) => setYear(Number(e.target.value))}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Status</label>
                  <select
                    className="bg-zinc-900 border-b-2 border-transparent focus:border-red-600 p-3 rounded-t-md text-sm text-white outline-none transition-all cursor-pointer"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Plan to Watch">Plan to Watch</option>
                    <option value="Watching">Watching</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800 mt-2">
            <Link
              to="/"
              className="px-5 py-2 rounded border border-zinc-700 text-white text-xs font-semibold hover:bg-zinc-800 transition-all flex items-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2 rounded bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 uppercase tracking-widest"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
