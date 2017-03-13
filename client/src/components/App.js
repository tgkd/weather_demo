import React, { Component } from 'react';
import '../styles/App.css';
import CardItem from './CardItem';
import CityInput from './CityInput';
import Client from '../Client';
import ErrorMessage from './ErrorMessage';
import { Card } from 'semantic-ui-react'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      inputValue: '',
      error: {
        show: false,
        message: '',
        errorHeader: ''
      }
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onChangeInputHandler = this.onChangeInputHandler.bind(this);
    this.onDeleteClickHandler = this.onDeleteClickHandler.bind(this);
    this.onCloseErrClickHandler = this.onCloseErrClickHandler.bind(this);
    this.checkLastUpdate = this.checkLastUpdate.bind(this);
  }

  checkLastUpdate() {

  }

  componentDidMount() {
    let cards = localStorage.getItem('cards');
    if(cards && cards !== '[]'){
      if(this.checkLastUpdate){
        this.setState({
          cards: JSON.parse(cards)
        })
      }

    } else {
      localStorage.setItem('cards', '[]');
    }
  }

  onClickHandler() {
    if(this.state.cards.length >= 5){
      this.setState({
        error: {
          show: true,
          errorHeader: 'Error',
          message: 'No more than 5 blocks'
        }
      })
    } else {
      Client.search(this.state.inputValue, (data) => {

        if(data.error){
          this.setState({
            error:{
              show: true,
              message: data.error,
              errorHeader: 'Error'
            }
          })
        } else {
          let newCardsArr = this.state.cards;
          let cardIsExist = false;

          newCardsArr.forEach((item)=>{
            if(item.id === data.id){
              cardIsExist = true;
            }
          });
          if(!cardIsExist){
            newCardsArr.push(data);
            this.setState({
              cards: newCardsArr,
              inputValue: ''
            })
          } else {
            this.setState({
              error:{
                show: true,
                message: 'This block already exists',
                errorHeader: 'Error'
              }
            })
          }
        }
      })
    }
  }

  onChangeInputHandler(e) {
    this.setState({inputValue: e.target.value});
  }

  onDeleteClickHandler(id) {
    let newCardsArr = this.state.cards.filter((item)=>{
      return item.id !== id;
    });
    console.log(newCardsArr);
    this.setState({
      cards: newCardsArr
    })
  }

  onCloseErrClickHandler() {
    this.setState({
      error:{
        show: false,
        message: '',
        errorHeader: ''
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.cards = JSON.stringify(this.state.cards);
  }

  render() {

    const cards = this.state.cards;
    const cardsItems = cards.map((cardData) => {
      return (
        <CardItem deleteClickHandler={this.onDeleteClickHandler} key={cardData.id} data={cardData} />
      )
    });
    let errorWindow = null;
    if(this.state.error.show){
      errorWindow = <ErrorMessage errorHeader={this.state.error.errorHeader} message={this.state.error.message} closeClickHandler={this.onCloseErrClickHandler}/>
    }

    const input = <CityInput onChangeHandler={this.onChangeInputHandler} onClickHandler={this.onClickHandler}/>;

    return (
      <div className="App">
        <div className="search">
          {input}
          {errorWindow}
        </div>

        <br/>
        <div className="cards-container">
          <Card.Group>
            {cardsItems}
          </Card.Group>
        </div>

      </div>
    );
  }
}

export default App;
