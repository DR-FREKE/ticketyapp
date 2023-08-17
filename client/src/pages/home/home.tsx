import { DataResponse, getRequest } from '@/service/service.api';
import axios from 'axios';
import { NextPage } from 'next';

interface HomeProp {
  // color: string;
}

const Home: NextPage<HomeProp> = () => {
  return <h1>WELCOME TO TICKETY</h1>;
};

Home.getInitialProps = async ({ req }) => {
  // if you did not want to memorize this long url, you can create an external name service that has a shorter path but will automatically map to this long url
  // const res = await getRequest('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/v1/usr/users/all-users');
  // return { color: 'red' };
  console.log('I WAS EXECUTED!');
  return {};
};

export default Home;
