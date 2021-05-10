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



    function handleInput(event) {
        setValue(event.target.value);

    };

    function changeColorToBlack() {
        setTextcolor('black')
    };

    function changeColorToWhite() {
        setTextcolor('white')
    };

    function sizeSmall() {
        setSize('20px')

    };
    function sizeMedium() {
        setSize('40px')
    };
    function sizeLarge() {
        setSize('80px')
    };

    function goForward() {

        randomnumber2 += 1

        if (randomnumber2 > 99) {
            randomnumber2 = 0
        }
        setPhotos(allData.data.memes[randomnumber2].url)
    };

    function goBack() {
        randomnumber2 -= 1

        if (randomnumber2 < 0) {
            randomnumber2 = 99

        }
        setPhotos(allData.data.memes[randomnumber2].url)
    };


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

                        <Button variant="dark" id="btnfloat" onClick={changeColorToBlack}>black</Button>
                        <Button variant="light" id="btnfloat" className="whyte" onClick={changeColorToWhite}>white</Button>
                        <Button variant="secondary" size="sm" id="btnfloat" onClick={sizeSmall}>small</Button>
                        <Button variant="secondary" size="md" id="btnfloat" onClick={sizeMedium}>medium</Button>
                        <Button variant="secondary" size="lg" id="btnfloat" onClick={sizeLarge}> large</Button>
                        <div></div>
                    </div>
                    <textarea id="textbar" type="text" placeholder="TEXT + SPACING HERE APPEARS ON IMAGE" onChange={handleInput} />
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
                <Button variant="danger" className="backbutton" onClick={goBack}> PREVIOUS</Button>
                <Button variant="success" className="forwardbutton" onClick={goForward}> NEXT</Button>
            </div>
            <div id="spacer"></div>
            <Button variant="warning" id="foo" onClick={saveImage}>DOWNLOAD</Button>
        </div >
    )
}