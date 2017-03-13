import React, { Component } from 'react';
import { Input, Button, Popup } from 'semantic-ui-react';
import '../styles/App.css';

class CityInput extends Component {

  render() {
    const changeHandler = this.props.onChangeHandler;
    const clickHandler = this.props.onClickHandler;
    return (
      <div>
        <Popup trigger={<Input focus placeholder='Search...' onChange={changeHandler}/>} content='Example "London,uk"'/>

        <Button primary onClick={clickHandler} className='search-btn'>Search</Button>
      </div>
    )
  }
}

export default CityInput;
