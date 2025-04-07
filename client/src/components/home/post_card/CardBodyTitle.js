import React from "react";
import { useLocation } from "react-router-dom";

const CardBodyTitle = ({ post }) => {
    const location = useLocation();
    const isDetailPage = location.pathname === `/post/${post._id}`;

    return (
        <div className="cardtitle">
            <div className="card-header">
                {!isDetailPage && (
                    <div>
                        <div className="title-post">
                            
                        <i className="fas fa-th icon-title"></i> 
                             
                             <span className="title2">Vente</span>
                              <div className="title1">{post.title}</div>

                         
 
                        </div>
 
                    </div>
                )}


            </div>
 
        </div>
    );
};

export default CardBodyTitle;




