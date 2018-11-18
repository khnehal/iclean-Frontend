import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Segment, Header, Table, Button, Icon, Message } from 'semantic-ui-react';
import './items.css'

import ItemsListingRow from './ItemsListingRow';
import {
  GET_ITEMS,
  RELOAD_ITEMS,
  ITEM_UPDATED,
} from '../../store/actions';
import { itemSelector } from '../../store/selectors';


class Items extends Component {

  static propTypes = {
    getItems: PropTypes.func,
    itemsList: PropTypes.array,
    itemUpdated: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  };

  componentDidMount() {
    this.props.getItems();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.itemUpdated);
  }

  fadeOutMessage = () => {
    const {
      resetData
    } = this.props;
    window.setTimeout(() => {
      resetData(ITEM_UPDATED, false);
    }, 2000);
  }

  resetAndReload = () => {
    const {
      getItems,
      resetData,
    } = this.props;

    resetData(RELOAD_ITEMS, false);
    getItems();
  }

  render() {
    const { itemsList, itemUpdated } = this.props;

    return (
      <Segment className="items">
        <Segment padded basic textAlign='center'>
          <Header as='h1' textAlign='left'>
            Items Price List
            <Header.Subheader>List of all Items and Prices.</Header.Subheader>
          </Header>

          { itemUpdated &&
            <Message info size={'large'}>
              <Message.Content>
                {`${itemUpdated}`}
              </Message.Content>
            </Message>
          }

          <Button className="add-item-btn" floated='right' color='green' as={NavLink} to={'/items/add-item'}> <Icon name='plus' /> Add Item </Button>
        </Segment>

        <Segment className="items-section" textAlign='center'>
          { (itemsList && itemsList.length > 0) ?
            <Table padded striped>
              <Table.Body>
                { itemsList.map((item, i) => {
                  return <ItemsListingRow key={i} {...this.state} resetAndReload={this.resetAndReload} fadeOutMessage={this.fadeOutMessage} item={item} index={i} />;
                })}
              </Table.Body>
            </Table> : (<h4>No items to display.</h4>)
          }
        </Segment>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  itemsList: itemSelector.getItemsList(state),
  itemUpdated: itemSelector.itemUpdated(state),
});

const mapDispatchToProps = (dispatch) => ({
  getItems: async () => {
    return dispatch(GET_ITEMS());
  },
  resetData: async (type, data) => {
    return dispatch({ type, data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Items));
