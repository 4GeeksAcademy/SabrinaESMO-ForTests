import React, { useState, useEffect, useContext } from "react";
import "../../styles/giftListEdit.css";
import { Link } from "react-router-dom";
import foto from "../../img/rigo-baby.jpg"

import { Context } from "../store/appContext";


export const RenderGifts = () => {
    const { store, actions } = useContext(Context);
    const [randomImage, setRandomImage] = useState("");

    useEffect(() => {
        if (store.images.length > 0) {
            const randomIndex = Math.floor(Math.random() * store.images.length);
            setRandomImage(store.images[randomIndex]);
        }
    }, [store.images]);

    return store.gift.map((item, index) => (
        <div key={item.id} className="col">
            <div className="card">
                <div className="imgCard text-center">
                    {randomImage && <img src={randomImage} className="card-img-top" alt="..." />}
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id={`title${item.id}`}>
                                    Título:
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`title${item.id}`}
                                    aria-label="Sizing example input"
                                    aria-describedby={`title${item.id}`}
                                    value={item.title}
                                    disabled
                                />
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id={`link${item.id}`}>
                                    Link:
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`link${item.id}`}
                                    aria-label="Sizing example input"
                                    aria-describedby={`link${item.id}`}
                                    value={item.link}
                                    disabled
                                />
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="input-group mb-3">
                                <label className="input-group-text" htmlFor={`status${item.id}`}>
                                    Estatus:
                                </label>
                                <select
                                    className="form-select"
                                    id={`status${item.id}`}
                                    value={item.status}
                                    disabled
                                >
                                    <option value=""></option>
                                    <option value="Disponible">Disponible</option>
                                    <option value="Reservado">Reservado</option>
                                </select>
                            </div>
                        </li>
                    </ul>
                    <div className="card-footer text-center">
                        <Link to={`/giftlist/edit/${item.id}`}>
                            <button href="#" className="btn btn-primary">Editar</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    ));
};