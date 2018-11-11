import React, { Component } from 'react';

import { Segment, Input, Table, Dropdown, Button } from 'semantic-ui-react';

import './items.css'

class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      price: null,
      category: '',
      image: '',
    };
  };

  categoryOptions = [
    { key: '', text: 'Select Category', value: 0, _id: null},
    { key: 'Dry Cleaning', text: 'Dry Cleaning', value: 0, _id: null},
    { key: 'Laundary', text: 'Laundary', value: 0, _id: null},
    { key: 'Households', text: 'Households', value: 0, _id: null},
  ]

  onAddItem = (itemData) => {
    // Call the add api.
  }

  handleChange = (e, obj) => {
    this.setState(obj);
  }

  render() {
    const {
      name,
      price,
      category,
      image,
    } = this.state;

    return (
      <div className="items-section">
        <Segment.Group horizontal className="item-header-section">
          <Segment className="items-title">
            <h2>Add Item</h2>
          </Segment>
        </Segment.Group>

        <Segment.Group horizontal className="item-add-section">
          <Segment className="items-title">
            <h4>Add New Item.</h4><br/>

            <Table>
              <Table.Body>
                <Table.Row>
                  <Table.Cell><h4>Item Name</h4></Table.Cell>
                  <Table.Cell>
                    <Input
                      onChange={(e) => this.handleChange(e, {name: e.target.value})}
                      type='text'
                      defaultValue={name}
                      placeholder={'Item Name'}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><h4>Item Price</h4></Table.Cell>
                  <Table.Cell>
                    <Input
                      onChange={(e) => this.handleChange(e, {price: e.target.value})}
                      type='text'
                      defaultValue={price}
                      placeholder={'Item Price'}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><h4>Select Category</h4></Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      onChange={(e) => this.handleChange(e, {category: e.target.value})}
                      options={this.categoryOptions}
                      defaultValue={category}
                      placeholder={'Select Category'}
                      button
                      basic
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><h4>Item Image</h4></Table.Cell>
                  <Table.Cell>
                    <Input
                      onChange={(e) => this.handleChange(e, {image: e.target.value})}
                      type='file'
                      defaultValue={image}
                      placeholder={'Upload Image'}
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            <Button icon onClick={() => this.onAddItem()}>Add Item</Button>
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

export default AddItem;
