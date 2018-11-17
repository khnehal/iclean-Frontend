import React, { Component } from 'react';

import { Segment, Header, Input, Table, Dropdown, Button } from 'semantic-ui-react';

import './items.css'

class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        name: '',
        price: null,
        category: '',
        image: '',
      }
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

  handleChange = (e, key) => {
    const { data } = this.state;
    data[key] = e.target.value;
    this.setState({ data });
  }

  render() {
    const {
      name,
      price,
      category,
      image,
    } = this.state;

    const columnWidth = 4;
    return (
      <Segment className="add-item-wrapper">
        <Segment padded basic textAlign='center'>
          <Header as='h1' textAlign='left'>
            Add Item
            <Header.Subheader>Add New Item.</Header.Subheader>
          </Header>
        </Segment>

        <Segment basic textAlign='center' className="add-item-section">
          <Table collapsing>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={columnWidth}><b>Item Name</b></Table.Cell>
                <Table.Cell textAlign={'right'}>
                  <Input
                    onChange={(e) => this.handleChange(e, 'name')}
                    type='text'
                    defaultValue={name}
                    placeholder={'Item Name'}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={columnWidth}><b>Item Price</b></Table.Cell>
                <Table.Cell textAlign={'right'}>
                  <Input
                    onChange={(e) => this.handleChange(e, 'price')}
                    type='text'
                    defaultValue={price}
                    placeholder={'Item Price'}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={columnWidth}><b>Select Category</b></Table.Cell>
                <Table.Cell textAlign={'right'}>
                  <Dropdown
                    onChange={(e) => this.handleChange(e, 'category')}
                    options={this.categoryOptions}
                    defaultValue={category}
                    placeholder={'Select Category'}
                    button
                    basic
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={columnWidth}><b>Item Image</b></Table.Cell>
                <Table.Cell textAlign={'right'}>
                  <Input
                    onChange={(e) => this.handleChange(e, 'image')}
                    type='file'
                    defaultValue={image}
                    placeholder={'Upload Image'}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Button className='add-item-btn ui button' color='green' onClick={() => this.onAddItem()}>Add Item</Button>
        </Segment>
      </Segment>
    );
  }
}

export default AddItem;
