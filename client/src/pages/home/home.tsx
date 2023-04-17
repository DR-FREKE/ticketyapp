import { DataResponse, getRequest } from '@/service/service.api';
import axios from 'axios';
import { NextPage } from 'next';

interface HomeProp {
  color: string;
}

const Home: NextPage<HomeProp> = () => {
  return <h1>WELCOME TO TICKETY</h1>;
};

Home.getInitialProps = async ({ req }) => {
  // console.log(req?.headers.cookie);
  const res = await getRequest('/api/v1/usr/users/current-user');
  return res.data;
};

export default Home;
