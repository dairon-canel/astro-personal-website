import { prisma } from '../../../lib/prisma';
import type { APIRoute } from 'astro';

export const get: APIRoute = async () => {
  try {
    const entries = await prisma?.guestbook.findMany({
      orderBy: {
        updated_at: 'desc',
      },
    });

    return new Response(
      JSON.stringify(
        entries?.map(entry => ({
          id: entry.id.toString(),
          body: entry.body,
          created_by: entry.created_by,
          updated_at: entry.updated_at,
        })),
      ),
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

export const post: APIRoute = async ({ request }) => {
  if (request.method === 'POST') {
    const newEntry = await prisma?.guestbook.create({
      data: {
        email,
        body: (request.body.body || '').slice(0, 500),
        created_by: name,
      },
    });

    return res.status(200).json({
      id: newEntry.id.toString(),
      body: newEntry.body,
      created_by: newEntry.created_by,
      updated_at: newEntry.updated_at,
    });
  }

  return res.send('Method not allowed.');
};
