import { useState, useRef, useEffect } from "react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;
export default function useFetch(param) {
  const isMounted = useRef(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    isMounted.current = true;
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl + param);

        if (response.ok) {
          const data = await response.json();
          if (isMounted.current) setData(data);
        } else {
          throw response;
        }
      } catch (error) {
        if (isMounted.current) setError(error);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    };
    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, [param]);
  return { data, error, loading };
}
