import React, { Component, PropTypes} from 'react';
import { Input, Button, Popup } from 'semantic-ui-react';
import ErrorMessage from './ErrorMessage';
import '../styles/App.css';


export default class CityInput extends Component {

  onSearchBtnClick() {
    if(this.props.cardsListLength >= 5){
      this.props.errorAction('No more than 5 blocks');
    } else {
      this.props.getCityWeather(this.props.inputValue);
    }
  }

  onInputChange(e) {
    this.props.setInputValue(e.target.value);
  }

  render() {
    const { fetching, error, inputValue } = this.props;

    let errorTemplate = error === '' ?  '' : <ErrorMessage errorHeader='Error' message={error} closeClickHandler={this.props.errorAction}/> ;

    return (
      <div>
        <Popup trigger={
          <Input
            focus
            value={inputValue}
            placeholder='Search...'
            onChange={this.onInputChange.bind(this)}
          />
        } content='Example "London,uk"'/>

        <Button
          primary
          loading={fetching}
          onClick={this.onSearchBtnClick.bind(this)}
          className='search-btn'>
          {
            'Search'
          }
        </Button>
        { errorTemplate }
      </div>
    )
  }
}


CityInput.propTypes = {
  setInputValue: PropTypes.func.isRequired,
  getCityWeather: PropTypes.func.isRequired,
  errorAction: PropTypes.func.isRequired
};

