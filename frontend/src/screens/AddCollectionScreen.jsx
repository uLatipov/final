import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useCreateCollectionMutation } from "../slices/collectionsApiSlice";
import { updateItems, updateCollections } from "../slices/userDataSlice";

const AddCollectionScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const [createCollection, { isLoading, error }] =
    useCreateCollectionMutation();

  const handleAddCollection = async (e) => {
    e.preventDefault();
    const data = { title, description, theme };
    if (image.length > 0) data.image = image;
    const response = await createCollection(data).unwrap();
    console.log(response);
    dispatch(updateCollections(response.collections));
    dispatch(updateItems(response.items));
  };

  return (
    <>
      <div className='prose mb-4'>
        <h1>Create Collection</h1>
      </div>
      <form className='flex flex-col ' onSubmit={handleAddCollection}>
        <label className='form-control w-full mb-2'>
          <div className='label'>
            <span className='label-text'>Title</span>
          </div>
          <input
            type='text'
            placeholder='Type here'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='input input-bordered input-primary w-full'
          />
        </label>
        <label className='form-control w-full mb-2'>
          <div className='label'>
            <span className='label-text'>Description</span>
          </div>
          <textarea
            type='text'
            placeholder='Type here'
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='textarea textarea-bordered h-24 textarea-primary w-full'
          />
        </label>
        <label className='form-control w-full mb-2'>
          <div className='label'>
            <span className='label-text'>Theme</span>
          </div>
          <input
            type='text'
            placeholder='Type here'
            required
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className='input input-bordered input-primary w-full '
          />
        </label>
        <label className='form-control w-full mb-2'>
          <div className='label'>
            <span className='label-text'>Image Url (Optional)</span>
          </div>
          <input
            type='text'
            placeholder='Type here'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className='input input-bordered input-primary w-full '
          />
        </label>
        <button type='submit' className='btn'>
          Create
        </button>
      </form>
    </>
  );
};

export default AddCollectionScreen;
