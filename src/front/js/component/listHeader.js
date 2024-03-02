import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ListHeader = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (store.currentList.length === 0) {
            actions.getAllList(store.currentUser.id);
        }
    }, []);

    return (
        <div className="d-flex justify-content-between">
            <div className="list-header">
                <h2>List: {store.currentList.length > 0 ? store.currentList[0].name : 'Default List'}</h2>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {store.currentList.length > 0 ? store.currentList[0].name : 'Default List'}
                    </button>
                    <ul className="dropdown-menu">
                        {store.currentList.map((list, index) => (
                            <li key={index}><a className="dropdown-item" href="#">{list.name}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-primary me-md-2" type="button">Share list</button>
                <Link to="/giftlist/new-gift"> <button className="btn btn-primary" type="button">Add item +</button></Link>
            </div>
        </div>
    );
}
