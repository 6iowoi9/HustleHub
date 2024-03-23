import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
// import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
// import { getCategories } from '../api/categories';
import { registerUser, updateUser } from '../api/user';

const initialState = {
  bio: '',
  first_name: '',
  last_name: '',
  image_url: '',
  user_name: '',
  contact_info: '',
};

function RegisterForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // const [categories, setCategories] = useState([]);
  const { user } = useAuth();
  // const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (obj.firebaseKey) {
      // If updating an existing post
      const result = await updateUser({ ...formInput });
      // Check if updateMember returned a valid result
      if (result) {
        window.location.href = '/'; // Redirect to the main page
      } else {
        console.error('updateMember did not return a valid result.');
      }
    } else {
      // If creating a new post
      const payload = { ...formInput, uid: user.uid };
      const { name } = await registerUser(payload);

      // Check if createMember returned a valid result
      if (name) {
        const patchPayload = { firebaseKey: name };
        await updateUser(patchPayload);
        window.location.href = '/'; // Redirect to the main page
      } else {
        console.error('createMember did not return a valid result.');
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj && obj.firebaseKey ? 'Update' : 'Create'} Post</h2>

      <FloatingLabel controlId="floatingInput-post_title" label=" First Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter your first name"
          name="first_name"
          value={formInput.first_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput-post_content" label="Last Name" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Enter content"
          name="last_name"
          value={formInput.post_content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput-post_content" label=" Username" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Enter content"
          name="user_name"
          value={formInput.post_content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput-post_content" label="About me " className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Enter content"
          name="bio"
          value={formInput.post_content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput-post_content" label="Contact info" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Enter content"
          name="contact_info"
          value={formInput.post_content}
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

      {/* <FloatingLabel controlId="floatingSelect" label="Category">
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
      </FloatingLabel> */}

      <Button type="submit">{obj && obj.firebaseKey ? 'Update' : 'Create'} User</Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    last_name: PropTypes.string,
    firebaseKey: PropTypes.string,
    first_name: PropTypes.string,
    contact_info: PropTypes.string,
    bio: PropTypes.string,
    uid: PropTypes.string,
    obj: PropTypes.string,
    updateUser: PropTypes.number,
  }),

};

RegisterForm.defaultProps = {
  obj: initialState,
};

export default RegisterForm;
