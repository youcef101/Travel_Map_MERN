import React, { Fragment } from 'react';
import styled from 'styled-components'
import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room } from '@material-ui/icons'
import StarIcon from '@material-ui/icons/Star';
import Topbar from './Topbar';
import { useEffect } from 'react';
import axiosInstance from '../axios';
import { format } from 'timeago.js'
import { useSelector } from 'react-redux';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mobile } from '../responsive';


const Map = () => {
    const current_user = useSelector(state => state.user.current_user.username)
    const [star, setStar] = useState(1)
    const [current_marker, setCurrentMarker] = useState(null)
    const [newMarker, setNewMarker] = useState(null)
    const [markers, setMarkers] = useState([])
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 48.858093,
        longitude: 2.294694,
        zoom: 5
    });
    const [inputs, setInputs] = useState({
        title: '',
        desc: ''
    })
    const handleInputs = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const getAllMarkers = async () => {
            try {
                const res = await axiosInstance.get('/marker/get/all');
                const data = await res.data
                setMarkers(data)
            } catch { }
        }
        getAllMarkers()
    }, [])

    const handleMarker = (id, lat, long) => {
        setCurrentMarker(id)
        setViewport({
            ...viewport,
            latitude: lat,
            longitude: long
        })
    }
    const handleNewMarker = (e) => {
        //console.log(e)
        const [longitude, latitude] = e.lngLat
        setNewMarker({
            lat: latitude,
            long: longitude,
        })
    }
    const AddPlace = async (e) => {
        e.preventDefault();
        const newPlace = {
            username: current_user,
            title: inputs.title,
            desc: inputs.desc,
            rating: star,
            lat: newMarker.lat,
            long: newMarker.long
        }
        try {
            const res = await axiosInstance.post('/marker/add', newPlace);
            setMarkers([...markers, res.data]);
            setNewMarker(null)
        } catch { }
    }

    return <Container>
        <Topbar />
        <MapGL
            {...viewport}

            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_PK}
            onViewportChange={(viewport) => setViewport(viewport)}
            mapStyle='mapbox://styles/safak/cknndpyfq268f17p53nmpwira'
            transitionDuration="200"
            onDblClick={current_user && handleNewMarker}

        >
            {markers &&
                markers.map(marker => <React.Fragment key={Math.random()}>
                    <Marker latitude={marker.lat} longitude={marker.long} offsetLeft={-20} offsetTop={-10} >
                        <Room
                            style={{
                                fontSize: 7 * viewport.zoom,
                                color: marker.username === current_user ? 'tomato' : "slateblue",
                                cursor: "pointer",
                            }}
                            onClick={() => handleMarker(marker._id, marker.lat, marker.long)}

                        />
                    </Marker>
                    {marker._id === current_marker &&
                        <MarkerPopup
                            latitude={marker.lat}
                            longitude={marker.long}
                            closeButton={true}
                            closeOnClick={false}
                            onClose={() => setCurrentMarker(null)}
                            anchor='bottom'

                        >
                            <PopupContent>
                                <LabelItem>
                                    <Label>Place

                                    </Label>

                                    <LabelContent style={{ fontSize: '13px' }}>{marker.title}</LabelContent>
                                </LabelItem>
                                <LabelItem>
                                    <Label>Review

                                    </Label>
                                    <LabelContent style={{ fontSize: '13px' }}>{marker.desc}</LabelContent>
                                </LabelItem>
                                <LabelItem>
                                    <Label>Rating

                                    </Label>
                                    <LabelContent>
                                        {
                                            Array(marker.rating)
                                                .fill()
                                                .map(rate => <StarIcon key={Math.random()} fontSize='small' style={{ color: '#cca300' }} />)
                                        }

                                    </LabelContent>
                                </LabelItem>
                                <LabelItem>
                                    <Label>Information

                                    </Label>
                                    <LabelContent>
                                        <span style={{ fontSize: '13px' }}>created by <b>{marker.username}</b></span>

                                    </LabelContent>
                                    <span style={{ fontSize: '13px' }}>{format(marker.createdAt)}</span>
                                </LabelItem>
                            </PopupContent>
                        </MarkerPopup>
                    }</React.Fragment>
                )}

            {newMarker && <>
                <Marker
                    latitude={newMarker.lat}
                    longitude={newMarker.long}
                    offsetLeft={-20}
                    offsetTop={-10} >
                    <Room
                        style={{
                            fontSize: 7 * viewport.zoom,
                            color: 'tomato',
                            cursor: "pointer",
                        }}


                    />
                </Marker>
                <MarkerPopup
                    latitude={newMarker.lat}
                    longitude={newMarker.long}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setNewMarker(null)}
                    anchor="left"
                >
                    <PopupInput>
                        <InputContainer>
                            <Label>Title</Label>
                            <input type='text' placeholder='title' name='title' onChange={handleInputs} />
                        </InputContainer>
                        <InputContainer>
                            <Label>Description</Label>
                            <textarea placeholder='Say us something about this place.' name='desc' onChange={handleInputs} />
                        </InputContainer>
                        <InputContainer>
                            <Label>Rating</Label>
                            <select onChange={(e) => setStar(e.target.value)} >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </InputContainer>
                        <MarkerBtn onClick={AddPlace}>ADD PLACE</MarkerBtn>
                    </PopupInput>
                </MarkerPopup>
            </>}
        </MapGL>

    </Container>;
};

export default Map;
const Container = styled.div`
width:100%;
height:100%;
position:relative;
overflow:hidden;

`

const MapGL = styled(ReactMapGL)`
top:0;
right:0;
left:0;
bottom:0;
`
const MarkerPopup = styled(Popup)`
.mapboxgl-popup-close-button{
    font-size:25px;
    width:30px;
}
`
const PopupContent = styled.div`
max-width:200px;
margin:10px 10px;
`
const LabelItem = styled.div`
display:flex;
flex-direction:column;
margin:10px 0px;
`
const Label = styled.span`
font-weight:600;
color:#ff4d4d;
margin-bottom:10px;
font-size:15px;
`
const LabelContent = styled.span`
font-size:15px;

`
const PopupInput = styled.div`
display:flex;
flex-direction:column;
min-width:250px;
margin:10px 10px;
`
const InputContainer = styled.div`
margin:5px 0px;
display:flex;
flex-direction:column;
input{
    padding:5px 5px;
    
    border:1px solid black;
    &:focus{
        outline:none;
    }
}
textarea{
    padding:5px 5px;
   border:1px solid black;
   
    &:focus{
        outline:none;
    }
}
select{
    width:20%;
    padding:5px 5px;
    border:1px solid black;
   
    &:focus{
        outline:none;
    }
}
`

const MarkerBtn = styled.button`
margin:10px 0px;
padding:5px 0px;
background-color:teal;
cursor:pointer;
width:50%;
color:white;
font-size:14px;
font-weight:600;
border:none;
&:hover{
    background-color:#00cccc;
}
`