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
              let errorMessage;
              const errorData = await response.json();
              if(errorData && errorData.error && errorData.error.message){
                errorMessage = errorData.error.message;
              }
              
              throw new Error(errorMessage);
            }
      
            const data = await response.json();
            
            applyData(data);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
      };
    
    return {
        sendRequest,
        error
    }
}

export default useHttp;