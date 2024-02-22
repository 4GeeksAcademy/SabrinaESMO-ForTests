import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"
import "../../styles/login.css";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleClick = () => {
        actions.login(email, password)
    };

    if (store.token && store.token != "" && store.token != null) navigate("/")

    return (
        <div className="text-center mt-5">
            <h1>Login</h1>
            <div>
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleClick}>Send</button>
            </div>
        </div>
    );
};
