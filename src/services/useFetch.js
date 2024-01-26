import { useState, useEffect } from "react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;
export default function useFetch(param) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl + param);

        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          throw response;
        }
      } catch (error) {
        setError(error);
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [param]);
  return { data, error, loading };
}
