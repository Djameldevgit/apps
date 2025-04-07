import React, { useState } from 'react';

const DescriptionPost = ({ post }) => {
  const [readMore, setReadMore] = useState(false);

  /* Función para obtener icono del título
  const getTitleIcon = (title) => {
    if (!title) return <i className="fas fa-home icon-title"></i>;

    const iconMap = {
      'aplicación web': 'fas fa-globe',
      'aplicación móvil': 'fas fa-mobile-alt',
      'aplicación móvil (ios/android)': 'fas fa-mobile-alt',
      'pwa': 'fas fa-mobile-android',
      'pwa (web + móvil)': 'fas fa-mobile-android',
      'web responsive': 'fas fa-laptop',
      'landing page': 'fas fa-window-maximize',
      'tienda online': 'fas fa-shopping-cart',
      'e-commerce': 'fas fa-shopping-cart',
      'aplicación de escritorio': 'fas fa-desktop',
      'api/servicio backend': 'fas fa-server',
      'juego web/móvil': 'fas fa-gamepad'
    };

    const iconClass = iconMap[title.toLowerCase()] || 'fas fa-home';
    return <i className={`${iconClass} icon-title`}></i>;
  };

  // Función para obtener icono del enlace
  const getLinkIcon = (linkType) => {
    const iconMap = {
      'aplicación móvil': 'fas fa-mobile-alt',
      'pwa': 'fas fa-mobile-android',
      'tienda online': 'fas fa-shopping-cart',
      'default': 'fas fa-external-link-alt'
    };
    
    const iconClass = iconMap[linkType?.toLowerCase()] || iconMap.default;
    return <i className={`${iconClass} icon-link`}></i>;
  };

  // Función para obtener texto del enlace
  const getLinkText = (linkType) => {
    const textMap = {
      'aplicación móvil': 'Descargar App',
      'pwa': 'Abrir App',
      'tienda online': 'Comprar Ahora',
      'default': 'Visitar Sitio'
    };
    
    return textMap[linkType?.toLowerCase()] || textMap.default;
  };
*/
  return (
    <div className="description-container">
      <div className="post-info">
     
        <div className="info-item">
        <i className="fas fa-globe icon-title"></i>
          <span className="info-label">Aps:</span> <span className='mr-2'>Vente</span>
          <span className="title1">{post.title}</span>
        </div>

        {/* Fecha */}
        <div className="info-item">
          <i className="fas fa-calendar-alt"></i>
          <span className="info-label">Publié le:</span>
          <span className="info-value">
            {new Date(post.createdAt).toLocaleDateString()} à {new Date(post.createdAt).toLocaleTimeString()}
          </span>
        </div>

        {/* Vistas */}
        {(post.vistas || []).length > 0 && (
          <div className="info-item">
            <i className="fas fa-eye"></i>
            <span className="info-label">Vue:</span>
            <span className="info-value">{post.vistas}</span>
          </div>
        )}

        {/* Likes */}
        {(post.likes || []).length > 0 && (
          <div className="info-item">
            <i className="fas fa-thumbs-up"></i>
            <span className="info-label">Likes:</span>
            <span className="info-value">{post.likes.length}</span>
          </div>
        )}

        {/* Comentarios */}
        {(post.comments || []).length > 0 && (
          <div className="info-item">
            <i className="fas fa-comments"></i>
            <span className="info-label">Commentaires:</span>
            <span className="info-value">{(post.comments || []).length}</span>
          </div>
        )}

        {/* Descripción */}
        {post.description && (
          <div className="info-item">
            <i className="fas fa-comments"></i>
            <span className="info-label mb-2">Description:</span>
            <span className="info-value">
              <div className="card_body-content">
                <span>
                  {post.description.length < 60
                    ? post.description
                    : readMore ? post.description + ' ' : post.description.slice(0, 60) + '.....'}
                </span>
                {post.description.length > 60 && (
                  <span className="readMore color-red" onClick={() => setReadMore(!readMore)}>
                    {readMore ? 'masque lo contenu' : 'Lire plus'}
                  </span>
                )}
              </div>
            </span>
          </div>
        )}

        {/* Oferta */}
        {(post.oferta || []).length > 0 && (
          <div className="info-item">
            <i className="fas fa-comments"></i>
            <span className="info-label">Type d'offre:</span>
            <span className="info-value">{(post.oferta || []).length}</span>
          </div>
        )}

        {/* Enlace */}
        {(post.link) && (
          <div className="info-item">
            {(post.title)} {/* Usamos post.title para determinar el tipo */}
            <span className="info-label">Enlace:</span>
            <a
              href={post.link.startsWith('http') ? post.link : `https://${post.link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="info-value link-descarga"
            >
              {post.title}  
            </a>
          </div>
        )}

        {/* Teléfono */}
        {(post.telefono || []).length > 0 && (
          <div className="info-item">
            <i className="fas fa-phone-alt"></i> {/* Icono más apropiado */}
            <span className="info-label">Téléphone:</span>
            <span className="info-value">{(post.telefono || []).length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionPost;