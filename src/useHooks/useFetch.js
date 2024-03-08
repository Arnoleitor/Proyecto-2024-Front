import { useState, useEffect } from "react";

export const useFetch = (url, method = 'GET', body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setController(abortController);

    const requestOptions = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      signal: abortController.signal
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => setData(json))
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Cancelled request");
        } else {
          setError(error.message);
        }
      })
      .finally(() => setLoading(false));

    return () => abortController.abort();
  }, [url, method, body]);

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError("Cancelled Request");
    }
  };

  return { data, loading, error, handleCancelRequest };
}