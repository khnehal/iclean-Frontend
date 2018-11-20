import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Segment, Header, Input, Table, Dropdown, Button } from 'semantic-ui-react';
import './items.css'

import DisplayMessage from '../DisplayMessage/DisplayMessage';
import {
  GET_CATEGORIES,
  SAVE_ITEM,
} from '../../store/actions';
import { itemSelector } from '../../store/selectors';


class AddItem extends Component {

  props: {
    getCategories: PropTypes.func,
    categoriesList: PropTypes.array,
    itemSaved: PropTypes.string,
    itemErrors: PropTypes.array,
    saveItem: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: 'Kioshima',
        price: '10',
        category: 'dry_cleaning',
        image: '',
      },
      imageFile: null,
      categoryOptions: [],
    };
  };

  componentDidMount() {
    this.props.getCategories();
  }

  componentWillReceiveProps(nextProps) {
    const { categoriesList } = nextProps;
    if (categoriesList && categoriesList.length > 0) {
      const { data } = this.state;
      const categoryOptions = [];
      categoriesList.map((category) => {
        return categoryOptions.push({
          key: category.value,
          value: category.value,
          text: category.text,
        });
      });

      data.category = categoryOptions[0].value;
      this.setState({ categoryOptions, data });
    }
  }

  onAddItem = () => {
    const {
      name,
      price,
      category,
    } = this.state.data;

    const {
      imageFile,
    } = this.state;

    const data = {
      "item_name": name,
      "price": price,
      "item_category": category,
      "item_image": (imageFile && imageFile.files[0]) || '',
    }
    this.props.saveItem(data);
  }

  handleChange = (e, { value, name }) => {
    const { data } = this.state;
    if (name === 'image') {
      this.setState({ imageFile: e.target });
    } else {
      data[name] = value;
      this.setState({ data });
    }
  }

  render() {
    const {
      name,
      price,
      category,
      image,
    } = this.state.data;

    const {
      itemSaved,
      itemErrors,
    } = this.props;

    const {
      categoryOptions
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
          <DisplayMessage message={itemSaved} errors={itemErrors} />

          <Table collapsing>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={columnWidth}><b>Item Name</b></Table.Cell>
                <Table.Cell textAlign={'right'}>
                  <Input
                    onChange={this.handleChange}
                    type='text'
                    defaultValue={name}
                    placeholder={'Item Name'}
                    name={'name'}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={columnWidth}><b>Item Price</b></Table.Cell>
                <Table.Cell textAlign={'right'}>
                  <Input
                    onChange={this.handleChange}
                    type='number'
                    step={0.01}
                    value={price}
                    placeholder={'Item Price'}
                    name={'price'}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={columnWidth}><b>Select Category</b></Table.Cell>
                <Table.Cell textAlign={'right'}>
                  <Dropdown
                    onChange={this.handleChange}
                    options={categoryOptions}
                    value={category}
                    placeholder={'Select Category'}
                    selection
                    name={'category'}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={columnWidth}><b>Item Image</b></Table.Cell>
                <Table.Cell textAlign={'right'}>
                  <Input
                    onChange={this.handleChange}
                    type='file'
                    defaultValue={image}
                    placeholder={'Upload Image'}
                    name={'image'}
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


const mapStateToProps = (state) => ({
  categoriesList: itemSelector.getCategoriesList(state),
  itemSaved: itemSelector.itemSaved(state),
  itemErrors: itemSelector.getItemErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: async () => {
    return dispatch(GET_CATEGORIES());
  },
  saveItem: async (data) => {
    return dispatch(SAVE_ITEM(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddItem));
