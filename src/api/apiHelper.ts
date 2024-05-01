// api/apiHelpers.ts
import axios, { AxiosRequestConfig } from 'axios';

axios.interceptors.response.use(
  (response: any) => {
    // If the response data is already an object, return it
    if (typeof response.data === 'object') {
      return response;
    }
    // Otherwise, parse the response data as JSON
    response.data = JSON.parse(response.data);
    return response;
  },
  (error: any) => {
    // Handle response errors here
    console.log('axios interceptor error ', error)
    if (error.response && error.response.data) {
      // Transform error response data to JSON if it's a string
      if (typeof error.response.data === 'string') {
        error.response.data = JSON.parse(error.response.data);
      }
    }
    return Promise.reject(error);
  }
);



const fetchData = async (
  method: string,
  url: string,
  params: Record<string, any> = {},
  payload: Record<string, any> = {},
  headers: Record<string, any> = {}
) => {
  const config: AxiosRequestConfig = {
    method,
    url,
    params,
    data: payload,
    headers,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchData;
