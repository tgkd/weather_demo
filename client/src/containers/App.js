import React, { Component } from 'react';
import '../styles/App.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Cards from '../components/Cards';
import CityInput from '../components/CityInput';

import { Card } from 'semantic-ui-react';

import * as pageActions from '../actions/PageActions';



class App extends Component {

  render() {
    const { page } = this.props;
    const { getCityWeather, setInputValue, refreshCity, removeCity, errorAction } = this.props.pageActions;


    return (
      <div className="App">
        <div className="search">
          <CityInput
            setInputValue={setInputValue}
            getCityWeather={ getCityWeather }
            fetching={page.fetching}
            inputValue={page.inputValue}
            error={page.error}
            errorAction={ errorAction }
            cardsListLength={page.cardsList.length}
          />

        </div>

        <br/>
        <div className="cards-container">
          <Card.Group>
            <Cards cardsList={page.cardsList} refreshCity={refreshCity} removeCity={removeCity} />
          </Card.Group>
        </div>
      </div>
    );
  }
}

function matStateToProps(state) {
  return {
    page: state.page
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  };
}

export default connect(matStateToProps, mapDispatchToProps)(App);
