import React, { useState, useEffect } from 'react';
import './App.css';
import Draggable from 'react-draggable';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

export default function Meme() {
    const [photos, setPhotos] = useState('');
    const [allData, setAllData] = useState('');
    const [value, setValue] = useState('');
    const [textcolor, setTextcolor] = useState('black');
    const [size, setSize] = useState('');
    const [loading, setLoading] = useState(false)

    let randomnumber = Math.floor(Math.random() * 100);
    let randomnumber2 = Math.floor(Math.random() * 100);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")

            .then(response => {
                if (!response.ok) {
                    throw Error("ERROR FETCHING ");
                }

                return response.json()
                    .then(response => {
                        setPhotos(response.data.memes[randomnumber].url);
                        setAllData(response);

                    })
                    .catch(err => {
                        throw Error(err.message)
                    });
            }
            );
    }, []);

    function ReLoad() {
        setLoading(true)
        fetch("https://api.imgflip.com/get_memes")

            .then(response => {
                if (!response.ok) {
                    throw Error("ERROR FETCHING ");
                }

                return response.json()
                    .then(response => {
                        setLoading(false)
                        setPhotos(response.data.memes[0].url);
                        setAllData(response);

                    })
                    .catch(err => {
                        throw Error(err.message)
                    });
            }
            );

    }

    function saveImage() {
        domtoimage.toBlob(document.getElementById('my-node'))
            .then(function (blob) {
                window.saveAs(blob, 'my-node.png');
            });
    }


    return (
        <div className="wrapper">

            <div className="textinput">
                <div >
                    <div className="buttonbox">

                        <Button variant="dark" id="btnfloat" onClick={() => { setTextcolor('black') }}>black</Button>
                        <Button variant="light" id="btnfloat" className="whyte" onClick={() => { setTextcolor('white') }}>white</Button>
                        <Button variant="secondary" size="sm" id="btnfloat" onClick={() => { setSize('20px') }}>small</Button>
                        <Button variant="secondary" size="md" id="btnfloat" onClick={() => { setSize('40px') }}>medium</Button>
                        <Button variant="secondary" size="lg" id="btnfloat" onClick={() => { setSize('80px') }}> large</Button>
                        <div></div>
                    </div>
                    <textarea id="textbar" type="text" placeholder="TEXT + SPACING HERE APPEARS ON IMAGE" onChange={(e) => { setValue(e.target.value); }} />
                </div>
            </div>
            <div id="spacer"></div>
            <div className="imagecontainer" >
                <div id="spacer"></div>
                <div style={{ fontSize: '25px' }}>DRAG TEXT TO POSITION</div>
                <div id="my-node">
                    <Draggable>
                        <div id="text1" style={{ color: textcolor, fontSize: size }}>{value}</div>
                    </Draggable>
                    <img style={{ height: '400px', width: '400px' }} src={photos} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Button variant="danger" className="backbutton" onClick={() => { randomnumber2-- > 99 ? randomnumber = 0 : randomnumber && setPhotos(allData.data.memes[randomnumber2].url) }}> PREVIOUS</Button>
                    <Button variant="primary" onClick={ReLoad}> {loading ? <span>...</span> : <span>RELOAD</span>}</Button>
                    <Button variant="success" className="forwardbutton" onClick={() => { randomnumber2++ > 99 ? randomnumber = 0 : randomnumber && setPhotos(allData.data.memes[randomnumber2].url) }}> NEXT</Button>

                </div>
            </div>
            <div id="spacer"></div>
            <Button variant="warning" id="foo" onClick={saveImage}>DOWNLOAD</Button>
        </div >
    )
}

//() => {randomnumber2++ > 99 ? randomnumber = 0 : randomnumber && setPhotos(allData.data.memes[randomnumber2].url)}
