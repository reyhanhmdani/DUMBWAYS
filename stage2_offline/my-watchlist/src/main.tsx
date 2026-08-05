import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import Layout from "./components/Layout.tsx";
import App from "./App.tsx";
import DetailSeries from "./pages/DetailSeries.tsx";
import AddSeries from "./pages/CreateSeries.tsx";
import EditSeries from "./pages/EditSeries.tsx";
import CreateEpisode from "./pages/CreateEpisode.tsx";
import EditEpisode from "./pages/EditEpisode.tsx";
// import EditEpisode from "./pages/EditEpisode.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: App,
      },
      {
        path: "/series/:id",
        Component: DetailSeries,
      },
      {
        path: "/createSeries",
        Component: AddSeries,
      },
      {
        path: "/editSeries/:id",
        Component: EditSeries,
      },
      {
        path: "/series/:seriesId/createEpisode",
        Component: CreateEpisode,
      },
      {
        path: "/series/:seriesId/editEpisode/:episodeId",
        Component: EditEpisode,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
