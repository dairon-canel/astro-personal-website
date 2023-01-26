import type { APIRoute } from 'astro';
import type { Comment } from '@prisma/client';
import { prisma } from '../../lib/prisma';

export const get: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const blogUrl = params.get('blogUrl');
  if (!blogUrl) {
    return new Response('No blog url provided', {
      status: 400,
    });
  }
  const comments = await prisma?.post.findFirst({
    where: { url: (blogUrl as string | undefined) ?? undefined },
    include: { Comment: true },
    orderBy: { createdAt: 'asc' },
  });
  const allCommentsInDbForPost = comments?.Comment;
  return new Response(JSON.stringify(allCommentsInDbForPost), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const post: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { comment, author, blogUrl } = body;
  let commentInDb: Comment | undefined;
  const blog = await prisma?.post.findFirst({
    where: { url: blogUrl },
  });
  try {
    commentInDb = await prisma?.comment.create({
      data: {
        author: author ?? '',
        text: comment ?? '',
        post: {
          connectOrCreate: {
            create: {
              url: blogUrl ?? '',
            },
            where: {
              id: blog?.id ?? 0,
            },
          },
        },
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
