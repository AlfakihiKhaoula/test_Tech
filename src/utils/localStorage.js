export const getFavorites = () => {
  const data = localStorage.getItem("favorites");
  return data ? JSON.parse(data) : [];
};

export const toggleFavorites = (id) => {
  let favorites = getFavorites();
  if (favorites.includes(id)) {
    favorites = favorites.filter((favID) => favID !== id);
  } else {
    favorites.push(id);
  }
  saveFavorites(favorites);
  return favorites;
};

export const saveFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};
