/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createComment, getSinglePost } from '../../api/postdata';
import useCurrentUserUid from '../../components/useruid';
import getSingleUser2 from '../../api/user';

export default function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const router = useRouter();
  const currentUserUid = useCurrentUserUid();
  const [userDetails, setUserDetails] = useState({});

  const getUserDetails = async () => {
    try {
      if (postDetails && userDetails) {
        if (postDetails.uid === userDetails.uid) {
          const userData = await getSingleUser2(userDetails.firebaseKey);
          setUserDetails(userData);
          const extractedComments = Object.values(userData.comments || []);
          setComments(extractedComments);
          console.log('User data:', userData);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUserDetails();

    const fetchPostDetails = async () => {
      const { firebaseKey } = router.query;
      if (firebaseKey) {
        try {
          const postData = await getSinglePost(firebaseKey);
          setPostDetails(postData);
          const extractedComments = Object.values(postData.comments || []);
          setComments(extractedComments);
        } catch (error) {
          console.error('Error fetching post data:', error);
        }
      }
    };

    fetchPostDetails();
  }, [getUserDetails, router.query]);

  const handleCommentSubmit = async () => {
    try {
      const postData = await getSinglePost(router.query.firebaseKey);
      const updatedComments = [...comments, newCommentText];
      setComments(updatedComments);
      await createComment(postData.firebaseKey, newCommentText, currentUserUid);
      setNewCommentText('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={postDetails.image_url}
            alt={postDetails.post_title || ''}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </div>
        <div className="col-md-6 mt-4">
          <div className="details">
            <h2 className="text-dark">{postDetails.post_title}</h2>
            <p className="text-muted">{postDetails.post_content}</p>
            <p>Contact Info: {postDetails.contact_info}</p>
            <p>Price: {postDetails.price}</p>
            <hr />

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

            <h3>Comments</h3>
            <ul>
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={index}>{comment}</li>
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
