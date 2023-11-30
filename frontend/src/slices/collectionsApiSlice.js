import { COLLECTIONS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const collectionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCollections: builder.query({
      query: () => ({
        url: COLLECTIONS_URL,
      }),
    }),
    getTopCollections: builder.query({
      query: () => ({
        url: `${COLLECTIONS_URL}/top`,
      }),
    }),
    createCollection: builder.mutation({
      query: (data) => ({
        url: COLLECTIONS_URL,
        body: data,
        method: "POST",
      }),
    }),
    deleteCollection: builder.mutation({
      query: (collectionID) => ({
        url: `${COLLECTIONS_URL}/${collectionID}`,
        method: "DELETE",
      }),
    }),
    getCollectionById: builder.query({
      query: (collectionID) => ({
        url: `${COLLECTIONS_URL}/${collectionID}`,
      }),
    }),
  }),
});

export const {
  useGetCollectionsQuery,
  useGetTopCollectionsQuery,
  useCreateCollectionMutation,
  useDeleteCollectionMutation,
  useGetCollectionByIdQuery,
} = collectionsApiSlice;
