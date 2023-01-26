import { prisma } from '../../../lib/prisma';
import type { APIRoute } from 'astro';

export const get: APIRoute = async ({ request }) => {
  if (request.method === 'GET') {
    const entries = await prisma?.guestbook.findMany({
      orderBy: {
        updated_at: 'desc',
      },
    });

    return res.json(
      entries?.map(entry => ({
        id: entry.id.toString(),
        body: entry.body,
        created_by: entry.created_by,
        updated_at: entry.updated_at,
      })),
    );
  }

  const session = await getSession({ req });
  const { email, name } = session.user;

  if (!session) {
    return res.status(403).send('Unauthorized');
  }

  if (request.method === 'POST') {
    const newEntry = await prisma.guestbook.create({
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
