import React, { useEffect, useState } from "react";
import { useGetLastItemsQuery } from "../slices/itemsApiSlice";
import { useGetTopCollectionsQuery } from "../slices/collectionsApiSlice";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import CollectionsList from "../components/CollectionsList";
import ItemsList from "../components/ItemsList";

const HomeScreen = () => {
  const {
    data: items,
    isLoading: isItemsLoading,
    error: itemsError,
  } = useGetLastItemsQuery();
  const {
    data: collections,
    isLoading: isCollectionsLoading,
    error: collectionsError,
  } = useGetTopCollectionsQuery();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isItemsLoading || isCollectionsLoading) {
      setIsLoading(true);
    }
    if (!isCollectionsLoading && !isItemsLoading) {
      setIsLoading(false);
    }

    if (itemsError) {
      setError(itemsError);
    }
    if (collectionsError) {
      setError(collectionsError);
    }
  }, [isItemsLoading, isCollectionsLoading, itemsError, collectionsError]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert text={error?.data?.message || "Unexpected error"} />
      ) : (
        <>
          <div className='prose'>
            {" "}
            <h2 className='mb-4'>Recently Added</h2>
          </div>
          <ItemsList items={items} />
          <div className='prose'>
            <h2 className='my-4'>Top 5 Collections</h2>
          </div>
          <CollectionsList collections={collections} />
        </>
      )}
    </>
  );
};
export default HomeScreen;
