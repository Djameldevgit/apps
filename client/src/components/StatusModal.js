import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { imageShow, videoShow } from '../utils/mediaShow';
import { GLOBALTYPES } from '../redux/actions/globalTypes';


import { createPost, updatePost } from '../redux/actions/postAction';
 
// Función que devuelve el icono según el tipo

const StatusModal = () => {
    const { auth, theme, socket, status, } = useSelector((state) => state);

    const dispatch = useDispatch()
    
    const initilastate = {

        title: "",
        link: "",
        description: "",
        price: "",
        oferta: "",
        unidaddeprecio: "",

        telefono: "",


    }


    const [postData, setPostData] = useState(initilastate)
    const [images, setImages] = useState([])


    const [stream, setStream] = useState(false)
    const videoRef = useRef()
    const refCanvas = useRef()
    const [tracks, setTracks] = useState('')




    const handleChangeInput = e => {
        const { name, value } = e.target;
        setPostData(prev => ({
            ...prev,
            [name]: value
        }));
    }

 

    const handleChangeImages = e => {
        const files = [...e.target.files]
        let err = ""
        let newImages = []

        files.forEach(file => {
            if (!file) return err = "File does not exist."

            if (file.size > 1024 * 1024 * 5) {
                return err = "The image/video largest is 5mb."
            }

            return newImages.push(file)
        })

        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
        setImages([...images, ...newImages])
    }

    const deleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleStream = () => {
        setStream(true)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(mediaStream => {
                    videoRef.current.srcObject = mediaStream
                    videoRef.current.play()

                    const track = mediaStream.getTracks()
                    setTracks(track[0])
                }).catch(err => console.log(err))
        }
    }

    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute("width", width)
        refCanvas.current.setAttribute("height", height)

        const ctx = refCanvas.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        let URL = refCanvas.current.toDataURL()
        setImages([...images, { camera: URL }])
    }

    const handleStopStream = () => {
        tracks.stop()
        setStream(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (images.length === 0) {
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: "Por favor agrega una foto o video." },
            });
        }

        if (status.onEdit) {
            dispatch(updatePost({ postData, images, auth, status }));
        } else {
            dispatch(createPost({ postData, images, auth, socket }));
        }

        setPostData(initilastate);
        setImages([]);
        if (tracks) tracks.stop();
        dispatch({ type: GLOBALTYPES.STATUS, payload: false });
    };

    useEffect(() => {
        console.log("status en useEffect:", status);
        if (status?.onEdit) {
            setPostData({
                title: status.title || "",

                description: status.description || "",
                price: status.price || "",
                unidaddeprecio: status.unidaddeprecio || "",
                oferta: status.oferta || "",
                link: status.link || "",

                telefono: status.telefono || "",


            });
            setImages(status.images || []);


        }
    }, [status]);


    return (
        <div className="status_modal">
            <form onSubmit={handleSubmit}>
                <div className="status_header">
                    <h5 className="m-0">Crear nueva app</h5>
                    <span onClick={() => dispatch({
                        type: GLOBALTYPES.STATUS, payload: false
                    })}>
                        &times;
                    </span>
                </div>
                <div className="form-group">
                    <select
                        name="title"  // Si es necesario, cambia el nombre a "tipoAplicacion"
                        value={postData.title}  // Asegúrate de que el estado coincida
                        onChange={handleChangeInput}
                        className="form-control"
                    >
                        <option value="">Tipo de aplicación/sitio</option>
                        <option value="Aplicación Web">Aplicación Web</option>
                        <option value="Aplicación Móvil">Aplicación Móvil (iOS/Android)</option>
                        <option value="PWA">PWA (Web + Móvil)</option>
                        <option value="Web Responsive">Sitio Web Responsive</option>
                        <option value="Landing Page">Landing Page</option>
                        <option value="Tienda Online">Tienda Online (E-commerce)</option>
                        <option value="Aplicación de Escritorio">Aplicación de Escritorio</option>
                        <option value="API/Servicio Backend">API/Servicio Backend</option>
                        <option value="Juego Web/Móvil">Juego Web/Móvil</option>
                    </select>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="link"
                        placeholder='Link'
                        value={postData.link}
                        className="form-control"
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="status_body">
                    <textarea name="description" value={postData.description}
                        placeholder='Descripcion'
                        onChange={handleChangeInput}
                        style={{
                            filter: theme ? 'invert(1)' : 'invert(0)',
                            color: theme ? 'white' : '#111',
                            background: theme ? 'rgba(0,0,0,.03)' : '',
                        }} />

                    <div className="form-group">
                        <input
                            type="number"
                            name="price"
                            placeholder='Precio'
                            value={postData.price}
                            className="form-control"
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className="form-group">
                        <select
                            multiple={false}
                            name="unidaddeprecio"
                            value={postData.unidaddeprecio}
                            onChange={handleChangeInput}
                            className="form-control"
                        >
                            <option  >Unité de prix</option>
                            <option value="DA">DA</option>
                            <option value="Millions">Millions</option>
                            <option value="Milliard">Milliard</option>
                            <option value="DA (m²)">DA (m²)</option>
                            <option value="Millions (m²) ">Millions (m²)</option>

                        </select>
                    </div>

                    <div className="form-group">
                        <select
                            multiple={false}
                            name="oferta"
                            value={postData.oferta}
                            onChange={handleChangeInput}
                            className="form-control"
                        >
                            <option >Type D'offre</option>
                            <option value="Fixe">Fixe</option>
                            <option value="Négociable">Négociable</option>
                            <option value="Offert">Offert</option>

                        </select>
                    </div>


                    <div className="form-group">
                        <input
                            type="text"
                            name="telefono"
                            placeholder='Telefono'
                            value={postData.telefono}
                            className="form-control"
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className="show_images">
                        {
                            images.map((img, index) => (
                                <div key={index} id="file_img">
                                    {
                                        img.camera ? imageShow(img.camera, theme)
                                            : img.url
                                                ? <>
                                                    {
                                                        img.url.match(/video/i)
                                                            ? videoShow(img.url, theme)
                                                            : imageShow(img.url, theme)
                                                    }
                                                </>
                                                : <>
                                                    {
                                                        img.type.match(/video/i)
                                                            ? videoShow(URL.createObjectURL(img), theme)
                                                            : imageShow(URL.createObjectURL(img), theme)
                                                    }
                                                </>
                                    }
                                    <span onClick={() => deleteImages(index)}>&times;</span>
                                </div>
                            ))
                        }
                    </div>

                    {
                        stream &&
                        <div className="stream position-relative">
                            <video autoPlay muted ref={videoRef} width="100%" height="100%"
                                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />

                            <span onClick={handleStopStream}>&times;</span>
                            <canvas ref={refCanvas} style={{ display: 'none' }} />
                        </div>
                    }

                    <div className="input_images">
                        {
                            stream
                                ? <i className="fas fa-camera" onClick={handleCapture} />
                                : <>
                                    <i className="fas fa-camera" onClick={handleStream} />

                                    <div className="file_upload">
                                        <i className="fas fa-image" />
                                        <input type="file" name="file" id="file"
                                            multiple accept="image/*,video/*" onChange={handleChangeImages} />
                                    </div>
                                </>
                        }

                    </div>

                </div>

                <div className="status_footer">
                    <button className="btn btn-secondary w-100" type="submit">
                        Post
                    </button>
                </div>

            </form>
        </div>
    )
}

export default StatusModal
