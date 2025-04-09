import React from "react";
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import { useDispatch } from 'react-redux';
import CardHeader from "./CardHeader";

const CardBodyTitle = ({ post }) => {
  const dispatch = useDispatch()


  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } })
  }
  return (
    <div>
      <div className="card_header d-flex align-items-center justify-content-between">
        <div className="nav-item dropdown ml-auto">
          <span
            className="material-icons"
            id="moreLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ cursor: "pointer", marginRight: '10px', marginTop: '4px' }}
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
<CardHeader/>

      <div className="cardtitle">



        <div className="card-header">

          <div>
            <div className="title-post">

              <i className="fas fa-th icon-title"></i>

              <div className="title2">{post.title}</div>



            </div>

          </div>


        </div>
      </div>

    </div>
  );
};

export default CardBodyTitle;




