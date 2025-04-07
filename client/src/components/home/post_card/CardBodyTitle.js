import React from "react";
 
const CardBodyTitle = ({ post }) => {
   
    return (
        <div className="cardtitle">
            <div className="card-header">
              
                    <div>
                        <div className="title-post">
                            
                        <i className="fas fa-th icon-title"></i> 
                             
                             <span className="title2">Vente</span>
                              <div className="title1">{post.title}</div>

                         
 
                        </div>
 
                    </div>
                


            </div>
 
        </div>
    );
};

export default CardBodyTitle;




