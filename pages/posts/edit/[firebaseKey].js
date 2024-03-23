import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getSinglePost } from '../../../api/postdata';
import PostForm from '../../../components/postForm';

export default function EditMember() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSinglePost(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<PostForm obj={editItem} />);
}
