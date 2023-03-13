import axios from 'axios';
import { useState } from 'react';
import { DataType } from '../types/types';
import { useError } from './error-hook';

export enum MethodType {
  Get = 'get',
  Post = 'post',
}

interface RequestType {
  url: string;
  method: MethodType;
  onSuccess?: Function;
}

export interface SignUpErrorState {
  message: string;
  field: string;
}

type ReturnType = {
  errors: SignUpErrorState[];
  makeRequest: (data: DataType) => Promise<void>;
  loading: boolean;
};

export const useRequest = ({ url, method, onSuccess }: RequestType): ReturnType => {
  const [errors, setErrors] = useState<SignUpErrorState[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const {error, addError} = useError()

  const makeRequest = async (body: DataType): Promise<void> => {
    setLoading(true);

    try {
      setErrors([]);
      const response = await axios[method](url, body);
      setLoading(false);
      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (err: any) {
      setLoading(false);
      setErrors(err.response.data.errors);
    }
  };

  return { makeRequest, errors, loading };
};
