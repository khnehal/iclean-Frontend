import React, { Component } from 'react';

import { Segment, Table, Menu, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import ItemsListingRow from './ItemsListingRow';

import './items.css'


class Items extends Component {

  constructor() {
    super();
    this.state = {
      data: [
        {
          id: 1,
          name: 'vest',
          price: '10.5',
        },
        {
          id: 2,
          name: 'shirt',
          price: '15.5',
        },
      ],
    };
  };

  render() {
    const { data } = this.state;

    return (
      <div className="items-section">
        <Segment.Group horizontal className="item-header-section">
          <Segment className="items-title">
            <h2>Items Price List</h2>
          </Segment>
        </Segment.Group>

        <div className="items-listing-section">
          <Segment.Group horizontal>
            <Segment className="items-sub-header">
                <h4>List of all Items and Prices.</h4>
            </Segment>

            <Segment className="add-item">
              <Menu.Item as={NavLink} to={'/items/add-item/'}>
                <Button icon>Add Item</Button>
              </Menu.Item>
            </Segment>
          </Segment.Group>

          <Segment.Group horizontal>
            <Segment>
              <Table>
                <Table.Body>
                  {(data && data.length > 0) && data.map((item, i) => {
                    return <ItemsListingRow key={i} {...this.state} item={item} index={i} />;
                  })}
                </Table.Body>
              </Table>
            </Segment>
          </Segment.Group>
        </div>
      </div>
    );
  }
}


export default Items;
