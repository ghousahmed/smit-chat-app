import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import AddProduct from "../pages/AddProduct";
import UserChat from "../pages/Chat";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { set } from "date-fns";
import { auth, db, getDoc, doc } from "./firebase";
import { useLocation } from 'react-router-dom';


function AppRouter() {
    const [user, setUser] = useState(false);
    const location = useLocation();

    console.log("location", location)
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUser(true)
                }
            } else {
                setUser(false)
            }

        })
    }, [])

    const getCurrentRoute = () => {
        return localStorage.getItem("currentRoute") || "/chat";
    }

    useEffect(() => {
        if (location.pathname !== "/login" && location.pathname !== "/register") {
            localStorage.setItem("currentRoute", `${location.pathname}${location.search}`)
        }
    }, [location])

    return (
        <Routes>
            <Route path="/" element={<login />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/chat" element={user ? <UserChat /> : <Navigate to={"/login"} />} />
            <Route path="/login" element={user ? <Navigate to={getCurrentRoute()} /> : <LoginPage />} />
            <Route path="/register" element={user ? <Navigate to={"/chat"} /> : <SignupPage />} />
        </Routes>
    )
}

export default AppRouter;