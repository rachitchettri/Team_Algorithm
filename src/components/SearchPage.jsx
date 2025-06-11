import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { SearchFilter } from "./SearchFilter"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("")
  const [results, setResults] = useState(null)

  const items = [
    { label: "Apple", category: "next.js" },
    { label: "Banana", category: "nuxt.js" },
    { label: "Cherry", category: "astro" },
    { label: "Date", category: "remix" },
    { label: "Elderberry", category: "sveltekit" },
  ]

  function onSearch() {
    const filtered = items.filter(
      (item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter ? item.category === filter : true)
    )
    setResults(filtered)
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 border rounded-lg bg-white shadow-sm">
      {/* Search bar container */}
      <div className="flex space-x-2">
        {/* Dropdown Filter */}
        <div className="w-40 flex-shrink-0">
          <SearchFilter value={filter} setValue={setFilter} />
        </div>

        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search fruits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />

        {/* Search Button */}
        <Button onClick={onSearch} className="flex-shrink-0" variant="default">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

      {/* Results - only show after search */}
      {results && (
        <ul className="mt-6 space-y-2">
          {results.length > 0 ? (
            results.map((item, index) => (
              <li
                key={index}
                className="p-3 bg-gray-100 rounded-md text-sm flex justify-between"
              >
                <span>{item.label}</span>
                <span className="text-gray-500">({item.category})</span>
              </li>
            ))
          ) : (
            <li className="text-muted-foreground">No results found.</li>
          )}
        </ul>
      )}
    </div>
  )
}
