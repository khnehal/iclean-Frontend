import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Segment, Header, Table, Button, Input, Message } from 'semantic-ui-react';
import './promotions.css'

import moment from 'moment';
import {
  GET_PROMOTIONS,
  GET_PROMO_CODE,
  DELETE_PROMOTION,
  SAVE_PROMOTION,
  PROMOTION_SAVED,
  RELOAD_PROMOTIONS,
  PROMOTION_ERRORS,
} from '../../store/actions';
import { promotionSelector } from '../../store/selectors';


class Promotions extends Component {

  props: {
    history: PropTypes.object,
    getPromotions: PropTypes.func,
    promotionsList: PropTypes.array,
    generatePromoCode: PropTypes.func,
    generatedPromoCode: PropTypes.string,
    deletePromotion: PropTypes.func,
    savePromotion: PropTypes.func,
    // promotionDeleted: PropTypes.bool,
    promotionSaved: PropTypes.string,
    promotionErrors: PropTypes.array,
    reloadPromotions: PropTypes.bool,
    resetData: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {
        promoCode: '',
        dollarValue: '',
        percentValue: '',
        startDate: '',
        endDate: '',
      }
    };
  };

  componentDidMount() {
    this.props.getPromotions();
  }

  componentWillReceiveProps(nextProps) {
    const {
      generatedPromoCode,
      reloadPromotions,
      resetData,
      getPromotions,
      promotionErrors,
      promotionSaved,
    } = nextProps;
    if (generatedPromoCode) {
      const { data } = this.state;
      data.promoCode = generatedPromoCode;
      this.setState({ data });
    }

    if (reloadPromotions) {
      resetData(RELOAD_PROMOTIONS);
      getPromotions();
    }

    if (promotionSaved && !(promotionErrors && promotionErrors.length > 0)) {
      this.fadeOutMessage();
    }
  }

  fadeOutMessage = () => {
    const {
      resetData
    } = this.props;
    window.setTimeout(() => {
      resetData(PROMOTION_SAVED, '');
      resetData(PROMOTION_ERRORS, []);
    }, 3000);
  }

  onSavePromo = () => {
    const {
      promoCode,
      dollarValue,
      percentValue,
      startDate,
      endDate,
    } = this.state.data;

    let discountType = 'dollar_discount';
    if (!dollarValue && percentValue) {
      discountType = 'percentage_discount';
    }

    const data = {
      "code": promoCode,
      "discount_type": discountType,
      "dollar_discount": dollarValue,
      "percentage_discount": percentValue,
      "start_date": startDate && moment(startDate).format('YYYY-MM-DD'),
      "end_date": endDate && moment(endDate).format('YYYY-MM-DD'),
    }
    this.props.savePromotion(data);
  }

  handleChange = (e, { value, name }) => {
    const { data } = this.state;
    data[name] = value;
    this.setState({ data });
  }

  render() {
    const {
      generatePromoCode,
      promotionsList,
      deletePromotion,
      promotionSaved,
      promotionErrors,
     } = this.props;

    const {
      promoCode,
      dollarValue,
      percentValue,
      startDate,
      endDate,
    } = this.state.data;

    const tableHeaders = [
      'Date Created',
      'Promo Code',
      'Amount',
      'Start Date',
      'End Date',
      'Remove'
    ];

    const minDate = moment().format('YYYY-MM-DD');

    return (
      <Segment className="promotions">
        <Segment padded basic textAlign='center'>
          <Header as='h1' textAlign='left'> Promotions </Header>
          <Header as='h2' textAlign='left'>Below you can view promotion details.</Header>
        </Segment>

        <Segment basic className="promo-section">
          { promotionSaved &&
            <Message size={'large'} info>
              <Message.Header>{`${promotionSaved}`}</Message.Header>
              {
                (promotionErrors && promotionErrors.length > 0) &&
                <Message.List>
                  {
                    promotionErrors.map((error, i) => {
                      return <Message.Item key={ i + 1 }>{`${error}`}</Message.Item>;
                    })
                  }
                </Message.List>
              }
            </Message>
          }

          <Segment className="add-promo">
            <div className="promo-code">
              <h5>Use a generated promo code or type your own</h5>
              <Input
                onChange={this.handleChange}
                type='text'
                value={promoCode}
                placeholder={'Alphanumeric Value'}
                name={'promoCode'}
              />
              <Button className='generate-code ui button' color='green' onClick={() => generatePromoCode()}>GENERATE CODE</Button>
            </div>

            <div className="promo-value">
              <Input
                onChange={this.handleChange}
                label='$'
                labelPosition='left'
                type='number'
                value={dollarValue}
                placeholder={'Amount'}
                name={'dollarValue'}
              />
              OR
              <Input
                onChange={this.handleChange}
                label='%'
                labelPosition='left'
                type='number'
                value={percentValue}
                placeholder={'Percent'}
                name={'percentValue'}
              />
              OFF
            </div>

            <div className="promo-dates">
              <Input
                onChange={this.handleChange}
                label='Start Date'
                labelPosition='left'
                type='date'
                min={minDate}
                value={startDate}
                placeholder={'MM-DD-YYYY'}
                name={'startDate'}
              />

              <Input
                onChange={this.handleChange}
                label='End Date'
                labelPosition='left'
                type='date'
                min={minDate}
                value={endDate}
                placeholder={'MM-DD-YYYY'}
                name={'endDate'}
              />
            </div>

            <hr/>

            <Button className='save-promo-btn ui button' color='green' onClick={() => this.onSavePromo()}>SAVE PROMO CODE</Button>
          </Segment>
          <br/>
          <Segment className="promo-listing-section">
            { (promotionsList && promotionsList.length > 0) ?
              <Table striped celled textAlign={'center'}>
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
                  { promotionsList.map((promo, i) => {
                    return (
                      <Table.Row key={i + 1}>
                        <Table.Cell>{moment(promo.created_date).format('DD-MM-YYYY')}</Table.Cell>
                        <Table.Cell>{promo.code}</Table.Cell>
                        <Table.Cell>{`$${promo.dollar_discount}`}</Table.Cell>
                        <Table.Cell>{moment(promo.start_date).format('YYYY-MM-DD')}</Table.Cell>
                        <Table.Cell>{moment(promo.end_date).format('YYYY-MM-DD')}</Table.Cell>
                        <Table.Cell>
                          <Button
                            className='delete-item-btn'
                            basic circular
                            color={'red'}
                            size='medium'
                            icon='delete'
                            onClick={() => deletePromotion(promo.id)}
                          />
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table> : (<h4>No promotions to display.</h4>)
            }
          </Segment>
        </Segment>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  promotionsList: promotionSelector.getPromotionsList(state),
  generatedPromoCode: promotionSelector.getGeneratedPromoCode(state),
  // promotionDeleted: promotionSelector.promotionDeleted(state),
  promotionSaved: promotionSelector.promotionSaved(state),
  promotionErrors: promotionSelector.getPromotionErrors(state),
  reloadPromotions: promotionSelector.reloadPromotions(state),
});

const mapDispatchToProps = (dispatch) => ({
  getPromotions: async () => {
    return dispatch(GET_PROMOTIONS());
  },
  generatePromoCode:  async () => {
    return dispatch(GET_PROMO_CODE());
  },
  deletePromotion:  async (id) => {
    return dispatch(DELETE_PROMOTION(id));
  },
  resetData: async (type) => {
    return dispatch({ type, data: false });
  },
  savePromotion: async (data) => {
    return dispatch(SAVE_PROMOTION(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Promotions));
