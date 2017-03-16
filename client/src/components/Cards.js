import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

class Cards extends Component {

  onRefreshBtnClick(id, cardsList) {
    this.props.refreshCity(id, cardsList);
  }

  onRemoveBtnClick(id, cardsList) {
    this.props.removeCity(id, cardsList);
  }


  render() {
    const { cardsList } = this.props;


    const cards = cardsList.map((city) => {
      const weatherIconUrl = `http://openweathermap.org/img/w/${city.icon}.png`;
      return(
        <Card key={city.id}>
          <Card.Content>
            <Image floated='right' size='mini' src={weatherIconUrl} />
            <Card.Header>
              {city.city}
            </Card.Header>
            <Card.Meta>
              {city.description}
            </Card.Meta>
            <Card.Description>
              <p>Temperature: {city.temperature} °C</p>
              <p>Humidity: {city.humidity} %</p>
              <p>Pressure: {city.pressure} hPa</p>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green' onClick={this.onRefreshBtnClick.bind(this, city.id, cardsList)}>Refresh</Button>
              <Button basic color='red' onClick={this.onRemoveBtnClick.bind(this, city.id, cardsList)}>Remove</Button>
            </div>
          </Card.Content>
        </Card>
      )
    });
    return (
      <Card.Group>
        {cards}
      </Card.Group>
    )
  }
}

export default Cards;