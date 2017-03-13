import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import Client from '../Client';

class CardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: this.props.data
    };
    this.onRefreshClickHandler = this.onRefreshClickHandler.bind(this);

  }

  onRefreshClickHandler(id) {
    Client.refreshCard(id, (result)=>{
      if(!result.error){
        this.setState({
          cardData: result
        })
      }
    })
  }

  render() {
    const data = this.state.cardData;
    const clickHandler = this.props.deleteClickHandler;
    const weatherIconUrl = `http://openweathermap.org/img/w/${data.icon}.png`;
    return (
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src={weatherIconUrl} />
          <Card.Header>
            {data.city}
          </Card.Header>
          <Card.Meta>
            {data.description}
          </Card.Meta>
          <Card.Description>
            <p>Temperature: {data.temperature} °C</p>
            <p>Humidity: {data.humidity} %</p>
            <p>Pressure: {data.pressure} hPa</p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green' onClick={this.onRefreshClickHandler.bind(this, data.id)}>Refresh</Button>
            <Button basic color='red' onClick={clickHandler.bind(this, data.id)}>Remove</Button>
          </div>

        </Card.Content>
      </Card>

    /*  <div className="card-item" >
        <h2> {data.name} </h2>

        <p> {data.main.temp} </p>
        <p> {data.main.humidity} </p>
        <p> {data.main.pressure} </p>
        <img src={weatherIconUrl} alt={data.weather[0].description}/>
      </div>*/
    )
  }
}

export default CardItem;