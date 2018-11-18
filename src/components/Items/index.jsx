import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Segment, Header, Table, Button, Icon } from 'semantic-ui-react';
import './items.css'

import ItemsListingRow from './ItemsListingRow';
import { GET_ITEMS } from '../../store/actions';
import { itemSelector } from '../../store/selectors';


class Items extends Component {

  props: {
    getItems: PropTypes.func,
    itemsList: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  };

  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const { itemsList } = this.props;

    return (
      <Segment className="items">
        <Segment padded basic textAlign='center'>
          <Header as='h1' textAlign='left'>
            Items Price List
            <Header.Subheader>List of all Items and Prices.</Header.Subheader>
          </Header>
          <Button className="add-item-btn" floated='right' color='green' as={NavLink} to={'/items/add-item'}> <Icon name='plus' /> Add Item </Button>
        </Segment>

        <Segment className="items-section" basic textAlign='center'>
          <Table padded striped>
            <Table.Body>
              {(itemsList && itemsList.length > 0) && itemsList.map((item, i) => {
                return <ItemsListingRow key={i} {...this.state} item={item} index={i} />;
              })}
            </Table.Body>
          </Table>
        </Segment>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  itemsList: itemSelector.getItemsList(state),
});

const mapDispatchToProps = (dispatch) => ({
  getItems: async () => {
    return dispatch(GET_ITEMS());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Items));
