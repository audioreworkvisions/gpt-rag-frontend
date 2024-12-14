import { FC, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { searchBing } from "../services/bingSearch";

interface SearchResult {
  id: string;
  name: string;
  url: string;
  snippet: string;
}

export const Search: FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const searchResults = await searchBing(query);
      setResults(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 mb-8">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search the web..."
            className="flex-1"
          />
          <Button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <SearchIcon className="h-5 w-5" />
            )}
          </Button>
        </div>

        {error && (
          <Card className="p-4 mb-4 bg-red-500/10 text-red-500 border-red-500/20">
            {error}
          </Card>
        )}

        <div className="space-y-4">
          {results.map((result) => (
            <Card key={result.id} className="p-4 hover:shadow-md transition-shadow border-gray-700/50">
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 hover:underline text-lg font-medium"
              >
                {result.name}
              </a>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {result.snippet}
              </p>
              <p className="text-xs text-gray-500 mt-1 truncate">
                {result.url}
              </p>
            </Card>
          ))}
        </div>

        {isLoading && !error && results.length === 0 && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};
