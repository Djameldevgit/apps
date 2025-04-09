import React from 'react'

const ButtonLink = ({post}) => {
  return (
    <div>
         {post.link && (
                    <div className="mt-3 mb-1 w-100"> {/* Aquí se le da un ancho del 100% al contenedor */}
                        <a
                            href={post.link.startsWith('http') ? post.link : `https://${post.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary w-100"
                        >
                            <i className="fas fa-external-link-alt mr-2"></i> Accéder à l'application
                        </a>
                    </div>
                )}

    </div>
  )
}

export default ButtonLink
