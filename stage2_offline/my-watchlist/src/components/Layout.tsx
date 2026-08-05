import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Navbar } from "./navbar";
import { DataSeries } from "../data/watchlist";
import { DataEps } from "../data/episode";

export function Layout() {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const [series, setSeries] = useState(() => {
    const saved = localStorage.getItem("series_data");
    return saved ? JSON.parse(saved) : DataSeries;
  });

  const [episode, setEpisode] = useState(() => {
    const saved = localStorage.getItem("episode_data");
    return saved ? JSON.parse(saved) : DataEps;
  });

  useEffect(() => {
    localStorage.setItem("series_data", JSON.stringify(series));
  }, [series]);

  useEffect(() => {
    localStorage.setItem("episode_data", JSON.stringify(episode));
  }, [episode]);

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      <Navbar search={search} onSearchChange={(val) => setSearch(val)} onAddNew={() => navigate("/CreateSeries")} />

      <main className="max-w-4xl mx-auto">
        <Outlet context={{ series, setSeries, episode, setEpisode, search, setSearch }} />
      </main>
    </div>
  );
}

export default Layout;
