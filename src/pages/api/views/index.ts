import { prisma } from '../../../lib/prisma';
import type { APIRoute } from 'astro';

/* export const get: APIRoute = async () => {
  console.log('API GET');

  try {
    const totalViews = await prisma?.views.aggregate({
      _sum: {
        count: true,
      },
    });

    return new Response(
      JSON.stringify({ total: totalViews?._sum?.count?.toString() }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (e) {
    return new Response(JSON.stringify({ message: e }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}; */
