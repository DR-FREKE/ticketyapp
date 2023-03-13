import { useState } from 'react';
import { SignUpErrorState } from './request-hook';

type ErrorType = {
  errors: SignUpErrorState[];
  addError: Function;
};

export const useError = (): ErrorType => {
  const [errors, setError] = useState<SignUpErrorState[]>([]);

  const addError = (error: SignUpErrorState[]): void => {
    setError(error);
  };

  return { addError, errors };
};
