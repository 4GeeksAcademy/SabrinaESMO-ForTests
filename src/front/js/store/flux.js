const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncToken: () => {
				const token = sessionStorage.getItem("token");
				console.log("session loading getting token")
				if (token && token != "" && token != undefined && token != null) setStore({ token: token })
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("session ends")
				setStore({ token: null })
			},

			login: async (email, password) => {
				try {
					const res = await fetch("https://reimagined-space-spork-r4rv5qpxxx9hp5v6-3001.app.github.dev/api/token", {
						method: 'POST',
						body: JSON.stringify({
							email: email,
							password: password
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					});

					if (res.status !== 200) {
						alert("There has been an error");
						return false;
					}

					const data = await res.json();
					console.log("this came from the backend", data);
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token })
					return true;
				} catch (error) {
					console.error("There has been an error:", error);
					return false;
				}
			},

			getMessage: async () => {
				const store = getStore();
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello", {
						headers: {
							'Authorization': 'Bearer ' + store.token
						}
					});
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
