import { DataResponse, getRequest } from '@/service/service.api';
import axios from 'axios';

const Home = ({ res }: { res: DataResponse }) => {
  return <h1>WELCOME TO TICKETY {JSON.stringify(res)}</h1>;
};

Home.getInitialProps = async (): Promise<void> => {
  //   const res = await getRequest('/api/v1/usr/users/current-user');
  // const res = axios.get()
  //   console.log(res);
  //   return { res };
};

export default Home;
