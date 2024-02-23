import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
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

    if (store.token && store.token != "" && store.token != null) navigate("/private")

    return (
        <div className="container text-center mt-5 d-flex justify-content-center">
            <div className="col-md-6">
                <h1>Login</h1>
                <p>¿Nuevo? <Link to="/signup">Registrate</Link></p>
                <form>
                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3" onClick={handleClick} >Submit</button>
                </form>
            </div>
        </div>
    );
};
