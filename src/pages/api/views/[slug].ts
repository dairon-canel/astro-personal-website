import { prisma } from '../../../lib/prisma';
import type { APIRoute } from 'astro';

export const get: APIRoute = async ({ params }) => {
  const id = params.id;
  console.log('TESTING');

  return new Response(JSON.stringify(id), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

/* export const get: APIRoute = async ({ params }) => {
  console.log('API [] GET');
  try {
    const slug = params.slug || '';

    const views = await prisma?.views?.findUnique({
      where: {
        slug,
      },
    });

    return new Response(JSON.stringify({ total: views?.count?.toString() }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ message: e }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}; */

/* export const post: APIRoute = async ({ params }) => {
  console.log('API [] POST');

  try {
    const slug = params.slug || '';

    const newOrUpdatedViews = await prisma?.views.upsert({
      where: { slug },
      create: {
        slug,
      },
      update: {
        count: {
          increment: 1,
        },
      },
    });

    return new Response(
      JSON.stringify({
        total: newOrUpdatedViews?.count.toString(),
      }),
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
