import type { Comment } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
const Comments = ({
  blogUrl,
  initialComments,
}: {
  blogUrl?: string;
  initialComments?: Comment[];
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<'idle' | 'loading'>('idle');
  const upToDateCommentsQuery = useQuery({
    queryKey: [`comments-${blogUrl}`],
    queryFn: async () => {
      const allCommentsInDb = await fetch(`/api/comments?blogUrl=${blogUrl}`);
      const allCommentsInDbJson = await allCommentsInDb.json();
      return allCommentsInDbJson as Comment[];
    },
    initialData: initialComments,
  });
  const onSubmit = async (e: React.FormEvent) => {
    setFormState('loading');
    e.preventDefault();
    if (e.currentTarget) {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          author: formData.get('author'),
          comment: formData.get('comment'),
          blogUrl,
        }),
      });
      formRef.current?.reset();
      upToDateCommentsQuery.refetch();
    }
    setFormState('idle');
  };
  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Add a comment</h2>
      <form onSubmit={onSubmit} ref={formRef}>
        <div className="form-control w-full max-w-xs mb-4">
          <label htmlFor="author" className="label">
            <span className="label-text">What is your name?</span>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="author"
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className="label" htmlFor="comment">
            <span className="label-text">Leave your comment</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Your comment"
            name="comment"
            required
          ></textarea>
          <label className="label"> </label>
        </div>
        <button
          disabled={formState === 'loading'}
          className="btn btn-primary mb-8"
          type="submit"
        >
          {formState === 'loading' ? 'Submitting' : 'Submit comment'}
        </button>
      </form>

      <h2 className="text-2xl font-medium mt-8 mb-4">Comments</h2>
      {upToDateCommentsQuery?.data && upToDateCommentsQuery?.data.length > 0 ? (
        <div id="comments">
          {upToDateCommentsQuery?.data?.map(comment => (
            <div key={comment.id}>
              <h3 className="text-xl font-bold mb-2">{comment.author}</h3>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4">No comments yet. Be the first to add one!</div>
      )}
    </>
  );
};

export default Comments;
