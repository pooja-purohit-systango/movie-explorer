'use client'
import { useSession } from "next-auth/react";
import { addToCart } from "../lib/cart/route";
import { useRouter } from "next/navigation";

const AddToCartButton = ({ movie }: { movie: any }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!session?.id) {
      alert("Please log in to add to watchlist.");
      router.push("/signin");
      return;
    }

    try {
      await addToCart(session.id, movie);
      alert("Movie added to watchlist!");
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  return (
    <button
    onClick={handleAddToCart}
    className="mt-2 px-4 py-2 bg-black text-white hover:bg-white hover:text-black border border-white rounded transition duration-300 font-medium"
  >
    Add to watchlist
  </button>
  
  );
};

export default AddToCartButton;
