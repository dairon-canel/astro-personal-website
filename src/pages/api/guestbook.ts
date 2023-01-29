import type { APIRoute } from 'astro';
import type { Comment, Guestbook } from '@prisma/client';
import { prisma } from '../../lib/prisma';

export const get: APIRoute = async ({}) => {
  try {
    const comments = await prisma?.guestbook.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return new Response(JSON.stringify(comments), {
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

export const post: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { comment, author } = body;
  let commentInDb: Guestbook | undefined;

  try {
    commentInDb = await prisma?.guestbook.create({
      data: {
        author: author ?? '',
        text: comment ?? '',
      },
    });
  } catch (err) {
    console.error('Error saving comment', err);
  }
  if (!commentInDb) {
    return new Response(null, { status: 400 });
  }

  return new Response(null, { status: 200 });
};
