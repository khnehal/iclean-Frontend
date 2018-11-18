import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Table, Input, Button } from 'semantic-ui-react';

import {
  DELETE_ITEM,
  UPDATE_ITEM,
} from '../../store/actions';
import { itemSelector } from '../../store/selectors';


class ItemsListingRow extends Component {
  static propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    deleteItem: PropTypes.func,
    reloadItems: PropTypes.bool,
    resetAndReload: PropTypes.func,
    updateItem: PropTypes.func,
    fadeOutMessage: PropTypes.func,
  };

  state = {
    price: this.props.item.price,
  };

  componentWillReceiveProps(nextProps) {
    const {
      reloadItems,
      resetAndReload,
    } = nextProps;

    if (reloadItems) {
      resetAndReload();
    }
  }

  onDeleteItem = (itemId) => {
    const {
      deleteItem
    } = this.props;
    console.log(`Ye Item(${itemId}) ko delete kar re jamaila!!`);
    deleteItem(itemId);
  }

  onUpdateItem = (itemId) => {
    this.props.updateItem(itemId, { price: this.state.price });
    this.props.fadeOutMessage();
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


const mapStateToProps = (state) => ({
  reloadItems: itemSelector.reloadItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem:  async (id) => {
    return dispatch(DELETE_ITEM(id));
  },
  resetData: async (type) => {
    return dispatch({ type, data: false });
  },
  updateItem: async (id, data) => {
    return dispatch(UPDATE_ITEM(id, data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ItemsListingRow));
