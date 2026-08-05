export interface TypeSeries {
  id: number;
  title: string;
  type: string;
  poster: string;
  genre: string;
  year: number;
  status: string;
  description: string;
}

export const DataSeries: TypeSeries[] = [
  {
    id: 1,
    title: "Spider-Man: Brand New Day",
    type: "Movie",
    poster: "https://awsimages.detik.net.id/community/media/visual/2026/07/29/poster-film-spider-man-brand-new-day-1785295715301_34.jpeg?w=500&q=90",
    genre: "Action, Sci-Fi",
    year: 2026,
    status: "Plan to Watch",
    description: "Peter Parker starts a fresh chapter facing new villains and challenges in New York City.",
  },
  {
    id: 2,
    title: "Demon Slayer: Kimetsu no Yaiba",
    type: "TV Series",
    poster:
      "https://prioritas.xl.co.id/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fstatic-cms-prd%2F2026%2F07%2Furutan-nonton-demon-slayer-1024x576.png&w=1920&q=75",
    genre: "Action, Fantasy",
    year: 2019,
    status: "Watching",
    description: "Tanjiro Kamado joins the Demon Slayer Corps after his family is slaughtered.",
  },
  {
    id: 3,
    title: "Formula 1",
    type: "TV Series",
    poster: "https://i1.wp.com/movieku.website/wp-content/uploads/2026/03/1772423428-7748-xGOGjJFYYeRSoOpnhN9IHZTXIxj.jpg?resize=166,250",
    genre: "Documentary, Sport, Race",
    year: 2026,
    status: "Completed",
    description: "Documentary Formula 1 Drive",
  },
];
