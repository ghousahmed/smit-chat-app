import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../rtk-query";
import { useEffect } from "react"

function Shop() {
    const { data, isLoading, error } = useGetAllProductsQuery("products", {
        skip: true
    })
    console.log("isLoading", isLoading)
    console.log("data", data)
    console.log("error", error)

    // useEffect(() => {
    //     fetch("https://fakestoreapi.com/products")
    //         .then((res) => res.json())
    //         .then((res) => console.log("res", res))
    // }, [])

    return (
        <div>
            <h1>Shop</h1>
            <Link to={'/'}>Home</Link>
            {isLoading && <h2>Loading....</h2>}
            <ul>
                {data && data.map((v) => (
                    <li key={v.id}>{v.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default Shop;