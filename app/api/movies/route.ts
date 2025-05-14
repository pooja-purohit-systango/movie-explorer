// import { Movie } from "@/type/movie";

// export const fetchMovies = async ():  Promise<Movie[] | null>  => {
//     try {
//         const response = await fetch('https://67f8e890094de2fe6e9fb1d5.mockapi.io/popular_movies/movies')
//         if (!response.ok) {
//           throw new Error('Failed to fetch movies')
//         }
//         return response.json()
//     }
//     catch(error) 
//     {
//         console.log("Error occured : ", error);
//         return null;
//     }
//   }
  

import { Movie } from '@/type/movie'

export const fetchMovies = async (): Promise<Movie[]> => {
  const response = await fetch('https://67f8e890094de2fe6e9fb1d5.mockapi.io/popular_movies/movies')
  if (!response.ok) {
    throw new Error('Failed to fetch movies')
  }
  return response.json()
}
