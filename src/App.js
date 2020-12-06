import React, { Component } from 'react';
import './App.css';
import Draggable from 'react-draggable';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';


let randomnumber = Math.floor(Math.random() * 100);

let randomnumber2 = Math.floor(Math.random() * 100);



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: '',
      allData: '',
      value: '',
      textcolor: 'black',
      size: ''

    }


  }


  handleInput = (event) => {
    this.setState({ value: event.target.value });


  };



  changeColorToBlack = () => {
    this.setState({ textcolor: 'black' })
  };

  changeColorToWhite = () => {
    this.setState({ textcolor: 'white' })
  };

  sizeSmall = () => {
    this.setState({ size: '20px' })

  };
  sizeMedium = () => {
    this.setState({ size: '40px' })
  };
  sizeLarge = () => {
    this.setState({ size: '80px' })
  };


  componentDidMount() {



    fetch("https://api.imgflip.com/get_memes")

      .then(response => {
        if (!response.ok) {
          throw Error("ERROR FETCHING ");
        }

        return response.json()
          .then(response => {
            this.setState({ photos: response.data.memes[randomnumber].url, allData: response })


          })
          .catch(err => {
            throw Error(err.message)
          });
      }
      );



  }

  goForward = () => {

    randomnumber2 += 1

    if (randomnumber2 > 99) {
      randomnumber2 = 0

    }


    this.setState({ photos: this.state.allData.data.memes[randomnumber2].url })


  };

  goBack = () => {
    randomnumber2 -= 1

    if (randomnumber2 < 0) {
      randomnumber2 = 99

    }


    this.setState({ photos: this.state.allData.data.memes[randomnumber2].url })

  };


  saveImage = () => {

    domtoimage.toBlob(document.getElementById('my-node'))
      .then(function (blob) {
        window.saveAs(blob, 'my-node.png');
      });
  }



  render() {


    console.log(randomnumber2)

    return (

      <div className="wrapper">

        <div className="textinput">
          <div >
            <div className="buttonbox">

              <Button variant="dark" id="btnfloat" onClick={this.changeColorToBlack}>black</Button>
              <Button variant="light" id="btnfloat" className="whyte" onClick={this.changeColorToWhite}>white</Button>
              <Button variant="secondary" size="sm" id="btnfloat" onClick={this.sizeSmall}>small</Button>
              <Button variant="secondary" size="md" id="btnfloat" onClick={this.sizeMedium}>medium</Button>
              <Button variant="secondary" size="lg" id="btnfloat" onClick={this.sizeLarge}> large</Button>
              <div></div>
            </div>


            <textarea id="textbar" type="text" placeholder="TEXT + SPACING HERE APPEARS ON IMAGE" onChange={this.handleInput} />
          </div>


        </div>

        <div id="spacer"></div>

        <div className="imagecontainer" >
          <div id="spacer"></div>

          <div style={{ fontSize: '25px' }}>DRAG TEXT TO POSITION</div>


          <div id="my-node">

            <Draggable>
              <div id="text1" style={{ color: this.state.textcolor, fontSize: this.state.size }}>{this.state.value}</div>
            </Draggable>



            <img style={{ height: '400px', width: '400px' }} src={this.state.photos} />

          </div>
          <Button variant="danger" className="backbutton" onClick={this.goBack}> PREVIOUS</Button>





          <Button variant="success" className="forwardbutton" onClick={this.goForward}> NEXT</Button>

        </div>
        <div id="spacer"></div>

        <Button variant="warning" id="foo" onClick={this.saveImage}>DOWNLOAD</Button>
      </div >

    )


  }
}

