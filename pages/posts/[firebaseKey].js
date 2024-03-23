import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createComment, getSinglePost } from '../../api/postdata';
import { getSingleUser } from '../../api/user';
import useCurrentUserUid from '../../components/useruid';

export default function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const router = useRouter();

  const currentUserUid = useCurrentUserUid(); // Use the custom hook to get the current user's UID

  useEffect(() => {
    const { firebaseKey } = router.query;

    if (firebaseKey) {
      // Make call to API layer to get the post data
      getSinglePost(firebaseKey)
        .then((data) => {
          console.log('Post data:', data);
          setPostDetails(data);
          const extractedComments = Object.values(data.comments || []);
          console.log('Extracted comments:', extractedComments);
          setComments(extractedComments);
        })
        .catch((error) => {
          console.error('Error fetching post data:', error);
        });

      // Make call to API layer to get the user data
      getSingleUser(postDetails.uid)
        .then((userData) => {
          console.log('User data:', userData);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [router.query]);

  const handleCommentSubmit = async () => {
    try {
      // Fetch the latest post details before submitting the comment
      const postData = await getSinglePost(router.query.firebaseKey);
      setPostDetails(postData);

      // Optimistically update the comments state with the new comment
      const updatedComments = [...comments, { comment: newCommentText }];
      setComments(updatedComments);

      // Call the createComment API function with the uid of the current user
      await createComment(postData.firebaseKey, newCommentText, currentUserUid);

      // After successfully creating the comment, clear the input field
      setNewCommentText('');
    } catch (error) {
      console.error('Error creating comment:', error);
      // Handle the error appropriately (e.g., show a message to the user)
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={postDetails?.image_url}
            alt={postDetails?.post_title || ''}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </div>
        <div className="col-md-6 mt-4">
          <div className="details">
            <h2 className="text-dark">{postDetails.post_title}</h2>
            <p className="text-muted">{postDetails.post_content}</p>
            <hr />

            {/* Comment Form */}
            <div className="comment-form mb-3">
              <textarea
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="form-control"
              />
              <button type="submit" onClick={handleCommentSubmit} className="btn btn-primary mt-2">
                Submit
              </button>
            </div>

            {/* Comments Section */}
            <h3>Comments</h3>
            <ul>
              {comments.length > 0 ? (
                comments.filter((comment) => typeof comment === 'string' && comment.trim() !== '').map((comment, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={index}>
                    {comment}
                  </li>
                ))
              ) : (
                <li>No comments available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
