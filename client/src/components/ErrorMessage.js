import React, {Component} from 'react';
import { Message, Button, Icon } from 'semantic-ui-react';


class ErrorMessage extends Component {
  render() {
    return(
      <Message negative size='tiny'>
        <Message.Header>
          {this.props.errorHeader}
          <Button icon floated='right' color='red' size='mini' onClick={this.props.closeClickHandler}><Icon name='close'/></Button>
        </Message.Header>
        <p>{this.props.message}</p>
      </Message>
    )
  }
}

export default ErrorMessage;