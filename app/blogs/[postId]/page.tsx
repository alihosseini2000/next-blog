import User from '@/components/User';
import CommentSection from '@/components/CommentSection';
import { IBlog, IComment } from '@/utils/interface';
import React, { Suspense } from 'react';

interface IParamsId {
  params: Promise<{ postId: number }>;
}

async function SingleBlog({ params }: IParamsId) {
  try {
    const { postId } = await params;

    // Fetch data in parallel
    const [postResponse, commentsResponse] = await Promise.all([
      fetch(`http://localhost:8000/posts/${postId}`),
      fetch(`http://localhost:8000/comments?id=${postId}`),
    ]);

    if (!postResponse.ok) throw new Error('Failed to fetch the blog post');
    if (!commentsResponse.ok) throw new Error('Failed to fetch the comments');

    const data: IBlog = await postResponse.json();
    const initialComments: IComment[] = await commentsResponse.json();

    return (
      <article className="max-w-4xl w-full mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col gap-5">
        {/* Category Badge */}
        <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full w-fit">
          {data.category}
        </span>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">{data.title}</h2>

        {/* Metadata */}
        <div className="text-xs md:text-sm text-gray-500 flex flex-wrap gap-3 items-center">
          <p className="italic">{data.slug}</p>
        </div>

        {/* Content */}
        <p className="text-gray-700 leading-relaxed text-sm md:text-base">{data.content}</p>

        {/* Published & Updated Time */}
        <div className="flex justify-between text-xs md:text-sm text-gray-500 border-t pt-3">
          <p>📅 <span className="font-medium">Published:</span> {data.publishedAt}</p>
          {data.updatedAt && (
            <p className="text-blue-600">✍️ <span className="font-medium">Updated:</span> {data.updatedAt}</p>
          )}
        </div>

        {/* User Component */}
        <Suspense fallback={<p>Loading user...</p>}>
          <User userId={data.userId} />
        </Suspense>

        {/* Comments Section */}
        <CommentSection postId={postId} initialComments={initialComments} />
      </article>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="flex flex-col items-center text-red-500 mt-10 px-4">
        <p className="text-lg font-semibold">🚨 Error loading blog post.</p>
        <p className="text-sm text-center">Please try again later.</p>
      </div>
    );
  }
}

export default SingleBlog;
