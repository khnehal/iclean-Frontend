import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';


class DisplayMessage extends Component {

  static propTypes = {
    message: PropTypes.string,
    errors: PropTypes.array,
  };

  render() {
    const {
      message,
      errors,
    } = this.props;

    return (
      <Message size={'large'} info>
        <Message.Header>{`${message}`}</Message.Header>
        {
          (errors && errors.length > 0) &&
          <Message.List>
            {
              errors.map((error, i) => {
                return <Message.Item key={ i + 1 }>{`${error}`}</Message.Item>;
              })
            }
          </Message.List>
        }
      </Message>
    );
  }
}

export default DisplayMessage
