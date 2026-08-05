import { Link, useNavigate, useOutletContext, useParams } from "react-router";
import React, { useState } from "react";
import type { TypeSeries } from "../data/watchlist";

export default function EditSeries() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { series, setSeries } = useOutletContext<{
    series: TypeSeries[];
    setSeries: React.Dispatch<React.SetStateAction<TypeSeries[]>>;
  }>();

  const existingSeries = series.find((s) => s.id === Number(id));

  const [title, setTitle] = useState(() => existingSeries?.title || "");
  const [type, setType] = useState(() => existingSeries?.type || "Movie");
  const [poster, setPoster] = useState(() => existingSeries?.poster || "");
  const [genre, setGenre] = useState(() => existingSeries?.genre || "");
  const [year, setYear] = useState<number>(() => existingSeries?.year || new Date().getFullYear());
  const [status, setStatus] = useState(() => existingSeries?.status || "Plan to Watch");
  const [description, setDescription] = useState(() => existingSeries?.description || "");

  // kalau ga nemu
  if (!existingSeries) {
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPoster(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitChange = (e: React.FormEvent) => {
    e.preventDefault();

    // map
    const updatedSeris = series.map((item) => {
      if (item.id === Number(id)) {
        return {
          ...item,
          title,
          type,
          poster,
          genre,
          year,
          status,
          description,
        };
      }
      return item;
    });
    setSeries(updatedSeris);

    navigate("/");
  };

  const handleDelete = () => {
    const konfirmasi = window.confirm(`Apakah anda yakin ingin menghapus nya`);

    if (konfirmasi) {
      const data = series.filter((item) => item.id !== Number(id));
      setSeries(data);

      navigate("/");
    }
  };

  //  ada error kalau pakai useEffect karna dapat peringatan dari react 19 & react compiler [React 19 melarang penggunaan useEffect hanya untuk menyalin data dari props/context ke dalam useState (Derived State)]
  // useEffect(() => {
  //   if (existingSeries) {
  //     setTitle(existingSeries.title);
  //     setType(existingSeries.type);
  //     setPoster(existingSeries.poster);
  //     setGenre(existingSeries.genre);
  //     setYear(existingSeries.year);
  //     setStatus(existingSeries.status);
  //     setDescription(existingSeries.description);
  //   }
  // }, [existingSeries]);

  return (
    <div className="min-h-screen bg-[#121414] text-[#e2e2e2] p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-[800px] bg-[#141414] rounded-xl p-6 md:p-8 flex flex-col gap-6 relative border border-white/10 shadow-2xl backdrop-blur-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-zinc-400 hover:text-white transition-colors flex items-center justify-center p-2 rounded-full hover:bg-white/5"
            >
              ← Back
            </Link>
            <h1 className="text-xl font-bold text-white tracking-tight">Edit Show / Movie</h1>
          </div>

          <button
            type="button"
            aria-label="Delete Series"
            className="flex items-center justify-center p-2 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all text-xs font-semibold gap-1.5"
            onClick={handleDelete}
          >
            🗑️ Delete
          </button>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmitChange}>
          {/* Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
            {/* Left Column: Poster Area & Actions */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Poster Image</label>
              <div className="w-full aspect-[2/3] bg-zinc-900 rounded-lg overflow-hidden relative group cursor-pointer border border-zinc-800">
                <img
                  src={existingSeries.poster}
                  alt="Poster Preview"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                  <span className="text-2xl text-white">📷</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="w-full py-2 px-3 rounded text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer text-center block">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  Change Poster
                </label>
                {/* <button
                  type="button"
                  className="w-full py-2 px-3 rounded text-xs font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors"
                >
                  Remove Poster
                </button> */}
              </div>
            </div>

            {/* Right Column: Complete Form Fields */}
            <div className="flex flex-col gap-4">
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest" htmlFor="title">
                  Title <span className="text-red-600">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-[#333333] border-b-2 border-transparent focus:border-red-600 rounded-t px-3 py-2.5 text-white w-full transition-colors text-sm outline-none"
                />
              </div>

              {/* Type & Genre */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest" htmlFor="type">
                    Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="bg-[#333333] border-b-2 border-transparent focus:border-red-600 rounded-t px-3 py-2.5 text-white w-full transition-colors text-sm outline-none cursor-pointer"
                  >
                    <option value="Movie">Movie</option>
                    <option value="TV Series">TV Series</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest" htmlFor="genre">
                    Genre
                  </label>
                  <input
                    id="genre"
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="bg-[#333333] border-b-2 border-transparent focus:border-red-600 rounded-t px-3 py-2.5 text-white w-full transition-colors text-sm outline-none"
                  />
                </div>
              </div>

              {/* Release Year & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest" htmlFor="year">
                    Release Year
                  </label>
                  <input
                    id="year"
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="bg-[#333333] border-b-2 border-transparent focus:border-red-600 rounded-t px-3 py-2.5 text-white w-full transition-colors text-sm outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="bg-[#333333] border-b-2 border-transparent focus:border-red-600 rounded-t px-3 py-2.5 text-white w-full transition-colors text-sm outline-none cursor-pointer"
                  >
                    <option value="Plan to Watch">Plan to Watch</option>
                    <option value="Watching">Watching</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest" htmlFor="description">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-[#333333] border-b-2 border-transparent focus:border-red-600 rounded-t px-3 py-2.5 text-white w-full transition-colors text-sm outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/5 mt-2">
            <Link
              to="/"
              className="py-2.5 px-6 rounded border border-zinc-700 text-zinc-300 hover:text-white hover:bg-white/5 text-xs font-semibold transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="py-2.5 px-6 rounded bg-red-600 text-white font-bold text-xs hover:bg-red-700 hover:shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all uppercase tracking-wider"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
