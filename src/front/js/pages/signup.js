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
        }
    };
    return (
        <div className="container text-center mt-5 d-flex justify-content-center">
            <div className="col-md-6">
                <h1>Welcome, Signup form:</h1>
                <form className="form_signup mt-5">
                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit} >Submit</button>
                </form>
            </div>
        </div>
    );
};