import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  Icon,
  Input,
  Button,
} from 'semantic-ui-react';

class ItemsListingRow extends Component {
  props: {
    item: PropTypes.object,
    index: PropTypes.number,
  };

  state = {
    price: this.props.item.price,
  };

  onDeleteItem = (itemId) => {
    // Call the delete api.
    console.log(`Ye Item(${itemId}) ko delete kar re jamaila!!`);
  }

  onUpdateItem = (itemId) => {
    // Call the update api.
    console.log(`Ye Item(${itemId}) ko update kar re jamaila!!`);
  }

  handleChange = (e) => {
    this.setState({ price: e.target.value });
  }

  render() {
    const {
      price,
    } = this.state;

    const {
      index,
      item,
    } = this.props;

    return (
      <Table.Row key={index + 1}>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>
          <Input
            onChange={(e) => this.handleChange(e)}
            type='text'
            defaultValue={price}
          />
        </Table.Cell>
        <Table.Cell>
          <Button className='ui button' onClick={() => this.onUpdateItem(item.id)}>Update Price</Button>
        </Table.Cell>
        <Table.Cell><Icon name='close' onClick={() => this.onDeleteItem(item.id)} /></Table.Cell>
      </Table.Row>
    );
  }
};


export default ItemsListingRow;
