import React, { useEffect } from "react";
import { useGetItemsQuery } from "../slices/itemsApiSlice";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import { updateItems } from "../slices/userDataSlice";
import { useDispatch, useSelector } from "react-redux";

const ItemsScreen = () => {
  const { items } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const { data: itemsData, isItemsLoading, itemsError } = useGetItemsQuery();

  const {} = useGetItemsQuery();

  useEffect(() => {
    if (itemsData) {
      dispatch(updateItems(itemsData));
    }
  }, [itemsData]);

  return (
    <>
      {isItemsLoading ? (
        <Loader />
      ) : itemsError ? (
        <Alert text={itemsError?.data?.message || "Unexpected error"} />
      ) : (
        <>
          {items.length > 0 ? (
            <>
              <div className='prose mt-4'>
                <h1>Items</h1>
              </div>
              <div className='w-100 p-4 gap-4 bg-neutral rounded-box flex flex-wrap justify-between mb-28 mt-10'>
                {items.map((item) => (
                  <div
                    className='card w-96 bg-base-100 shadow-xl'
                    key={item._id}
                  >
                    <div className='card-body flex flex-col justify-end'>
                      <h2 className='card-title'>{item.name}</h2>
                      <p>{item.description.slice(0, 30)}</p>
                      <div className='card-actions justify-start'>
                        <Link
                          to={`/items/${item._id}`}
                          className='btn btn-primary'
                        >
                          Open Item
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className='prose'>
                <h1>No items</h1>{" "}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
export default ItemsScreen;
