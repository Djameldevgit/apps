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

   

   

    return (
        <div className="card_header d-flex align-items-center justify-content-between">
         <div className="nav-item dropdown ml-auto">
          <span
            className="material-icons"
            id="moreLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ cursor: "pointer", marginRight:'10px',marginTop:'4px' }}
          >
            more_horiz
          </span>
      
          <div className="dropdown-menu dropdown-menu-right shadow-sm rounded mt-2" aria-labelledby="moreLink">
           
                <div>
                  <div className="dropdown-item" onClick={handleEditPost}>
                    <span className="material-icons mr-2">edit</span> Éditer le post
                  </div>
                
                </div>
             
          </div>
        </div>
      </div>
      
    )
}

export default CardHeader
