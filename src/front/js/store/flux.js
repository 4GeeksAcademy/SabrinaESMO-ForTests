const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			gift: [{
				id: "1",
				user_id: "1",
				title: "Example",
				link: "www.amazon.com",
				status: "Disponible",
			}, {
				id: "2",
				user_id: "1",
				title: "Example",
				link: "www.amazon.com",
				status: "Disponible",
			}, {
				id: "3",
				user_id: "1",
				title: "Example",
				link: "www.amazon.com",
				status: "Disponible",
			}],
			images: [],
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
			//regalos
			getGift: () => {
				const store = getStore();
				return store.gift;
			},

			getGiftData: async (id) => {
				try {
					const store = getStore();
					const gift = store.gift.find(item => item.id === id);

					if (!gift) {
						console.error("El regalo no se encontró en la lista.");
						return null;
					}

					return gift;
				} catch (error) {
					console.error("Error en la búsqueda del regalo:", error);
					return null;
				}
			},
			saveGiftData: (formData, isEditing, id) => {
				const store = getStore(); // Obtener el estado actual del store
				const gift = store.gift.slice(); // Copiar el array de regalos

				if (isEditing) {
					// Actualizar el regalo existente
					const updatedGiftIndex = gift.findIndex(g => g.id === id);
					if (updatedGiftIndex !== -1) {
						gift[updatedGiftIndex] = { ...gift[updatedGiftIndex], ...formData };
						setStore({ ...store, gift });
						alert("¡Regalo actualizado correctamente!");
					} else {
						console.error("El regalo con el ID proporcionado no existe.");
					}
				} else {
					// Crear un nuevo regalo con un ID aleatorio
					const newId = Math.floor(Math.random() * 1000000); // Generar un número aleatorio
					const newGift = { id: newId.toString(), ...formData };
					setStore({ ...store, gift: [...gift, newGift] });
					alert("¡Regalo creado correctamente!");
				}
			},

			getPhoto: async () => {
				try {
					const response = await fetch(`https://api.pexels.com/v1/search?query=caja&per_page=5&locale=es-ES`, {
						method: "GET",
						headers: {
							"Authorization": "jdQFRDD6vmPXuYRrqbppN0YPiTww0jTWHtDOKMR7PuH7ES1k9MGh5z5i"
						},
					});

					if (response.ok) {
						const store = getStore();
						const responseData = await response.json();
						const photoUrls = responseData.photos.map(photo => photo.src.original);
						// Almacena las URLs de las fotos en el store
						store.images = photoUrls;
						return photoUrls;
					} else {
						console.error("Error al buscar la foto:", response.status, response.statusText);
						return null;
					}
				} catch (error) {
					console.error("Error en el fetch de la foto:", error);
					return null;
				}
			},


			// fin de regalos
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
			register: async (email, password) => {
				try {
					const res = await fetch("https://reimagined-space-spork-r4rv5qpxxx9hp5v6-3001.app.github.dev/api/user", {
						method: 'POST',
						body: JSON.stringify({
							email: email,
							password: password
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					});

					if (res.status === 200) {
						alert("Registro exitoso");
						return true;
					} else if (res.status === 401) {
						const errorData = await res.json();
						alert(errorData.msg)
						return false
					};
				} catch (error) {
					console.error("There has been an error:", error);
					return false;
				}
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

					if (res.status === 200) {
						const data = await res.json();
						sessionStorage.setItem("token", data.access_token);
						setStore({ token: data.access_token });
						return true;
					} else if (res.status === 401) {
						const errorData = await res.json();
						alert(errorData.msg);
						return false;
					}
				} catch (error) {
					console.error("There has been an error:", error);
					return false;
				}
			},

			getMessage: async () => {
				const store = getStore();
				try {
					const resp = await fetch("https://reimagined-space-spork-r4rv5qpxxx9hp5v6-3001.app.github.dev/api/hello", {
						headers: {
							'Authorization': 'Bearer ' + store.token
						}
					});
					const data = await resp.json()
					setStore({ message: data.message })
					console.log(data.message)
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			getUser: async () => {
				const store = getStore();
				try {
					const resp = await fetch("https://reimagined-space-spork-r4rv5qpxxx9hp5v6-3001.app.github.dev/api/privateuser", {
						headers: {
							'Authorization': 'Bearer ' + store.token
						}
					});
					const data = await resp.json()
					setStore({ message: data.message })
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
