export default function SearchBar({ onSearch }) {
  return (
    <input 
      type="text" 
      placeholder="Rechercher un personnage..." 
      onChange={(e) => onSearch(e.target.value)}
    />
  )
}