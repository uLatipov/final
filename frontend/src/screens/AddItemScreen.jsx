import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAddItemMutation } from "../slices/itemsApiSlice";
import { updateItems, updateCollections } from "../slices/userDataSlice";
import { useGetCollectionByIdQuery } from "../slices/collectionsApiSlice";
import Loader from "../components/Loader";

const AddItemScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();

  const {
    data: collection,
    isLoading: isCollectionLoading,
    error: collectionError,
  } = useGetCollectionByIdQuery(id);

  const dispatch = useDispatch();
  const [createItem, { isLoading, error }] = useAddItemMutation();

  const handleAddItem = async (e) => {
    e.preventDefault();
    const data = { name, description };

    console.log(collection.collections._id);
    const response = await createItem(data, collection.collections._id);
  };

  return isCollectionLoading || isLoading ? (
    <Loader />
  ) : collection ? (
    <>
      <div className='prose mb-4'>
        <h1>Create Item in {collection.collections.title}</h1>
      </div>
      <form className='flex flex-col ' onSubmit={handleAddItem}>
        <label className='form-control w-full mb-2'>
          <div className='label'>
            <span className='label-text'>Name</span>
          </div>
          <input
            type='text'
            placeholder='Type here'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        <button type='submit' className='btn'>
          Create
        </button>
      </form>
    </>
  ) : (
    <Navigate to='/collections' />
  );
};

export default AddItemScreen;

const AddCollectionScreen = () => {
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
