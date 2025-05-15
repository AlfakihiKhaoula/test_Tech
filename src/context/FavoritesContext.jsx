import { createContext, useState } from 'react'

export const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  const addFavorite = (id) => {
    setFavorites([...favorites, id])
  }

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(favId => favId !== id))
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}