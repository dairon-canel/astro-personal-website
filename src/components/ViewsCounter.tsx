import useSWR from 'swr';

import fetcher from '../lib/fetcher';
import type { Views } from '../lib/types';

const ViewsCounter = ({ slug }: { slug: string }) => {
  const { data } = useSWR<Views>(`/api/views${slug}`, fetcher);
  const views = data?.total;
  return <div>{views}</div>;
};

export default ViewsCounter;
