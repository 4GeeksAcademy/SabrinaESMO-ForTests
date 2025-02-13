import { ListHeader } from "../component/listHeader";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			currentUser: [],
			currentList: [],
			currentGift: [],
			currentAvailable: [],
			currentPurchased: [],
			guestImages: [],
			profileImages: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			// //ACTIONS REGALOS SOLO STORE MJ POR SI LAS NECESITO LUEGO PARA ACTUALIZAAR STORE
			// getGift: () => {
			// 	const store = getStore();
			// 	return store.gift;
			// },

			// getGiftData: async (id) => {
			// 	try {
			// 		const store = getStore();
			// 		const gift = store.gift.find(item => item.id === id);

			// 		if (!gift) {
			// 			console.error("El regalo no se encontró en la lista.");
			// 			return null;
			// 		}

			// 		return gift;
			// 	} catch (error) {
			// 		console.error("Error en la búsqueda del regalo:", error);
			// 		return null;
			// 	}
			// },

			// saveGiftData: (formData, isEditing, gid) => {
			// 	const store = getStore(); // Obtener el estado actual del store
			// 	const gift = store.gift.slice(); // Copiar el array de regalos

			// 	if (isEditing) {
			// 		// Actualizar el regalo existente
			// 		const updatedGiftIndex = gift.findIndex(g => g.id === gid);
			// 		if (updatedGiftIndex !== -1) {
			// 			gift[updatedGiftIndex] = { ...gift[updatedGiftIndex], ...formData };
			// 			setStore({ ...store, gift });
			// 			alert("¡Regalo actualizado correctamente!");
			// 		} else {
			// 			console.error("El regalo con el ID proporcionado no existe.");
			// 		}
			// 	} else {
			// 		// Crear un nuevo regalo con un ID aleatorio
			// 		const newId = Math.floor(Math.random() * 1000000); // Generar un número aleatorio
			// 		const newGift = { id: newId.toString(), ...formData };
			// 		setStore({ ...store, gift: [...gift, newGift] });
			// 		alert("¡Regalo creado correctamente!");
			// 	}
			// },



			// deleteGift: (id) => {
			// 	const store = getStore();
			// 	const updatedGifts = store.gift.filter(g => g.id !== id);

			// 	setStore({ ...store, gift: updatedGifts });

			// 	alert("¡Regalo eliminado correctamente!");
			// },

			// fin de regalos

			// ACTIONS FOTOS
			getProfilePhoto: async () => {
				try {
					const response = await fetch(`https://api.pexels.com/v1/search?query=animal&per_page=3&locale=es-ES`, {
						method: "GET",
						headers: {
							"Authorization": `${process.env.API_PEXELS_TOKEN}`
						},
					});

					if (response.ok) {
						const store = getStore();
						const responseData = await response.json();
						const photoUrls = responseData.photos.map(photo => photo.src.original);
						// Almacena las URLs de las fotos en el store
						store.profileImages = photoUrls;
						console.log(store.profileImages)
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

			getGuestPhoto: async () => {
				try {
					const response = await fetch(`https://api.pexels.com/v1/search?query=surprise&per_page=3&locale=es-ES`, {
						method: "GET",
						headers: {
							"Authorization": `${process.env.API_PEXELS_TOKEN}`
						},
					});

					if (response.ok) {
						const store = getStore();
						const responseData = await response.json();
						const photoUrls = responseData.photos.map(photo => photo.src.original);
						// Almacena las URLs de las fotos en el store
						store.guestImages = photoUrls;
						console.log(store.guestImages)
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
			// ACTIONS TOKEN

			syncToken: () => {
				const token = sessionStorage.getItem("token");
				console.log("session loading getting token")
				if (token && token != "" && token != undefined && token != null) setStore({ token: token })
			},

			// ACTIONS MENSAJES
			getMessage: async () => {
				const store = getStore();
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/hello`, {
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

			// ACTIONS USER
			register: async (email, password, randomProfileImage) => {
				try {
					const res = await fetch(`${process.env.BACKEND_URL}/api/user`, {
						method: 'POST',
						body: JSON.stringify({
							name: "",
							email: email,
							password: password,
							img: randomProfileImage,
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
					const res = await fetch(`${process.env.BACKEND_URL}/api/token`, {
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

			getUser: async () => {
				const store = getStore();
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user`, {
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${sessionStorage.getItem('token')}`
						}
					});
					const data = await resp.json()
					return data;

				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			getUserToStore: async () => {
				const store = getStore();
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user`, {
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${sessionStorage.getItem('token')}`
						}
					});

					const data = await resp.json();
					if (!data || typeof data.id === 'undefined') {
						throw new Error('Invalid response format: missing user ID');
					}
					setStore({
						...store,
						currentUser: {
							id: data.id,
							name: data.name,
							email: data.email,
							img: data.img,
							message: data.message
						}
					});
					console.log(store.currentUser);
					return data;

				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			getPublicUserToStore: async (uid) => {
				const store = getStore();
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/guest/${uid}`, {
						headers: {
							'Content-Type': 'application/json',
						}
					});

					const data = await resp.json();
					if (!data || typeof data.id === 'undefined') {
						throw new Error('Invalid response format: missing user ID');
					}
					setStore({
						...store,
						currentUser: {
							id: data.id,
							name: data.name,
							email: data.email,
							img: data.img,
							message: data.message
						}
					});
					console.log(store.currentUser);
					return data;

				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("session ends");
				setStore({
					token: null,
					currentList: [],
					currentUser: [],
					currentGift: [],
					currentAvailable: [],
					currentPurchased: [],
				});
			},

			cleanStore: () => {
				sessionStorage.removeItem("token");
				console.log("store cleaned");
				setStore({
					token: null,
					currentList: [],
					currentUser: [],
					currentGift: [],
					currentAvailable: [],
					currentPurchased: [],
					profileImages: [],
				});
			},

			deleteUser: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/${id}/giftlist/${id}`, {
						method: 'DELETE',
						headers: {
							'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
							'Content-Type': 'application/json'
						},
					});

					if (response.ok) {
						console.log('User deleted')
						return true;
					} else {
						throw new Error('Failed to delete user');
					}
				} catch (error) {
					console.error('Error deleting user:', error);
					return false;
				}
			},

			updateUser: async (name, email, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${sessionStorage.getItem('token')}`
						},
						body: JSON.stringify({
							name: name,
							email: email,
							password: password,
						}),
					});
					// TODO: AGREGAR LA ACTUALIZACION DEL CURRENTUSER STORE
					if (response.ok) {
						console.log('Update SUCCESS')
						return true;
					} else {
						throw new Error('Failed to update profile');
					}
				} catch (error) {
					console.error('Error updating profile:', error);
					return false;
				}
			},


			// ACTIONS EXAMPLE
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				// exampleFunction: () => {
				// 	getActions().changeColor(0, "green");
				// },	

				//reset the global store
				setStore({ demo: demo });
			},

			// ACTIONS LIST
			newList: async (id) => {
				try {
					const res = await fetch(`${process.env.BACKEND_URL}/api/list`, {
						method: 'POST',
						body: JSON.stringify({
							name: "Lista General",
							id: id,
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					});
					if (res.status === 200) {
						console.log("Lista creada")
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

			getAllList: async (id) => {
				const store = getStore();
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${id}/giftlist`, {
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${sessionStorage.getItem('token')}`
						}
					});
					const data = await resp.json()
					console.log(data)
					// Mapear cada objeto de data y agregarlo a currentList
					const updatedList = data.map(item => ({
						id: item.id,
						user_id: item.user_id,
						name: item.name,
					}));

					// Combinar la lista actual con la nueva lista mapeada
					const mergedList = [...updatedList];

					// Actualizar el store con la nueva lista combinada
					setStore({
						...store,
						currentList: mergedList
					});
					console.log(store.currentList);
					return data;

				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			getPublicAllList: async (uid, lid) => {
				// TODO:REVISAR CUANDO SE TENGA LA ENTRADA PUBLICA
				console.log(uid, lid)
				const store = getStore();
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/guest/${uid}/giftlist/${lid}`, {
						headers: {
							'Content-Type': 'application/json',
						}
					});
					const data = await resp.json()
					console.log(data)
					// Mapear cada objeto de data y agregarlo a currentList
					const updatedList = data.map(item => ({
						id: item.id,
						user_id: item.user_id,
						name: item.name,
					}));

					// Combinar la lista actual con la nueva lista mapeada
					const mergedList = [...updatedList];

					// Actualizar el store con la nueva lista combinada
					setStore({
						...store,
						currentList: mergedList
					});
					console.log(store.currentList);
					return data;

				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			// ACTIONS GIFT
			newFirstGift: async (uid, lid) => {
				try {
					const res = await fetch(`${process.env.BACKEND_URL}/api/gifts`, {
						method: 'POST',
						body: JSON.stringify({
							title: "Default gift",
							link: "https://www.defaultLink.com/",
							status: "Available",
							img: "https://images.pexels.com/photos/1573324/pexels-photo-1573324.jpeg",
							list_id: lid,
							user_id: uid
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					});
					if (res.status === 200) {
						console.log("Regalo creado")
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
////
			getGift: async (uid, lid, gid) => {
				const store = getStore();
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${uid}/giftlist/<${lid}/gifts/${gid}`, {
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${sessionStorage.getItem('token')}`
						}
					});
					const data = await resp.json()
					return data;
				} catch (error) {
					console.log("Error getting gift from back", error)
				}
			},
//////			
			getGiftToStore: async (uid, lid) => {
				const store = getStore();
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${uid}/giftlist/${lid}/gifts`, {
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${sessionStorage.getItem('token')}`
						}
					});
					const data = await resp.json()
					console.log("regalos conseguido", data)
					// Mapear cada objeto de data y agregarlo a currentList
					const updatedGiftList = Array.isArray(data) && data.length > 0 ?
						data.map(item => ({
							id: item.id,
							title: item.title,
							link: item.link,
							status: item.status,
							list_id: item.list_id,
							img: item.img,
						})) : [];

					// Combinar la lista actual con la nueva lista mapeada
					const mergedGiftList = [...updatedGiftList];

					// Actualizar el store con la nueva lista combinada
					setStore({
						...store,
						currentGift: mergedGiftList
					});
					console.log("Regalos agregados al store", store.currentGift);
					return data;

				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			getGiftToStoreAvailable: async (uid, lid) => {
				const store = getStore();
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${uid}/giftlist/${lid}/gifts/available`, {
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${sessionStorage.getItem('token')}`
						}
					});
					const data = await resp.json()
					console.log("regalos available conseguido", data)

					const updatedGiftAvailableList = Array.isArray(data) && data.length > 0 ?
						data.map(item => ({
							id: item.id,
							title: item.title,
							link: item.link,
							status: item.status,
							list_id: item.list_id,
							img: item.img,
						})) : [];


					// Combinar la lista actual con la nueva lista mapeada
					const mergedGiftAvailableList = [...updatedGiftAvailableList];

					// Actualizar el store con la nueva lista combinada
					setStore({
						...store,
						currentAvailable: mergedGiftAvailableList
					});
					console.log("Regalos available agregados al store ", store.currentAvailable);
					return data;

				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			getGiftToStorePurchased: async (uid, lid) => {
				const store = getStore();
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${uid}/giftlist/${lid}/gifts/purchased`, {
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${sessionStorage.getItem('token')}`
						}
					});
					const data = await resp.json();
					console.log("regalos purchased conseguido", data);

					// Verificar si data es un array y tiene al menos un elemento
					const updatedGiftPurchasedList = Array.isArray(data) && data.length > 0 ?
						data.map(item => ({
							id: item.id,
							title: item.title,
							link: item.link,
							status: item.status,
							list_id: item.list_id,
							img: item.img,
						})) : [];

					// Combinar la lista actual con la nueva lista mapeada
					const mergedGiftPurchasedList = [...updatedGiftPurchasedList];

					// Actualizar el store con la nueva lista combinada
					setStore({
						...store,
						currentPurchased: mergedGiftPurchasedList
					});
					console.log("Regalos purchased agregados al store ", store.currentPurchased);
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
			getPublicGiftToStore: async (uid, lid) => {
				// TODO: REVISAR CUANDO ESTE LA ENTRADA PUBLICA
				const store = getStore();
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/guest/${uid}/giftlist/${lid}/gifts`, {
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${sessionStorage.getItem('token')}`
						}
					});
					const data = await resp.json()
					console.log("regalos conseguido", data)
					// Mapear cada objeto de data y agregarlo a currentList
					const updatedGiftList = Array.isArray(data) && data.length > 0 ?
						data.map(item => ({
							id: item.id,
							title: item.title,
							link: item.link,
							status: item.status,
							list_id: item.list_id,
							img: item.img,
						})) : [];

					// Combinar la lista actual con la nueva lista mapeada
					const mergedGiftList = [...updatedGiftList];

					// Actualizar el store con la nueva lista combinada
					setStore({
						...store,
						currentGift: mergedGiftList
					});
					console.log("Regalos agregados al store", store.currentGift);
					return data;

				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			getPublicGiftToStoreAvailable: async (uid, lid) => {
				// TODO: REVISAR CUANDO ESTE LA ENTRADA PUBLICA
				const store = getStore();
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/guest/${uid}/giftlist/${lid}/gifts/available`, {
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${sessionStorage.getItem('token')}`
						}
					});
					const data = await resp.json()
					console.log("regalos available conseguido", data)

					const updatedGiftAvailableList = Array.isArray(data) && data.length > 0 ?
						data.map(item => ({
							id: item.id,
							title: item.title,
							link: item.link,
							status: item.status,
							list_id: item.list_id,
							img: item.img,
						})) : [];

					// Combinar la lista actual con la nueva lista mapeada
					const mergedGiftAvailableList = [...updatedGiftAvailableList];

					// Actualizar el store con la nueva lista combinada
					setStore({
						...store,
						currentAvailable: mergedGiftAvailableList
					});
					console.log("Regalos available agregados al store ", store.currentAvailable);
					return data;

				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

		}
	};
};

export default getState;