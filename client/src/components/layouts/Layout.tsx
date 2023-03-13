import { ReactNode } from 'react';
import img from '../../../assets/images/backdrop.jpeg';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children, ...props }: LayoutProps): JSX.Element => {
  return (
    <div>
      <main className="w-full bg-gray-100 flex justify-center items-center h-screen">{children}</main>
    </div>
  );
};

export default Layout;
