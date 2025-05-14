"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import RemoveFromWatchlistButton from "@/components/RemoveFromWatchListBtn";
import { fetchWatchlist } from "@/lib/cart/route";
import { Movie } from "@/type/movie";

const CartPage = () => {
  const { data: session, status } = useSession();
  const userId = session?.id;

  const { data: cart = [], isLoading } = useQuery<Movie[]>({
    queryKey: ["watchlist", userId],
    //     If you only used ['watchlist'], then:
    // All users would share the same cache key.
    // If one user logs in and views their watchlist, and then another logs in, React Query might show the previous user's data.

    
    queryFn: () => {
      if (!userId) return Promise.resolve([]);
      //if (!userId) return Promise.resolve([]);
      // This checks if userId is undefined, null, or falsy.
      // If there's no user logged in, the function returns a resolved promise with an empty array:
      // ➤ Promise.resolve([]) acts like an immediate response saying "no data".

      return fetchWatchlist(userId);
    },
  });

  if (status === "loading" || isLoading)
    return <p className="text-center text-white mt-10">Loading your cart...</p>;

  if (!session)
    return (
      <p className="text-center text-white mt-10">
        Please log in to view your watchlist.
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">
          {" "}
          Your WatchList
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-400">Your WatchList is Empty.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((movie, index) => (
              <li
                key={index}
                className="bg-gray-900 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold">{movie.name}</h2>
                <p className="text-sm text-gray-400">
                  Release Date:{" "}
                  {new Date(movie.releaseDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-400">
                  Main Character: {movie.mainCharacter}
                </p>

                <RemoveFromWatchlistButton movie={movie} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CartPage;
