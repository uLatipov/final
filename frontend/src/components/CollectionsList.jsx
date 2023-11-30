import React from "react";
import { Link } from "react-router-dom";
import noimage from "../assets/noimage.jpg";

const CollectionsList = ({ collections, itemsCount }) => {
  let reverseCollections = [...collections].reverse();

  return (
    <div className='carousel carousel-center max-w-prose p-4 space-x-4 bg-neutral rounded-box'>
      {reverseCollections.map((collection) => (
        <div
          className='card w-96 bg-base-100 shadow-xl carousel-item'
          key={collection._id}
        >
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
              <h3>Items:</h3> <h3>{collection?.items?.length || itemsCount}</h3>
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
  );
};

export default CollectionsList;
