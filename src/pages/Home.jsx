// import { useState } from 'react'
// import { useSelector, useDispatch } from "react-redux"
// import { increament, deccreament } from "../store/reducers/counter"


// function Home() {
//     const [count, setCount] = useState(0);
//     const state = useSelector(state => state.counter);
//     const dispatch = useDispatch();


//     const incCounter = () => {
//         dispatch(increament({ name: "Ghous Ahmed" }))
//     }

//     return (
//         <>
//             <h1>Vite + React</h1>
//             <div className="card">
//                 <button onClick={incCounter}>
//                     count is {state.count}
//                 </button>
//             </div>
//         </>
//     )
// }

import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../rtk-query";
import { Link } from "react-router-dom";

function Home() {
    const [skip, setSkip] = useState(true)
    const { data, isLoading, error, status } = useGetAllProductsQuery("products", {
        skip,
    })
    console.log("status", status)
    console.log("isLoading", isLoading)
    console.log("data", data)
    console.log("error", error)

    // useEffect(() => {
    //     fetch("https://fakestoreapi.com/products")
    //         .then((res) => res.json())
    //         .then((res) => console.log("res", res))
    // }, [])

    useEffect(() => {
        setSkip(false)
    }, [])

    return (
        <div>
            <h1>Home</h1>
            <Link to={"/login"}>Chat</Link>
            <button onClick={() => setSkip(false)}>Fetch</button>
            <Link to={'/shop'}>Shop</Link>
            {isLoading && <h2>Loading....</h2>}
            <ul>
                {data && data.map((v) => (
                    <li key={v.id}>{v.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default Home;
