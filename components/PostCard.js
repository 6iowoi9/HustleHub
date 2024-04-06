import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deletePost, updatereactions } from '../api/postdata';
import { getUsers } from '../api/user';

const getCategoryButtonColor = (categories) => {
  switch (categories) {
    case 'Selling':
      return '#693d96';
    case 'art':
      return '#b6529b';
    case 'theater':
      return 'rgb(149, 69, 69)';
    case 'nature':
      return 'green';
    default:
      return 'primary';
  }
};

const getCategoryBorderColor = (categories) => {
  switch (categories) {
    case 'Selling':
      return 'black';
    case 'art':
      return 'black';
    case 'theater':
      return 'black';
    case 'nature':
      return 'black';
    case 'dining':
      return 'black';
    default:
      return 'primary';
  }
};

function PostCard({ postObj, onUpdate }) {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [votes, setVotes] = useState(postObj.reactions || 0);
  const [userVoted, setUserVoted] = useState(null);
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    const fetchAuthorName = async () => {
      try {
        const userData = await getUsers();
        const matchedUser = userData.find((user1) => user1.uid === postObj.uid);
        if (matchedUser) {
          setAuthorName(matchedUser.user_name);
          console.log(authorName);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchAuthorName();
  }, [postObj.uid]);

  const handleVote = async (voteType) => {
    if (!userVoted || userVoted !== voteType) {
      try {
        // Fetch the current reactions count for the specific post
        const currentReactions = parseInt(postObj.reactions, 10);

        // Determine the updated reactions count based on the voteType
        let updatedReactionsCount;
        if (voteType === 'up') {
          updatedReactionsCount = currentReactions + 1;
        } else if (voteType === 'down') {
          updatedReactionsCount = currentReactions - 1;
        }

        // Update the reactions count on the server for the specific post
        await updatereactions(postObj.firebaseKey, updatedReactionsCount);

        // Update the local state with the updated reactions count
        setVotes(updatedReactionsCount);
        setUserVoted(voteType);
      } catch (error) {
        console.error('Error updating votes:', error);
      }
    }
  };

  const handleDeletePost = async () => {
    if (postObj.uid === user.uid) {
      try {
        setIsDeleting(true);
        if (window.confirm(`Delete ${postObj.post_title}?`)) {
          await deletePost(postObj.firebaseKey);
          onUpdate();
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Link href={`/posts/${postObj.firebaseKey}`} passHref>
        <Card.Img
          variant="top"
          src={postObj.image_url}
          alt={postObj.post_title}
          style={{ height: '400px' }}
        />
      </Link>
      <Card.Body>
        <Link href={`/pages/profile/${postObj.firebaseKey}`} passHref>
          <Button id="postauthor">
            {postObj.uid === user.uid ? 'You' : authorName}
          </Button>
        </Link>

        <Card.Title>{postObj.post_title}</Card.Title> {/* Ensure that post_title is displayed */}
        <Card.Text>Created on: {postObj.created_on}</Card.Text>
        <Button
          variant="primary" // or any default variant
          className="m-2"
          style={{
            backgroundColor: getCategoryButtonColor(postObj.categories),
            borderColor: getCategoryBorderColor(postObj.categories),
          }}
        >
          {postObj.categories}
        </Button>
        <Link href={`/posts/${postObj.firebaseKey}`} passHref>
          <Button id="viewButton" variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        <br />
        <Button variant="success" className="m-2" onClick={() => handleVote('up')}>
          👍
        </Button>
        <span>{votes}</span>
        <Button variant="danger" className="m-2" onClick={() => handleVote('down')}>
          👎
        </Button>
        <br />

        {postObj.uid === user.uid && (
          <Link href={`/posts/edit/${postObj.firebaseKey}`} passHref>
            <Button id="editButton" variant="info" className="m-2">
              EDIT
            </Button>
          </Link>
        )}
        {postObj.uid === user.uid && (
          <Button
            id="deleteButton"
            variant="danger"
            onClick={handleDeletePost}
            className="m-2"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'DELETE'}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    image_url: PropTypes.string,
    post_title: PropTypes.string, // Ensure that post_title is included in propTypes
    user_name: PropTypes.string,
    id: PropTypes.number,
    created_on: PropTypes.string,
    post_content: PropTypes.string,
    categories: PropTypes.string,
    firebaseKey: PropTypes.string,
    votes: PropTypes.number, // Change prop type to number for reactions/votes
    uid: PropTypes.string,
    user_id: PropTypes.string,
    user_photo: PropTypes.string,
    reactions: PropTypes.number, // Change prop type to number for reactions/votes
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
