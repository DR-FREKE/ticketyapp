import {} from 'react';
import { Button } from './button.style';

interface ButtonProps {
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  classname?: string;
  icon?: JSX.Element;
  name: string;
}

export const AppButton = ({ onPress, loading, classname, ...props }: ButtonProps): JSX.Element => (
  <Button onClick={onPress} className={`${classname} bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded`} disabled={props.disabled}>
    <div className="flex justify-center items-center">
      <span>{props.icon}</span>
      <span>{loading !== true ? props.name : 'loading...'}</span>
    </div>
  </Button>
);
