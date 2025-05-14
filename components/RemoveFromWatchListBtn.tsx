// 'use client'
// import { useSession } from "next-auth/react";
// import { addToCart, removeFromcart } from "../lib/cart/route";
// import { useRouter } from "next/navigation";

// const RemoveFromWatchlistButton = ({ movie }: { movie: any }) => {
//   const { data: session } = useSession();
//   const router = useRouter();

//   const handleRemoveFromCart = async () => {
//     if (!session?.id) {
//     //   alert("Please log in to add to watchlist.");
//     //   router.push("/signin");
//       return;
//     }

//     try {
//       await removeFromcart(session.id, movie);
//       alert("Movie removed from  watchlist!");
//     } catch (error) {
//       console.error("Error removing from  watchlist:", error);
//     }
//   };

//   return (
//     <button
//     onClick={handleRemoveFromCart}
//     className="mt-2 px-4 py-2 bg-black text-white hover:bg-white hover:text-black border border-white rounded transition duration-300 font-medium"
//   >
//   Remove
//   </button>

//   );
// };

// export default RemoveFromWatchlistButton;

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { removeFromcart } from '../lib/cart/route';
import { Movie } from '../type/movie'; // adjust the path if needed

interface RemoveButtonProps {
  movie: Movie;
}

const RemoveFromWatchlistButton = ({ movie }: RemoveButtonProps) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const removeMutation = useMutation({
    mutationFn: () => removeFromcart(session?.id as string, movie),
    onSuccess: () => {
        alert("Movie removed from watchList")
      queryClient.invalidateQueries({ queryKey: ['watchlist', session?.id] });
    },
    onError: (error) => {
      console.error("Error removing movie from watchlist:", error);
    },
  });

  const handleClick = () => {
    removeMutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="mt-4 px-4 py-2 bg-black text-white hover:bg-white hover:text-black border border-white rounded transition duration-300 font-medium"
    >
      Remove from Watchlist
    </button>
  );
};

export default RemoveFromWatchlistButton;
