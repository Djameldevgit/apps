import React from 'react'
import Avatar from '../../Avatar'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import { deletePost } from '../../../redux/actions/postAction'
import { BASE_URL } from '../../../utils/config'

const CardHeader = ({post}) => {
    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const history = useHistory()

    const handleEditPost = () => {
        dispatch({ type: GLOBALTYPES.STATUS, payload: {...post, onEdit: true}})
    }

    const handleDeletePost = () => {
        if(window.confirm("Are you sure want to delete this post?")){
            dispatch(deletePost({post, auth, socket}))
            return history.push("/")
        }
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
    }

    return (
        <div className="card_header">
            <div className="d-flex">
                <Avatar src={post.user.avatar} size="big-avatar" />

                <div className="card_name">
                    <h6 className="m-0">
                        <Link to={`/profile/${post.user._id}`} className="text-dark">
                            {post.user.username}
                        </Link>
                    </h6>
                    <small className="text-muted">
                        {moment(post.createdAt).fromNow()}
                    </small>
                </div>
            </div>

            <div className="nav-item dropdown">
                <span className="material-icons" id="moreLink" data-toggle="dropdown">
                    more_horiz
                </span>

                {auth.user ? (
                        auth.user._id === post.user._id || auth.user.role === "admin" ? (
                            // 📌 Si el usuario es dueño del post, muestra estas opciones
                            <>
                                
                                <div className="dropdown-item" onClick={handleEditPost}>
                                    <span className="material-icons">edit</span> Editar Post
                                </div>

                                <div className="dropdown-item" onClick={handleDeletePost}>
                                    <span className="material-icons">edit</span> eliminar post
                                </div>


                            </>
                        ) : (

                            <>


                                <div className="dropdown-item">
                                    <span className="material-icons">       </span> Activar Notificaciones
                                </div>
                                <div className="dropdown-item">
                                    <span className="material-icons">report</span> Denunciar Post
                                </div>

                            </>
                        )
                    ) : (
                        // 📌 Si el usuario NO está autenticado
                        <>
                            <div className="dropdown-item">
                                <span className="material-icons">search</span> Buscar Posts
                            </div>
                            <div className="dropdown-item">
                                <span className="material-icons">share</span> Compartir Post
                            </div>
                            <div className="dropdown-item">
                                <span className="material-icons">filter_list</span> Filtrar por Categoría
                            </div>



                        </>
                    )}
            </div>
        </div>
    )
}

export default CardHeader
