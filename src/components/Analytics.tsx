import useSWR from 'swr';

import fetcher from '../lib/fetcher';
import type { Views } from '../lib/types';

export default function Analytics() {
  const { data } = useSWR<Views>('/api/views', fetcher);

  const pageViews = Number(data?.total);

  return <div>{pageViews}</div>;
}
