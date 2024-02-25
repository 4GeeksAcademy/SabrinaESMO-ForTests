import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { RenderProfile } from "../component/renderProfile";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();
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
		<div className="profile">
			<RenderProfile />
		</div>
	);
};
