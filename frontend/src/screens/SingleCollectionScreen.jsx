import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCollectionByIdQuery } from "../slices/collectionsApiSlice";
import Loader from "../components/Loader";
import Alert from "../components/Alert";

const SingleCollectionScreen = () => {
  const params = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetCollectionByIdQuery(params.id);
  return (
    <>
      {isLoading && <Loader />}
      {error && <Alert text={error.message} />}

      <div className='prose'>
        <h1>Collection: {data?.collections.title}</h1>
        {(userInfo?._id === data?.collections.userId._id && (
          <>
            <Link
              to={`/collections/${params.id}/add`}
              className='btn btn-success'
            >
              Add item
            </Link>{" "}
            <button className='btn btn-error'>Delete Collection</button>
          </>
        )) ||
          (userInfo.isAdmin === true && (
            <Link
              to={`/collections/${params.id}/add`}
              className='btn btn-success'
            >
              Add item
            </Link>
          ))}
        <h2>
          {data?.items.length === 0 ? (
            <>No items in this collections</>
          ) : (
            <>Items</>
          )}
        </h2>
      </div>
      {data?.items.length > 0 && (
        <div className='carousel carousel-center max-w-prose p-4 space-x-4 bg-neutral rounded-box'>
          {data.items.map((item) => (
            <div
              className='card w-96 bg-base-100 shadow-xl carousel-item'
              key={item._id}
            >
              <div className='card-body'>
                <h2 className='card-title'>{item.name}</h2>
                <p>{item.description.slice(0, 50)}</p>
                <div className='card-actions justify-start'>
                  <button className='btn btn-primary'>Open Item</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SingleCollectionScreen;
