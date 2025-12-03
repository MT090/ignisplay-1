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

export const getTopMovies = async (): Promise<Movie[]> => {
  // Mock fetch for top 10 movies
  // In a real app, this would fetch from TMDB API
  return [
    {
      id: "top-1",
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
      id: "top-2",
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
      id: "top-3",
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
      id: "top-4",
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
      id: "top-5",
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
      id: "top-6",
      title: "The Matrix",
      posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/w1280/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
      description: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
      year: "1999",
      rating: "8.7",
      duration: "2h 16min",
      type: "movie",
    },
    {
      id: "top-7",
      title: "Blade Runner 2049",
      posterUrl: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/w1280/ilRyazdMJwN05exqhwK4tMKBYZs.jpg",
      description: "Thirty years after the events of the first film, a new blade runner unearths a long-buried secret that has the potential to plunge what's left of society into chaos.",
      year: "2017",
      rating: "8.0",
      duration: "2h 44min",
      type: "movie",
    },
    {
      id: "top-8",
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
      id: "top-9",
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
      id: "top-10",
      title: "Killers of the Flower Moon",
      posterUrl: "https://image.tmdb.org/t/p/w500/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/w1280/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg",
      description: "Members of the Osage tribe in the United States are murdered under mysterious circumstances in the 1920s.",
      year: "2023",
      rating: "7.7",
      duration: "3h 26min",
      type: "movie",
    },
  ];
};