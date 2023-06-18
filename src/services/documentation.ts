import Axios, { AxiosResponse } from 'axios';

export const getTableOfContents = async () => {
  console.log(1);
  return Axios.get('http://localhost:3000/contents').then((response: AxiosResponse<ITableOfContents>) => {
    return response.data;
  });
};
