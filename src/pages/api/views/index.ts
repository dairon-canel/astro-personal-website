import { prisma } from '../../../lib/prisma';
import type { APIRoute } from 'astro';

export const get: APIRoute = async ({ request }) => {
  try {
    const totalViews = await prisma?.post.aggregate({
      _sum: {
        views: true,
      },
    });

    return new Response(
      JSON.stringify({ total: totalViews?._sum?.views?.toString() }),
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
};
