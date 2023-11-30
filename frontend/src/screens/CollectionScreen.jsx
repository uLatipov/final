import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetCollectionsQuery } from "../slices/collectionsApiSlice";
import { useGetItemsQuery } from "../slices/itemsApiSlice";
import { updateItems, updateCollections } from "../slices/userDataSlice";
import Loader from "../components/Loader";
import noimage from "../assets/noimage.jpg";
import Alert from "../components/Alert";

const CollectionScreen = () => {
  const { items } = useSelector((state) => state.userData);
  const { collections } = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  const { data: collectionsData, isLoading, error } = useGetCollectionsQuery();
  const { data: itemsData, isItemsLoading, itemsError } = useGetItemsQuery();

  useEffect(() => {
    if (collectionsData) {
      dispatch(updateCollections(collectionsData));
    }
    if (itemsData) {
      dispatch(updateItems(itemsData));
    }
  }, [collectionsData, itemsData]);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Alert text={error.message} />
  ) : (
    <>
      <div className='prose mt-4'>
        <h1>Collections</h1>
      </div>
      <div className='w-100 p-4 gap-4 bg-neutral rounded-box flex flex-wrap justify-between mb-28 mt-10'>
        {collections.map((collection) => (
          <div className='card w-96 bg-base-100 shadow-xl' key={collection._id}>
            <div className='card-body flex flex-col justify-end'>
              {collection.image ? (
                <figure>
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className='max-h-40'
                  />
                </figure>
              ) : (
                <figure>
                  <img
                    src={noimage}
                    alt={collection.title}
                    className='max-h-40'
                  />
                </figure>
              )}
              <h2 className='card-title'>{collection.title}</h2>

              <div className='flex justify-between prose leading-none	'>
                <h3>Theme:</h3> <h3>{collection.theme}</h3>
              </div>
              <div className='flex justify-between prose leading'>
                <h3>Items:</h3> <h3>{items?.length}</h3>
              </div>
              <div className='card-actions justify-start'>
                <Link
                  to={`/collections/${collection._id}`}
                  className='btn btn-primary'
                >
                  Open Collection
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CollectionScreen;
