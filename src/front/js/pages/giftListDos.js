import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import "../../styles/giftListDos.css";
import foto from "../../img/rigo-baby.jpg"
import { RenderGifts } from "../component/renderGift";


import { Context } from "../store/appContext";
import { RenderProfile } from "../component/renderProfile";
import { ListHeader } from "../component/listHeader";

export const GiftListDos = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('home');

    const uid = store.currentUser.id

    // useEffect(() => {
    //     actions.syncToken()
    //     if (store.token === "" || store.token === null) {
    //         navigate("/");
    //     } else {

    //         actions.getUser();
    //         actions.getAllList(uid);

    //     }
    // }, []);
    console.log(sessionStorage)

    useEffect(() => {
        if (sessionStorage.token === "" || sessionStorage.token === null) {
            navigate("/");
        } else {
            console.log(uid)
            actions.getUser();
            actions.getAllList(uid);
        }
    }, [store.token]);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };


    return (
        <div className="container-giftlist">
            <div className="row">
                <div className="col-sm-3 bg-light">
                    <div className="d-flex align-items-start">
                        <div className="nav flex-column nav-pills me-3 align-items-start" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <h5>{store.currentUser.message}</h5>
                            <button className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabChange('home')}>Gifts</button>
                            <button className={`nav-link ${activeTab === 'available' ? 'active' : ''}`} onClick={() => handleTabChange('available')}>Available( )</button>
                            <button className={`nav-link ${activeTab === 'purchased' ? 'active' : ''}`} onClick={() => handleTabChange('purchased')}>Purchased( )</button>
                            <button className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => handleTabChange('profile')}>Profile</button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-9 p-5">
                    <ListHeader />
                    <div className="tab-content" id="v-pills-tabContent">
                        <div className={`tab-pane ${activeTab === 'home' ? 'active' : ''}`} id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                            {activeTab === 'home' && (
                                <div className="row row-cols-1 row-cols-md-2 g-4">
                                    <RenderGifts uid={uid} />
                                </div>
                            )}
                        </div>
                        <div className={`tab-pane ${activeTab === 'available' ? 'active' : ''}`} id="v-pills-available" role="tabpanel" aria-labelledby="v-pills-available-tab">
                            {activeTab === 'available' && <div>Available</div>}
                        </div>
                        <div className={`tab-pane ${activeTab === 'purchased' ? 'active' : ''}`} id="v-pills-purchased" role="tabpanel" aria-labelledby="v-pills-purchased-tab">
                            {activeTab === 'purchased' && <div>Purchased</div>}
                        </div>
                        <div className={`tab-pane ${activeTab === 'profile' ? 'active' : ''}`} id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                            {activeTab === 'profile' && <RenderProfile />}
                        </div>
                    </div>
                </div>
            </div>
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
                        <RenderGifts uid={store.currentUser.id} />
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