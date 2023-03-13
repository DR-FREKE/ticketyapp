import axios, { AxiosResponse } from 'axios';
import { DataType } from '../types/types';

const BASE_URL: string = '/api/v1/usr/auth/signup';

export interface DataResponse {
  [x: string]: any;
}

export const postRequest = async (data: DataType): Promise<void> => {
  const response = await axios.post<DataResponse>(BASE_URL, data);
  if (response.status == 200 || response.status == 201) {
    console.log(response.data);
  } else {
    throw new Error(response.data.toString());
  }
};

export const getRequest = async (url: string): Promise<DataResponse> => {
  const response = await axios.get<DataResponse>(url);
  if (response.status == 200) {
    return response.data;
  } else {
    throw new Error(response.data.toString());
  }
};
