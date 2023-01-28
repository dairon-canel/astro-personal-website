//import useSWR from 'swr';

import { useEffect, useState } from 'react';

//import fetcher from '../lib/fetcher';
//import type { Views } from '../lib/types';

const ViewsCounter = ({ slug }: { slug: string }) => {
  ///const { data } = useSWR<Views>(`/api/views${slug}`, fetcher);

  /* fetch(`/api/views${slug}`)
    .then(response => response.json())
    .then(data => {
      views = data;
    })
    .catch(error => {
      console.log(error);
      views = 'error value';
    }); */

  /* fetch(`/api/views${slug}`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(gResponse => {
      if (gResponse.success) {
        views = gResponse;
      } else {
        views = 'error value from api';
      }
    })
    .catch(e => {
      console.log(e);
      views = 'error value not accesing api';
    }); */

  /* useEffect(() => {
    async () => {
      try {
        const response = await fetch(`/api/views${slug}`);
        views = await response.json();
      } catch (error) {
        views = 'error value from api';
      }
    };
  }, []); */

  const [views, setViews] = useState('default value');
  useEffect(() => {
    fetch(`/api/views${slug}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setViews(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return <div>{views ? <p>{views}</p> : <p>Loading...</p>}</div>;
};

export default ViewsCounter;
