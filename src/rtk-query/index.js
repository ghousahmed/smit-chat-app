import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: 'products',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => `products`,
        }),
        addProduct: builder.mutation({
            query: (data) => ({
                url: `products`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
})

export const { useGetAllProductsQuery, useAddProductMutation } = productsApi