import type { Comment } from '@prisma/client';
import type { Guestbook as GuestbookComment } from '@prisma/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Comments from './Comments';
import Guestbook from './Guestbook';

const queryClient = new QueryClient();

const CommentsWrapper = ({
  blogUrl,
  initialComments,
  guestbook = false,
}: {
  blogUrl?: string;
  initialComments?: Comment[] | GuestbookComment[];
  guestbook?: boolean;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {guestbook ? (
        <Guestbook initialComments={initialComments as GuestbookComment[]} />
      ) : (
        <Comments
          blogUrl={blogUrl}
          initialComments={initialComments as Comment[]}
        />
      )}
    </QueryClientProvider>
  );
};
export default CommentsWrapper;
