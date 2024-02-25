import React, { useState, useEffect, useContext } from "react";
import "../../styles/giftListEdit.css";
import { Link } from "react-router-dom";
import foto from "../../img/rigo-baby.jpg"
import "../../styles/renderProfile.css"

import { Context } from "../store/appContext";


export const RenderProfile = () => {
    const { store, actions } = useContext(Context);
    const [randomProfileImage, setRandomProfileImage] = useState("");

    useEffect(() => {
        if (store.profileImages.length > 0) {
            const randomIndex = Math.floor(Math.random() * store.profileImages.length);
            setRandomProfileImage(store.profileImages[randomIndex]);
        }
    }, [store.profileImages]);
    console.log(randomProfileImage)


    const handleDelete = async idIndex => {
        try {
            await actions.deleteGift(idIndex);
        } catch (error) {
            console.error("Error al eliminar el contacto:", error);
        }
    };


    return (
        <>
            <h2>Tus datos:</h2>
            <div className="contactForm container d-flex">
                <div className="image-container m-3">
                    {randomProfileImage && <img src={randomProfileImage} className="circle-image" alt="..." />}
                </div>
                <form>
                    <div className="mb-2">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Nombre:</span>
                            <input type="text" name="name" className="form-control" id="title01" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </div>
                    <div className="mb-2">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Email:</span>
                            <input type="text" name="email" className="form-control" id="link01" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </div>
                    <div className="mb-2">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Password:</span>
                            <input type="text" name="password" className="form-control" id="link01" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </div>
                    <div className="mb-2">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Link regalos:</span>
                            <input type="text" name="listUrl" className="form-control" id="link01" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            <i className="fa-solid fa-copy p-2"></i>
                        </div>
                    </div>
                    <div className="card-footer text-center">
                        <button type="submit" className="btn btn-primary">Actualizar</button>
                    </div>
                </form>

            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to={"/giftlist"}>
                    <button className="btn btn-primary me-md-2" type="button">Volver a la lista</button>
                </Link>

            </div>
        </>
    )
};