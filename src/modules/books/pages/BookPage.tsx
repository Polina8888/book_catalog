import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { getBookById } from "../api/GoogleBooksApi";
import type { Book } from "../types";

function BookPage() {
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    getBookById(id)
      .then(data => {
        setBook(data);
        console.log(data)
      })
      .catch(() => setError("Failed to load book"))
      .finally(() => setLoading(false));
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p>An error occurred</p>

  return <h1>{book?.volumeInfo.title}</h1>
}

export default BookPage;
