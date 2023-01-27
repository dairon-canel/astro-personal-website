import { prisma } from '../../../lib/prisma';
import type { APIRoute } from 'astro';

export const get: APIRoute = async ({ params }) => {
  try {
    const id = params.id;

    const entry = await prisma?.guestbook.findUnique({
      where: {
        id: Number(id),
      },
    });
    return new Response(
      JSON.stringify({
        id: entry?.id.toString(),
        body: entry?.body,
        created_by: entry?.created_by,
        updated_at: entry?.updated_at,
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
};

export const del: APIRoute = async ({ params }) => {
  try {
    const id = params.id;

    await prisma?.guestbook.delete({
      where: {
        id: Number(id),
      },
    });
    return new Response(null, {
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
};

export const post: APIRoute = async ({ params, request }) => {
  try {
    const id = params.id;
    const { body } = await request.json();

    const entry = await prisma?.guestbook.update({
      where: {
        id: Number(id),
      },
      data: {
        body,
        updated_at: new Date().toISOString(),
      },
    });

    return new Response(JSON.stringify(entry), {
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
};
