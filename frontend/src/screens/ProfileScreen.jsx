import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserDataQuery } from "../slices/usersApiSlice";
import { updateItems, updateCollections } from "../slices/userDataSlice";

import CollectionsList from "../components/CollectionsList";

const ProfileScreen = () => {
  const { items } = useSelector((state) => state.userData);
  const { collections } = useSelector((state) => state.userData);

  const dispatch = useDispatch();
  const { data } = useGetUserDataQuery();

  useEffect(() => {
    if (data) {
      dispatch(updateItems(data.items));
      dispatch(updateCollections(data.collections));
    }
  }, [data]);

  return (
    <>
      <div className='prose'>
        <h1>Profile</h1>

        {collections?.length > 0 ? (
          <h2>Your Collections</h2>
        ) : (
          <h2>You have no collections</h2>
        )}
      </div>
      {collections.length > 0 && (
        <CollectionsList collections={collections} itemsCount={items.length} />
      )}{" "}
      {collections?.length && items?.length ? (
        <>
          <div className='prose'>
            {" "}
            <h2>Your Items</h2>{" "}
          </div>
        </>
      ) : null}
    </>
  );
};

export default ProfileScreen;
