import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Profile = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (store.token === "" || store.token === null) {
			navigate("/");
		} else {
			actions.getUser();
		}
	}, [store.token]);

	return (
		<div className="jumbotron">
			<h1>Profile</h1>
		</div>
	);
};
