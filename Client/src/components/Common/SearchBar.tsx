"use client"
import type React from "react"
import { useState } from "react"
import "../../styles/SearchBar.css"
interface SearchBarProps {
  onSearch: (searchTerm: string, filters: Record<string, any>) => void
  placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "חיפוש..." }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterValues, setFilterValues] = useState<Record<string, any>>({})
  const handleSearch = () => { onSearch(searchTerm, filterValues) }
  const handleSearchWrap = (search: string) => {
    setSearchTerm(search)
    handleSearch()
  }
  const handleClear = () => {
    setSearchTerm("")
    setFilterValues({})
    onSearch("", {})
  }
  return (<div className="search-container">
    <div className="search-bar">
      <input type="text" className="search-input" placeholder={placeholder} value={searchTerm} onChange={(e) => { handleSearchWrap(e.target.value) }} onKeyPress={(e) => e.key === "Enter" && handleSearch} />
      <div className="search-filters">
        <button type="button" className="search-button" onClick={handleSearch}>
          חיפוש
        </button>
        <button type="button" className="clear-button" onClick={handleClear}>
          נקה
        </button>
      </div>
    </div>
  </div>)
}
export default SearchBar