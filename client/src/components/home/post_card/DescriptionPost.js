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

    {/* Titre et type */}
    <div className="info-item">
      <i className="fas fa-globe icon-title"></i>
      <span className="info-label">Type :</span> 
      <span className="title1">{post.title}</span>
    </div>

    {/* Date de publication */}
    <div className="info-item">
      <i className="fas fa-calendar-alt"></i>
      <span className="info-label">Publié le :</span>
      <span className="info-value">
        {new Date(post.createdAt).toLocaleDateString()} à {new Date(post.createdAt).toLocaleTimeString()}
      </span>
    </div>

    {/* Vues */}
    {(post.vistas || []).length > 0 && (
      <div className="info-item">
        <i className="fas fa-eye"></i>
        <span className="info-label">Vues :</span>
        <span className="info-value">{post.vistas}</span>
      </div>
    )}

    {/* Likes */}
    {(post.likes || []).length > 0 && (
      <div className="info-item">
        <i className="fas fa-thumbs-up"></i>
        <span className="info-label">J’aime :</span>
        <span className="info-value">{post.likes.length}</span>
      </div>
    )}

    {/* Commentaires */}
    {(post.comments || []).length > 0 && (
      <div className="info-item">
        <i className="fas fa-comments"></i>
        <span className="info-label">Commentaires :</span>
        <span className="info-value">{post.comments.length}</span>
      </div>
    )}

    {/* Description */}
    {post.description && (
      <div className="info-item">
        <i className="fas fa-align-left"></i>
        <span className="info-label mb-2">Description :</span>
        <span className="info-value">
          <div className="card_body-content">
            <span>
              {post.description.length < 60
                ? post.description
                : readMore
                  ? post.description + ' '
                  : post.description.slice(0, 60) + '.....'}
            </span>
            {post.description.length > 60 && (
              <span className="readMore color-red" onClick={() => setReadMore(!readMore)}>
                {readMore ? 'Masquer le contenu' : 'Lire plus'}
              </span>
            )}
          </div>
        </span>
      </div>
    )}

    {/* Offre */}
    {(post.oferta || []).length > 0 && (
      <div className="info-item">
        <i className="fas fa-tags"></i>
        <span className="info-label">Type d’offre :</span>
        <span className="info-value">{post.oferta}</span>
      </div>
    )}

    {/* Lien */}
    {post.link && (
      <div className="info-item">
        <i className="fas fa-link"></i>
        <span className="info-label">Lien: Aller à l'application</span>
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

    {/* Téléphone */}
    {(post.telefono || []).length > 0 && (
      <div className="info-item">
        <i className="fas fa-phone-alt"></i>
        <span className="info-label">Téléphone :</span>
        <span className="info-value">{post.telefono}</span>
      </div>
    )}

  </div>
</div>

  );
};

export default DescriptionPost;