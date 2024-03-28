import { useEffect, useState } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null)

    const [isLoading, setIsLoading] = useState(true);
  
    const [error, setError] = useState(null);

    useEffect(() => {

        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
        .then(res => {
          if(res.ok)
          {
            console.log(res);
          }
          else if(res.status === 404)
          {
            throw Error(`Status: ${res.status} - ${res.statusText} ${res.url}`)
          }
          else if(!res.ok)
          {
            throw Error('Could not connect to server (Status 400 http://localhost:8000/blogs)')
          }
          return res.json();
        })
        .then(data => {
          setData(data);
          setIsLoading(false);
          setError(null);
        })
        .catch(err => {
          if(err.name === 'AbortError')
          {
            console.log('fetch aborted');
          }
          else
          {
            setIsLoading(false);
            setError(err.message);
          }
        })
    
        return () => abortCont.abort();
    }, [url])
    
    return {data, isLoading, error}
};

export default useFetch;