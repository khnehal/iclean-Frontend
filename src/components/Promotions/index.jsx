import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Segment, Header, Table, Button, Input } from 'semantic-ui-react';
import './promotions.css'

// import moment from 'moment';
import { GET_PROMOTIONS } from '../../store/actions';
import { promotionSelector } from '../../store/selectors';


class Promotions extends Component {

  static propTypes = {
    history: PropTypes.object,
    getPromotions: PropTypes.func,
    promotionsList: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  };

  componentDidMount() {
    this.props.getPromotions();
  }

  onDeletePromo = (promoId) => {
    // Call the delete api.
    console.log(`Ye promo(${promoId}) ko delete kar re jamaila!!`);
  }

  onGenerateCode = () => {
    // Call the generate api.
  }

  onSavePromo = () => {
    // Call the save promo api.
  }

  handleChange = (e, field) => {
    console.log(`Ye promo(${field}) ko delete kar re jamaila!!`);
    // this.setState(obj);
  }

  render() {
    const { promotionsList } = this.props;
    const tableHeaders = [
      'Date Created',
      'Promo Code',
      'Amount',
      'Start Date',
      'End Date',
      'Remove'
    ];
    return (
      <Segment className="promotions">
        <Header as='h1' textAlign='left'>
          Promotions
          <Header.Subheader>Below you can view promotion details.</Header.Subheader>
        </Header>

        <Segment basic className="promo-section">
          <Segment className="add-promo">
            <div className="promo-code">
              <h5>Use a generated promo code or type your own</h5>
              <Input
                onChange={(e) => this.handleChange(e, 'promo_code')}
                type='text'
                defaultValue={''}
                placeholder={'Alphanumeric Value'}
              />
              <Button className='generate-code ui button' color='green' onClick={() => this.onGenerateCode()}>GENERATE CODE</Button>
            </div>

            <div className="promo-value">
              <Input
                onChange={(e) => this.handleChange(e, 'promo_value_dollar')}
                label='$'
                labelPosition='left'
                type='text'
                defaultValue={''}
                placeholder={'Amount'}
              />
              OR
              <Input
                onChange={(e) => this.handleChange(e, 'promo_value_percent')}
                label='%'
                labelPosition='left'
                type='text'
                defaultValue={''}
                placeholder={'Percent'}
              />
              OFF
            </div>

            <div className="promo-dates">
              <Input
                onChange={(e) => this.handleChange(e, 'start_date')}
                label='Start Date'
                labelPosition='left'
                type='text'
                defaultValue={''}
                placeholder={'MM-DD-YYYY'}
              />

              <Input
                onChange={(e) => this.handleChange(e, 'end_date')}
                label='End Date'
                labelPosition='left'
                type='text'
                defaultValue={''}
                placeholder={'MM-DD-YYYY'}
              />
            </div>

            <hr/>

            <Button className='save-promo-btn ui button' color='green' onClick={() => this.onSavePromo()}>SAVE PROMO CODE</Button>
          </Segment>

          <Segment className="promo-listing-section">
            <Table striped celled>
              <Table.Header>
                <Table.Row>
                  {
                    tableHeaders.map((header, i) => {
                      return (
                        <Table.Cell key={i + 1}><b>{header}</b></Table.Cell>
                      );
                    })
                  }
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {(promotionsList && promotionsList.length > 0) && promotionsList.map((promo, i) => {
                  return (
                    <Table.Row key={i + 1}>
                      <Table.Cell>{promo.created_date}</Table.Cell>
                      <Table.Cell>{promo.code}</Table.Cell>
                      <Table.Cell>{`$${promo.dollar_discount}`}</Table.Cell>
                      <Table.Cell>{promo.start_date}</Table.Cell>
                      <Table.Cell>{promo.end_date}</Table.Cell>
                      <Table.Cell>
                        <Button
                          className='delete-item-btn'
                          basic circular
                          color={'red'}
                          size='medium'
                          icon='delete'
                          onClick={() => this.onDeletePromo(promo.id)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </Segment>
        </Segment>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  promotionsList: promotionSelector.getPromotionsList(state),
});

const mapDispatchToProps = (dispatch) => ({
  getPromotions: async () => {
    return dispatch(GET_PROMOTIONS());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Promotions));
