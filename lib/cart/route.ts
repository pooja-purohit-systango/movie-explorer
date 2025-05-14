export const fetchWatchlist = async (userId: string) => {
  const res = await fetch(`https://67f8e890094de2fe6e9fb1d5.mockapi.io/popular_movies/users/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  const user = await res.json();
  return user.cart || [];
};

export const addToCart = async (userId: string, movie: any) => {
  try {
    const currentCart = await fetchWatchlist(userId);
    const updatedCart = [...currentCart, movie];

    const updateRes = await fetch(`https://67f8e890094de2fe6e9fb1d5.mockapi.io/popular_movies/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: updatedCart }),
    });

    if (!updateRes.ok) throw new Error("Failed to update cart");
    return await updateRes.json();
  } catch (error) {
    console.error("Add to cart error:", error);
    throw error;
  }
};

export const removeFromcart = async (userId: string, movie: any) => {
  try {
    const currentCart = await fetchWatchlist(userId);
    const updatedCart = currentCart.filter((item: any) => item.id !== movie.id);

    const updateRes = await fetch(`https://67f8e890094de2fe6e9fb1d5.mockapi.io/popular_movies/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: updatedCart }),
    });

    if (!updateRes.ok) throw new Error("Failed to update cart");
    return await updateRes.json();
  } catch (error) {
    console.error("Remove from cart error:", error);
    throw error;
  }
};
