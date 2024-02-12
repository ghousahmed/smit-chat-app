import { useAddProductMutation } from "../rtk-query";

function AddProduct() {
    const [addPost, { isLoading, isError, isSuccess }] = useAddProductMutation("products")

    const add = () => {
        const product = {
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        }

        addPost(product)

    }
    return (
        <div>
            {isLoading && <h2>Loading....</h2>}
            <button onClick={add}>Add Product</button>
        </div>
    )
}

export default AddProduct;