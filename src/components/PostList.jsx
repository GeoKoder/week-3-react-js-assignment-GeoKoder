import { useEffect, useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
        );
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts((prev) => [...prev, ...data]); // for infinite scroll
        setFiltered((prev) => [...prev, ...data]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const handleSearch = (value) => {
    setSearch(value);
    const result = posts.filter((post) =>
      post.title.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(result);
  };

  return (
    <Card title="Posts" className="space-y-4">
      <input
        type="text"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search posts..."
        className="w-full border p-2 rounded"
      />

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-white dark:bg-gray-800 rounded shadow"
          >
            <h3 className="font-bold text-lg">{post.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {post.body}
            </p>
          </div>
        ))}
      </div>

      {!loading && !search && (
        <div className="text-center">
          <Button onClick={() => setPage(page + 1)}>Load More</Button>
        </div>
      )}
    </Card>
  );
}
