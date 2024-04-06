// import PropTypes from 'prop-types';
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { createComment } from '../../api/postdata';
// import { getSingleUser2, getUsers } from '../../api/user';
// import useCurrentUserUid from '../../components/useruid';

// export default function ViewPost({ postObj }) {
//   const [postDetails] = useState({});
//   const [comments, setComments] = useState([]);
//   const [newCommentText, setNewCommentText] = useState('');
//   const router = useRouter();
//   const currentUserUid = useCurrentUserUid();
//   const [authorName, setAuthorName] = useState('');

//   useEffect(() => {
//     if (postObj && postObj.uid) {
//       const fetchAuthorName = async () => {
//         try {
//           const userData = await getUsers();
//           const matchedUser = userData.find((user1) => user1.uid === postObj.uid);
//           if (matchedUser) {
//             setAuthorName(matchedUser.user_name);
//             console.log(authorName);
//           }
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       };

//       fetchAuthorName();
//     }
//   }, [postObj, authorName]);

//   const handleCommentSubmit = async () => {
//     try {
//       const postData = await getSingleUser2(router.query.firebaseKey);
//       const updatedComments = [...comments, newCommentText];
//       setComments(updatedComments);
//       await createComment(postData.firebaseKey, newCommentText, currentUserUid);
//       setNewCommentText('');
//     } catch (error) {
//       console.error('Error creating comment:', error);
//     }
//   };
//   console.log(postDetails);
//   return (
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-md-6">
//           <img
//             src={authorName.image_url}
//             alt={postDetails.post_title || ''}
//             style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
//           />
//         </div>
//         <div className="col-md-6 mt-4">
//           <div className="details">
//             <h2 className="text-dark">{authorName.last_name}</h2>
//             <p className="text-muted">{postDetails.post_content}</p>
//             <hr />

//             <div className="comment-form mb-3">
//               <textarea
//                 value={newCommentText}
//                 onChange={(e) => setNewCommentText(e.target.value)}
//                 placeholder="Add a comment..."
//                 className="form-control"
//               />
//               <button type="submit" onClick={handleCommentSubmit} className="btn btn-primary mt-2">
//                 Submit
//               </button>
//             </div>

//             <h3>Comments</h3>
//             <ul>
//               {comments.length > 0 ? (
//                 comments.map((comment, index) => (
//                   <li key={index}>{comment}</li>
//                 ))
//               ) : (
//                 <li>No comments available</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// ViewPost.propTypes = {
//   postObj: PropTypes.shape({
//     image_url: PropTypes.string,
//     post_title: PropTypes.string,
//     user_name: PropTypes.string,
//     id: PropTypes.number,
//     created_on: PropTypes.string,
//     post_content: PropTypes.string,
//     categories: PropTypes.string,
//     firebaseKey: PropTypes.string,
//     votes: PropTypes.number, // Change prop type to number for reactions/votes
//     uid: PropTypes.string,
//     user_id: PropTypes.string,
//     user_photo: PropTypes.string,
//     reactions: PropTypes.number, // Change prop type to number for reactions/votes
//   }).isRequired,
// };
