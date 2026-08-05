export interface TypeEps {
  id: number;
  seriesId: number;
  season: number;
  episodeNumber: number;
  title: string;
  platform: string;
  link: string;
  watched: boolean;
}

export const DataEps: TypeEps[] = [
  // Spider-Man: Brand New Day (seriesId: 1)
  {
    id: 101,
    seriesId: 1,
    season: 1,
    episodeNumber: 1,
    title: "Full Movie - Main Feature",
    platform: "Cinema / Netflix",
    link: "https://netflix.com/watch/spiderman",
    watched: false,
  },
  {
    id: 102,
    seriesId: 1,
    season: 1,
    episodeNumber: 2,
    title: "Bonus Features & Deleted Scenes",
    platform: "YouTube",
    link: "https://youtube.com/watch?v=spiderman-extras",
    watched: false,
  },

  // Demon Slayer: Kimetsu no Yaiba (seriesId: 2)
  {
    id: 201,
    seriesId: 2,
    season: 1,
    episodeNumber: 1,
    title: "Cruelty",
    platform: "YouTube",
    link: "https://youtube.com/watch?v=1",
    watched: true,
  },
  {
    id: 202,
    seriesId: 2,
    season: 1,
    episodeNumber: 2,
    title: "Trainer Sakonji Urokodaki",
    platform: "YouTube",
    link: "https://youtube.com/watch?v=2",
    watched: false,
  },

  // Formula (seriesId: 3)
  {
    id: 301,
    seriesId: 3,
    season: 1,
    episodeNumber: 1,
    title: "Drive to survive",
    platform: "Crunchyroll",
    link: "https://crunchyroll.com/watch/naruto-1",
    watched: true,
  },
  {
    id: 302,
    seriesId: 3,
    season: 1,
    episodeNumber: 2,
    title: "Drive to survive",
    platform: "Crunchyroll",
    link: "https://crunchyroll.com/watch/naruto-2",
    watched: true,
  },
];
