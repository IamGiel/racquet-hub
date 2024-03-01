// api/apiHelpers.ts
import axios, { AxiosRequestConfig } from 'axios';

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
