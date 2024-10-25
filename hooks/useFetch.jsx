import { useState, useEffect } from "react";

export const useFetch = (url, page) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}?page=${page}`);
        const result = await response.json();
        setData((prevData) => [...(prevData || []), ...result.results]);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, page]);

  return { data, loading, error };
};
