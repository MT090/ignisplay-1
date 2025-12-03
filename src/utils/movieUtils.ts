export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl?: string;
  description?: string;
  year?: string;
  rating?: string;
  duration?: string;
  progress?: number;
  type?: "movie" | "series";
}

const TRENDING_MOVIES: Movie[] = [
  {
    id: "trending-1",
    title: "Inception",
    posterUrl: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    year: "2010",
    rating: "8.8",
    duration: "2h 28min",
    type: "movie",
  },
  {
    id: "trending-2",
    title: "The Dark Knight",
    posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    year: "2008",
    rating: "9.0",
    duration: "2h 32min",
    type: "movie",
  },
  {
    id: "trending-3",
    title: "Interstellar",
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    year: "2014",
    rating: "8.6",
    duration: "2h 49min",
    type: "movie",
  },
  {
    id: "trending-4",
    title: "Dune",
    posterUrl: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/mYQA4FpMgcaFYyingCYlFLOj1vK.jpg",
    description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset.",
    year: "2021",
    rating: "8.0",
    duration: "2h 35min",
    type: "movie",
  },
  {
    id: "trending-5",
    title: "Parasite",
    posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/TU9NIjwzjoKPwQHoyzUZjKYwKR.jpg",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    year: "2019",
    rating: "8.5",
    duration: "2h 12min",
    type: "movie",
  },
  {
    id: "trending-6",
    title: "The Matrix",
    posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
    description: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    year: "1999",
    rating: "8.7",
    duration: "2h 16min",
    type: "movie",
  },
];

const NEW_RELEASES: Movie[] = [
  {
    id: "new-1",
    title: "Oppenheimer",
    posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    year: "2023",
    rating: "8.5",
    duration: "3h 0min",
    type: "movie",
  },
  {
    id: "new-2",
    title: "Poor Things",
    posterUrl: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
    description: "The incredible tale about the fantastical evolution of Bella Baxter.",
    year: "2023",
    rating: "8.0",
    duration: "2h 21min",
    type: "movie",
  },
  {
    id: "new-3",
    title: "Killers of the Flower Moon",
    posterUrl: "https://image.tmdb.org/t/p/w500/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg",
    description: "Members of the Osage tribe in the United States are murdered under mysterious circumstances in the 1920s.",
    year: "2023",
    rating: "7.7",
    duration: "3h 26min",
    type: "movie",
  },
  {
    id: "new-4",
    title: "The Holdovers",
    posterUrl: "https://image.tmdb.org/t/p/w500/VHSzNBTwxV8vh7wylo7O9CLdac.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/VHSzNBTwxV8vh7wylo7O9CLdac.jpg",
    description: "A cranky history teacher at a boarding school remains on campus during Christmas break.",
    year: "2023",
    rating: "7.9",
    duration: "2h 13min",
    type: "movie",
  },
];

export const getTopMovies = async (): Promise<Movie[]> => {
  // Simulate fetch by returning combined trending and new releases as top 10
  return [...TRENDING_MOVIES, ...NEW_RELEASES];
};

export const getTrendingMovies = async (): Promise<Movie[]> => {
  return TRENDING_MOVIES;
};

export const getNewReleases = async (): Promise<Movie[]> => {
  return NEW_RELEASES;
};