import { useState } from "react";

const useHttp = () => {
    const [error, setError] = useState(null);

    const sendRequest = async (requestConfig, applyData) => {
        setError(null);
        try {
            const response = await fetch(
              requestConfig.url, {
                  method: requestConfig.method ? requestConfig.method : 'GET',
                  headers: requestConfig.headers ? requestConfig.headers : {},
                  body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
              }
            );
      
            if (!response.ok) {
              throw new Error('Request failed!');
            }
      
            const data = await response.json();
      
            applyData(data);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
      };
    
    return {
        sendRequest
    }
}

export default useHttp;