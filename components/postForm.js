import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getCategories } from '../api/categories';
import { updatePost, createPost } from '../api/postdata';

const initialState = {
  post_title: '',
  image_url: '',
  post_content: '',
  categories: '',
  reactions: 0,
  price: '',
  contact_info: '',
};

function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const userCategories = await getCategories(user.uid);
      setCategories(userCategories.filter(Boolean));
    };

    fetchCategories();

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      });

      if (obj.firebaseKey) {
        // If updating an existing post
        const result = await updatePost({ ...formInput, created_on: currentDate });
        // Check if updateMember returned a valid result
        if (result) {
          router.push('/');
        } else {
          console.error('updateMember did not return a valid result.');
        }
      } else {
        // If creating a new post
        const payload = { ...formInput, uid: user.uid, created_on: currentDate };
        const { name } = await createPost(payload);

        // Check if createMember returned a valid result
        if (name) {
          const patchPayload = { firebaseKey: name };
          await updatePost(patchPayload);
          router.push('/');
        } else {
          console.error('createMember did not return a valid result.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle the error appropriately (e.g., show a message to the user)
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj && obj.firebaseKey ? 'Update' : 'Create'} Post</h2>

      <FloatingLabel controlId="floatingInput-post_title" label="TITLE" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="post_title"
          value={formInput.post_title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput-image_url" label="IMAGE URL" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter image URL"
          name="image_url"
          value={formInput.image_url}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput-post_content" label="CONTENT" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Enter content"
          name="post_content"
          value={formInput.post_content}
          onChange={handleChange}
          style={{ height: '150px' }} // Set the height inline
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput-post_title" label="PRICE" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Asking Price"
          name="price"
          value={formInput.price}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput-post_title" label="CONTACT" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Contact Info"
          name="contact_info"
          value={formInput.contact_info}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Category">
        <Form.Select
          aria-label="Category"
          name="categories"
          onChange={handleChange}
          className="mb-3"
          value={formInput.categories}
          required
        >
          <option value="">Select a Category</option>
          {categories.map(({ firebaseKey, Category }) => (
            <option key={firebaseKey} value={firebaseKey}>
              {Category}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <Button type="submit">{obj && obj.firebaseKey ? 'Update' : 'Create'} Post</Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    image_url: PropTypes.string,
    post_title: PropTypes.string,
    id: PropTypes.number,
    created_on: PropTypes.string,
    post_content: PropTypes.string,
    categories: PropTypes.string,
    price: PropTypes.string,
    contact_info: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
    downvotePost: PropTypes.number,
    updatePost: PropTypes.number,
    reactions: PropTypes.number,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};

export default PostForm;
