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


function AppRouter() {
    const [user, setUser] = useState(false)
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            console.log("user", user)
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
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/chat" element={user ? <UserChat /> : <Navigate to={"/login"} />} />
                <Route path="/login" element={user ? <Navigate to={"/chat"} /> : <LoginPage />} />
                <Route path="/register" element={user ? <Navigate to={"/chat"} /> : <SignupPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;