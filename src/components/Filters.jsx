export default function Filters({ onFilter }) {
  return (
    <div>
      <select onChange={(e) => onFilter('status', e.target.value)}>
        <option value="">Tous les status</option>
        <option value="alive">Vivant</option>
        <option value="dead">Mort</option>
      </select>
    </div>
  )
}