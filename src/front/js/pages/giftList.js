import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import "../../styles/giftlist.css";
import { RenderGifts } from "../component/renderGift";

import { Context } from "../store/appContext";

export const GiftList = () => {
    const { store, actions } = useContext(Context);
    const { uid } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        actions.syncToken()
        if (store.token === "" || store.token === null) {
            navigate("/");
        } else {
            actions.getUser();
        }
    }, []);


    useEffect(() => {
        if (store.token === "" || store.token === null) {
            navigate("/");
        } else {
            actions.getUser();
        }
    }, [store.token]);

    return (
        <div className="container-giftlist">
            <div className="row">
                <div className="col-sm-3 bg-light">
                    <nav className="nav flex-column">
                        <h5>Hola User</h5>
                        <a className="nav-link active" aria-current="page" href="#">Todos( )</a>
                        <a className="nav-link" href="#">Disponibles( )</a>
                        <a className="nav-link" href="#">Reservados( )</a>
                        <a className="nav-link" href="/profile">Perfil( )</a>
                    </nav>
                </div>
                <div className="col-sm-9 p-5">
                    <div className="row row-cols-1 row-cols-md-2 g-4" id="giftRow">
                        <RenderGifts uid={uid} />
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-primary me-md-2" type="button">Compartir</button>
                        <Link to="/giftlist/new-gift"> <button className="btn btn-primary" type="button">Agregar +</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};