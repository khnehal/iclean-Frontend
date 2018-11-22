import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { filter } from 'lodash';
import { GET_LIST_OF_ALL_ORDER_ITEMS, SAVE_ORDER_ITEM_DETAILS } from '../../store/actions';
import { orderSelector } from '../../store/selectors';

import { Segment, Input, Header, Grid, Button, Image, Label, TextArea, Modal, Card } from 'semantic-ui-react';

class AddOrderItems extends Component {

  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    orderItemsList: PropTypes.array,
    getListOfAllOrders: PropTypes.func,
    saveUpdatedItemData: PropTypes.func,
  };

  state = {
    open: false,
    additionalFees: '',
    greaterThan5: '',
    additionalFeeDescription: '',
    itemName: '',
    quantity: null,
  };

  componentDidMount() {
    this.props.getListOfAllOrders();
  }

  close = () => this.setState({ open: false });

  handleItemSelection = (name) => {
    this.setState({ open: true, itemName: name });
  };

  handleAdditionalFees = (e, { value }) => {
    this.setState({ additionalFees: value });
  };

  handleItemsCountValue = (e, { value }) => {
    this.setState({ greaterThan5: value });
  };

  handleAdditionalFeeDescription = (e, { value }) => {
    this.setState({ additionalFeeDescription: value });
  };

  saveOrderItemDetails = () => {
    const { additionalFees, greaterThan5, additionalFeeDescription, itemName, quantity } = this.state;
    const { saveUpdatedItemData, match } = this.props;

    const data = {
      "item_name": itemName,
      "quantity": greaterThan5 ? greaterThan5 : quantity,
      "additional_fee": additionalFees,
      "additional_fee_description": additionalFeeDescription,
    }
    saveUpdatedItemData(match.params.oid, data)
  };

  renderImagesBlock = (items) => {
    if (items && items.length > 0) {
      return (
        <Grid>
          {
            items.map((item, i) => {
              return (
                <Grid.Column mobile={8} tablet={8} computer={4} key={i + 1}>
                  <Image
                    size='small'
                    src={item.item_image}
                    onClick={() => this.handleItemSelection(item.item_name)}
                  />
                </Grid.Column>
              )
            })
          }
        </Grid>
      );
    }

    return null;
  };

  renderQuantityModal = () => {
    return (
      <div>
       <Modal
          open={this.state.open}
          onClose={this.close}
          closeIcon
        >
          <Modal.Header textAlign={'center'}>How many ?</Modal.Header>
          <Modal.Content>
            <p></p>
            <Card.Group centered itemsPerRow={5}>
              <Card raised centered description='1' onClick={() => this.setState({ quantity: 1 })} />
              <Card raised centered description='2' onClick={() => this.setState({ quantity: 2 })} />
              <Card raised centered description='3' onClick={() => this.setState({ quantity: 3 })} />
              <Card raised centered description='4' onClick={() => this.setState({ quantity: 4 })} />
              <Card raised centered description='5' onClick={() => this.setState({ quantity: 5 })} />
            </Card.Group>
            <Input type="number" value={this.state.greaterThan5} onChange={this.handleItemsCountValue} />
            <Button color="green"> Send </Button>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              No
            </Button>
            <Button
              onClick={this.close}
              positive
              labelPosition='right'
              icon='checkmark'
              content='Yes'
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  };

  render() {
    const { orderItemsList } = this.props;
    const dryCleaningItems = filter(orderItemsList, (obj) => { return obj.item_category === 'dry_cleaning' });
    const laundryItems = filter(orderItemsList, (obj) => { return obj.item_category === 'laundry' });
    const householdItems = filter(orderItemsList, (obj) => { return obj.item_category === 'household' });
    const fulffAndFoldItems = filter(orderItemsList, (obj) => { return obj.item_category === 'fluff_and_fold' });
    const dryCleanUpcharges = filter(orderItemsList, (obj) => { return obj.item_category === 'dry_clean_upcharges' });

    return (
      <Segment className="OrdersSection">
        <Segment.Group horizontal className="OrdersHeaderSection">
          <Segment className="OrdersTitle">
            <Header as='h1'> Orders </Header>
            <Header as='h2'> Orders details below </Header>
          </Segment>
        </Segment.Group>
        <Segment.Group horizontal className="OrdersHeaderSection">
          <Segment basic textAlign={'right'}>
            <Button color="green" onClick={this.saveOrderItemDetails} size='large'> Done </Button>
          </Segment>
        </Segment.Group>
        <Segment>
          <Grid>
            {
              (dryCleaningItems.length > 0) &&
                <Grid.Column mobile={16} tablet={8} computer={5}>
                  <h4> Dry Cleaning </h4>
                  {this.renderImagesBlock(dryCleaningItems)}
                </Grid.Column>
            }
            {
              (laundryItems.length > 0) &&
                <Grid.Column mobile={16} tablet={8} computer={5}>
                  <h4> Laundry </h4>
                  {this.renderImagesBlock(laundryItems)}
                </Grid.Column>
            }
            <Grid.Column mobile={16} tablet={8} computer={5}>
              {
                ((householdItems.length > 0) || (fulffAndFoldItems.length > 0) || (dryCleanUpcharges.length > 0)) &&
                  <Grid>
                    <Grid.Column mobile={16} tablet={16} computer={16}>
                      {
                        (householdItems.length > 0) &&
                        <Segment basic>
                          <h4> Households </h4>
                          {this.renderImagesBlock(householdItems)}
                        </Segment>
                      }
                      {
                        (fulffAndFoldItems.length > 0) &&
                        <Segment basic>
                          <h4> Full And Fold Price </h4>
                          {this.renderImagesBlock(fulffAndFoldItems)}
                        </Segment>
                      }
                      {
                        (dryCleanUpcharges.length > 0) &&
                        <Segment basic>
                          <h4> Dry Clean Upcharges </h4>
                          {this.renderImagesBlock(dryCleanUpcharges)}
                        </Segment>
                      }
                    </Grid.Column>
                  </Grid>
              }
              <Grid>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                  <h4>Additional Fees </h4>
                  <Input
                    labelPosition='right'
                    size='large'
                    type='number'
                    placeholder='Enter dollar amount'
                    value={this.state.additionalFees}
                    onChange={this.handleAdditionalFees}
                  >
                    <Label basic>$</Label>
                    <input />
                  </Input>
                  <Button color='green'> Add </Button>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                  <h4> Description </h4>
                  <TextArea
                    value={this.state.additionalFeeDescription}
                    onChange={this.handleAdditionalFeeDescription}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid>
        </Segment>
        {this.renderQuantityModal()}
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  orderItemsList: orderSelector.getOrderItemsList(state),
});

const mapDispatchToProps = (dispatch) => ({
  getListOfAllOrders: async () => {
    return dispatch(GET_LIST_OF_ALL_ORDER_ITEMS());
  },
  saveUpdatedItemData: async (orderId, data) => {
    return dispatch(SAVE_ORDER_ITEM_DETAILS(orderId, data));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddOrderItems));
