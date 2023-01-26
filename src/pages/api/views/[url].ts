import { prisma } from '../../../lib/prisma';
import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ params, request }) => {
  try {
    const url = params.url || '';

    if (request.method === 'POST') {
      const newOrUpdatedViews = await prisma?.post.upsert({
        where: { url },
        create: {
          url,
        },
        update: {
          views: {
            increment: 1,
          },
        },
      });

      return new Response(
        JSON.stringify({
          total: newOrUpdatedViews?.views.toString(),
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    if (request.method === 'GET') {
      const post = await prisma?.post.findUnique({
        where: {
          url,
        },
      });

      return new Response(JSON.stringify({ total: post?.views.toString() }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (e) {
    return new Response(JSON.stringify({ message: e }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
