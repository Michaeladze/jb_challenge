import Axios, { AxiosResponse } from 'axios';

export const getTableOfContents = async () => {
  return Axios.get('http://localhost:3000/contents').then((response: AxiosResponse<IContents>) => {
    return response.data;
  });
};
