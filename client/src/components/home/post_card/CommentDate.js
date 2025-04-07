import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
 
import moment from 'moment';
import 'moment/locale/fr'; // Importa el idioma francés
const CommentDate = ({ post }) => {
    const history = useHistory();
    const location = useLocation();
    const isDetailPage = location.pathname === `/post/${post._id}`;
 
    moment.locale('fr'); // Establece el idioma a francés

    const { auth } = useSelector((state) => state);  
    const [showModal, setShowModal] = useState(false);

    const handleCommentClick = () => {
        if (!auth.token) {
            setShowModal(true);
        } else {
            history.push(`/post/${post._id}`);
        }
    };

    if (isDetailPage) return null;

    return (
        <>
            <div className="card_footer">
                <div className="footer-content">

                    <div className="card-date">
                        <span className="mr-1"><i className='far fa-clock'></i>  </span>

                        <small className="text-dat">
                            {moment(post.createdAt).fromNow()}
                        </small>
                    </div>


                    <h6 className="mt-0" style={{ cursor: "pointer" }} onClick={handleCommentClick}>
                        <span><i className='far fa-comment-alt mr-0'></i></span>    <span className="comment-text mr-2">commenter</span>
                    </h6>
                </div>


            </div>

            {/* Modal de autenticación */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>Titre</h4>
                        <p>Message</p>
                        <div className="modal-buttons">
                            <button onClick={() => history.push("/login")}>
                              Connection
                            </button>
                            <button onClick={() => history.push("/register")}>
                               Registre
                            </button>
                            <button onClick={() => setShowModal(false)}>
                              Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CommentDate;
