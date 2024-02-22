import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"
import "../../styles/signup.css";

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async () => {
        const success = await actions.register(email, password);
        if (success) {
            navigate("/login");
        } else {
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className="text-center mt-5">
            <h1>Signup register</h1>
            <div>
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};