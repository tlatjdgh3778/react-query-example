import { useMutation, useQuery } from '@tanstack/react-query';

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'DELETE' }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'PATCH', data: { title: 'REACT QUERY FOREVER!!!!' } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  const { data, isLoading, isError } = useQuery(['comment', post.id], () =>
    fetchComments(post.id)
  );
  const deleteMutaion = useMutation((postId) => deletePost(postId));
  const updateMutaion = useMutation((postId) => updatePost(postId));

  if (isLoading) {
    return <div>comment loading...</div>;
  }
  if (isError) {
    return <div>Oops!! error@@</div>;
  }
  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => deleteMutaion.mutate(post.id)}>Delete</button>{' '}
      {deleteMutaion.isError && (
        <p style={{ color: 'red' }}>Error delete the post</p>
      )}
      {deleteMutaion.isLoading && (
        <p style={{ color: 'purple' }}>Deleting delete the post</p>
      )}
      {deleteMutaion.isSuccess && (
        <p style={{ color: 'green' }}>Post has (not) been deleted</p>
      )}
      <button onClick={() => updateMutaion.mutate(post.id)}>
        Update title
      </button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
