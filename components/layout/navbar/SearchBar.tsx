"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // Search implementation would be wired here later
    console.log("Searching for:", query);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xs hidden lg:block">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full bg-slate-900 border border-slate-800 text-white text-xs rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-accent focus:bg-slate-950 transition-all placeholder:text-slate-500"
      />
      <Search className="absolute left-3 top-2.5 text-slate-500" size={14} />
    </form>
  );
}
