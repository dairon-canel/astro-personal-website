//import useSWR from 'swr';

//import fetcher from '../lib/fetcher';
//import type { Views } from '../lib/types';

const ViewsCounter = ({ slug }: { slug: string }) => {
  ///const { data } = useSWR<Views>(`/api/views${slug}`, fetcher);

  let views = 'default value';
  fetch(`/api/views${slug}`)
    .then(data => {
      data?.json();
      console.log(views);
    })
    .catch(error => {
      views = 'value error';
    });
  return <div>{views}</div>;
};

export default ViewsCounter;
