import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";


export const GiftEdit = () => {
    const { store, actions } = useContext(Context);
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [giftData, setGiftData] = useState(null);
    const navigate = useNavigate();
    // const [status, setStatus] = useState("");
    // const { uid, lid, gid } = useParams();


    useEffect(() => {
        actions.syncToken()
        if (store.token === "" || store.token === null) {
            navigate("/");
        } else {
            fetchGiftData();
        }
    }, []);

    const fetchGiftData = async () => {
        try {
            const gift = await actions.getGiftToStore();
            setGiftData(gift);
            setTitle(gift.title);
            setLink(gift.link);
            // setStatus(gift.status);
        } catch (error) {
            console.error('Error fetching gift data:', error);
        }
    };

    // const handleUpdateGift = async () => {
    //     try {
    //         const success = await actions.getGiftToStore(title, link, status);
    //         if (success) {
    //             console.log('Gift updated successfully');
    //         } else {
    //             console.error('Failed to update gift');
    //         }
    //     } catch (error) {
    //         console.error('Error updating the gift:', error);
    //     }
    // };
    
     // const handleDelete = async idIndex => {
    //     console.log(idIndex)
    //     try {
    //         await actions.deleteGift(idIndex);
    //     } catch (error) {
    //         console.error("Error al eliminar el contacto:", error);
    //     }
    // };
    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="col-md-6">
                <h1 className="text-center">GIFT</h1>
                {giftData && (
                    <div className="alert alert-bg">
                        <h5 className="text">
                        </h5>
                        <div className="mb-3">
                            <div className="mb-3">
                                <label className="form-label">Title:</label>
                                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email:</label>
                                <input type="text" className="form-control" value={link} onChange={(e) => setLink(e.target.value)} />
                            </div>
                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        {/* <button type="button" className="btn mt-3" onClick={handleUpdateGift}>Save</button> */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}






//         <div>
//             <div key={item.id} className="col">
//                 <div className="card">
//                     <div className="top-icons-card d-flex justify-content-end p-2">
//                         <i className="fa-solid fa-circle-xmark" onClick={() => handleDelete(item.id)}></i>
//                     </div>
//                     <div className="imgCard text-center">
//                     </div>
//                     <div className="card-body">
//                         <ul className="list-group list-group-flush">
//                             <li className="list-group-item">
//                                 <div className="input-group mb-3">
//                                     <span className="input-group-text" id={`title${item.id}`}>
//                                         Título:
//                                     </span>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id={`title${item.id}`}
//                                         aria-label="Sizing example input"
//                                         aria-describedby={`title${item.id}`}
//                                         value={!(item.id === isEditableId) ? item.title : title}
//                                         readOnly={!(item.id === isEditableId)}
//                                         onChange={(e) => setTitle(e.target.value)}
//                                     />
//                                 </div>
//                             </li>
//                             <li className="list-group-item">
//                                 <div className="input-group mb-3">
//                                     <span className="input-group-text" id={`link${item.id}`}>
//                                         Link:
//                                     </span>
//                                     <input
//                                         type="text"
//                                         className="form-control custom-link"
//                                         id={`link${item.id}`}
//                                         aria-label="Sizing example input"
//                                         aria-describedby={`link${item.id}`}
//                                         value={item.link}
//                                         onClick={() => window.open(item.link, '_blank')}
//                                         readOnly={!(item.id === isEditableId)}
//                                         onChange={(e) => setLink(e.target.value)}

//                                     />
//                                 </div>
//                             </li>
//                             <li className="list-group-item">
//                                 <div className="input-group mb-3">
//                                     <label className="input-group-text" htmlFor={`status${item.id}`}>
//                                         Estatus:
//                                     </label>
//                                     <select
//                                         className="form-select"
//                                         id={`status${item.id}`}
//                                         value={item.status}
//                                         readOnly={!(item.id === isEditableId)}
//                                     >
//                                         <option value="Available">Available</option>
//                                         <option value="Purchased">Purchased</option>
//                                     </select>
//                                 </div>
//                             </li>
//                         </ul>
//                         <div className="card-footer text-center">
//                             <button href="#" className="btn btn-primary">Editar</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             ))

//         </div>
//     );
// }