import { useState } from 'react';
import { SignUpErrorState } from './request-hook';

type ErrorType = {
  error: SignUpErrorState[];
  addError: Function;
};

export const useError = (): ErrorType => {
  const [error, setError] = useState<SignUpErrorState[]>([]);

  const addError = (error_data: SignUpErrorState[]): void => {
    setError(error_data);
  };

  return { addError, error };
};
