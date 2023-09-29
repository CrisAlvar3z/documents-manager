/* eslint-disable quote-props */
import axios from 'axios';
// import { AccessorKeys } from './storage.helper';

const HttpClient = axios.create();

HttpClient.interceptors.request.use(
  (config) => {
    const extendedHeaders = ProvidersHelper.getRequestHeaders();
    // const extendedHeaders = config.url?.includes(API_LOCAL_URL) ?
    //   ProvidersHelper.getRequestHeaders() :
    //   ProvidersHelper.getDefaultRequestHeaders();
    config.headers = {
      ...extendedHeaders as any,
      ...config.headers,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

HttpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.resolve({
      error: {
        value: true,
        reason: error,
        message: 'Rejected Request',
        timestamp: Date.now(),
      },
      value: undefined,
    });
  },
);

export default HttpClient;

export class ProvidersHelper {
  private static _baseHeaders = {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  };

  public static getRequestHeaders() {
    return {
      ...ProvidersHelper._baseHeaders,
      Authorization: `${'Bearer '+sessionStorage.getItem('session_token')}`,
      Lang: 'en-US',
    //   Environment: process.env.NODE_ENV,
    };
  };

  public static getDefaultRequestHeaders(): (typeof ProvidersHelper._baseHeaders) {
    return ProvidersHelper._baseHeaders;
  };
}