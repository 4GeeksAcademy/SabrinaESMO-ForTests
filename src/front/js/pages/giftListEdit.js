import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import "../../styles/giftListEdit.css";
import foto from "../../img/rigo-baby.jpg"

import { Context } from "../store/appContext";

export const GiftListEdit = ({ isEditing }) => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        title: "",
        link: "",
        status: "",
    });

    useEffect(() => {
        if (isEditing && id) {
            actions.getGiftData(id)
                .then(gift => {
                    if (gift) {
                        setFormData({
                            title: gift.title,
                            link: gift.link,
                            status: gift.status,
                        });
                    }
                })
                .catch(error => console.error("Error al obtener los datos del regalo:", error));
        }
    }, [isEditing, id]);

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

    const handleInputChange = evt => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        });
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        const url = isEditing ? `https://reimagined-space-spork-r4rv5qpxxx9hp5v6-3000.app.github.dev/giftlist/edit/${id}` : "https://reimagined-space-spork-r4rv5qpxxx9hp5v6-3000.app.github.dev/giftlist/new-gift";
        actions.saveGiftData(formData, isEditing, id);
        setFormData({
            title: "",
            link: "",
            status: "",
        });
        navigate("/giftlist");
    };

    return (
        <div className="container-giftlist">
            <div className="row">
                <div className="col-sm-3 bg-light">
                    <nav className="nav flex-column">
                        <h5>Hola User</h5>
                        <a className="nav-link active" aria-current="page" href="#">Todos( )</a>
                        <a className="nav-link" href="#">Disponibles( )</a>
                        <a className="nav-link" href="#">Reservados( )</a>
                        <a className="nav-link" href="#">Perfil( )</a>
                    </nav>
                </div>
                <div className="col-sm-9 p-5">
                    <div className="contactForm container">
                        <h2>{isEditing ? "Editar regalo" : "Agregar nuevo regalo"}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Título:</span>
                                    <input type="text" className="form-control" id="title01" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" value={formData.title} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Link:</span>
                                    <input type="text" className="form-control" id="link01" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" value={formData.link} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="input-group mb-3">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Estatus:</label>
                                    <select className="form-select" id="inputGroupSelect01" value={formData.status} onChange={handleInputChange} >
                                        <option value=""></option>
                                        <option value="Disponible">Disponible</option>
                                        <option value="Reservado">Reservado</option>
                                    </select>
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <button type="submit" className="btn btn-primary">{isEditing ? "Actualizar" : "Guardar"}</button>
                            </div>
                        </form>

                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Link to={"/giftlist"}>
                            <button className="btn btn-primary me-md-2" type="button">Volver a la lista</button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};