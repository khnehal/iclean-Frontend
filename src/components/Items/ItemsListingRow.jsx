import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Table,
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

  handleChange = (e, { value }) => {
    this.setState({ price: value });
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
        <Table.Cell>{item.item_name}</Table.Cell>
        <Table.Cell textAlign={'right'}>
          <Input
            onChange={this.handleChange}
            type='number'
            value={price}
            step={0.01}
            placeholder={'Price'}
          />
        </Table.Cell>
        <Table.Cell>
          <Button
            className='update-item-btn ui button'
            floated='right'
            color='green'
            onClick={() => this.onUpdateItem(item.id)}
          >
            Update Price
          </Button>
        </Table.Cell>
        <Table.Cell>
          <Button
            className='delete-item-btn'
            basic
            circular
            color={'red'}
            size='medium'
            icon='delete'
            onClick={() => this.onDeleteItem(item.id)}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
};


export default ItemsListingRow;
