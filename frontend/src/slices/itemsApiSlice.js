import { ITEMS_URL, COLLECTIONS_URL, USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => ({
        url: ITEMS_URL,
      }),
    }),
    getLastItems: builder.query({
      query: () => ({
        url: `${ITEMS_URL}/last`,
      }),
    }),
    addItem: builder.mutation({
      query: (data, id) => ({
        url: `${COLLECTIONS_URL}/${id}`,
        body: data,
        method: "POST",
      }),
    }),
    deleteItem: builder.mutation({
      query: (itemID) => ({
        url: `${ITEMS_URL}/:${itemID}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetLastItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
} = itemsApiSlice;
