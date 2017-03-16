import React, {Component} from 'react';
import { Message, Button, Icon } from 'semantic-ui-react';


class ErrorMessage extends Component {
  onCloseClick() {
    this.props.closeClickHandler('');
  }
  render() {
    return(
      <Message
        negative
        size='tiny'
        onDismiss={this.onCloseClick.bind(this)}
      >
        <Message.Header>
          {this.props.errorHeader}
        </Message.Header>
        <p>{this.props.message}</p>
      </Message>
    )
  }
}

export default ErrorMessage;