"use client"

import type React from "react"
import { useState } from "react"
import "../../styles/SearchBar.css"

interface SearchBarProps {
  onSearch: (searchTerm: string, filters: Record<string, any>) => void
  placeholder?: string
  filters?: Array<{
    key: string
    label: string
    type: "select" | "date" | "text"
    options?: Array<{ value: string; label: string }>
  }>
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "חיפוש...", filters = [] }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterValues, setFilterValues] = useState<Record<string, any>>({})
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSearch = () => {
    onSearch(searchTerm, filterValues)
  }

  const handleClear = () => {
    setSearchTerm("")
    setFilterValues({})
    onSearch("", {})
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilterValues((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />

        <div className="search-filters">
          <button type="button" className="search-button" onClick={handleSearch}>
            חיפוש
          </button>
          <button type="button" className="clear-button" onClick={handleClear}>
            נקה
          </button>
          {filters.length > 0 && (
            <button type="button" className="advanced-search-toggle" onClick={() => setShowAdvanced(!showAdvanced)}>
              {showAdvanced ? "חיפוש פשוט" : "חיפוש מתקדם"}
            </button>
          )}
        </div>
      </div>

      {showAdvanced && filters.length > 0 && (
        <div className="advanced-filters">
          <div className="filter-row">
            {filters.map((filter) => (
              <div key={filter.key} className="filter-group">
                <label className="filter-label">{filter.label}</label>
                {filter.type === "select" && (
                  <select
                    className="filter-select"
                    value={filterValues[filter.key] || ""}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  >
                    <option value="">הכל</option>
                    {filter.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
                {filter.type === "date" && (
                  <div className="date-range-inputs">
                    <input
                      type="date"
                      className="date-input"
                      value={filterValues[`${filter.key}_from`] || ""}
                      onChange={(e) => handleFilterChange(`${filter.key}_from`, e.target.value)}
                    />
                    <span>עד</span>
                    <input
                      type="date"
                      className="date-input"
                      value={filterValues[`${filter.key}_to`] || ""}
                      onChange={(e) => handleFilterChange(`${filter.key}_to`, e.target.value)}
                    />
                  </div>
                )}
                {filter.type === "text" && (
                  <input
                    type="text"
                    className="form-input"
                    value={filterValues[filter.key] || ""}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    placeholder={filter.label}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
