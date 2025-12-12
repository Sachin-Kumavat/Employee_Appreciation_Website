// src/services/apiRequest.ts
import axios, { AxiosRequestConfig, Method, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://172.16.1.49:5000/api';
// const BASE_URL = 'https://restaurantweb-q5fl.onrender.com/api';

interface ApiRequestProps<T = any> {
  method?: Method;
  url: string;
  data?: T;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

const apiRequest = async <T = any>({
  method = 'GET',
  url,
  data = {},
  params = {},
  headers = {},
}: ApiRequestProps<T>): Promise<AxiosResponse<T>> => {
  const token = Cookies.get('token');

  const config: AxiosRequestConfig = {
    method,
    url: `${BASE_URL}${url}`,
    data,
    params,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error: any) {
    console.error('API Error', error);
    throw error;
  }
};

export default apiRequest;
