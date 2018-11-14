import React, { Component } from 'react';

import { Segment, Table, Button, Input, Icon, Label } from 'semantic-ui-react';
// import moment from 'moment';
import './promotions.css'


class Promotions extends Component {

  constructor() {
    super();
    this.state = {
      data: [
        {
          created_on: '08-08-2018',
          promo_code: 'YELP10',
          amount: '$20',
          start_date: '2018-08-08',
          end_date: '2018-08-31',
          id: 1,
        },
        {
          created_on: '08-08-2018',
          promo_code: 'LHEKH2',
          amount: '$30',
          start_date: '2018-08-08',
          end_date: '2018-08-31',
          id: 2,
        },
      ],
    };
  };

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
    const { data } = this.state;
    const tableHeaders = [
      'Date Created',
      'Promo Code',
      'Amount',
      'Start Date',
      'End Date',
      'Remove'
    ];
    return (
      <div className="promo-section">
        <Segment.Group horizontal className="promo-header-section">
          <Segment className="promo-title">
            <h2>Promotions</h2>
          </Segment>
        </Segment.Group>

        <Segment.Group horizontal>
          <Segment className="promo-sub-header">
              <h4>Below you can view promotion details.</h4>
          </Segment>
        </Segment.Group>

        <Segment.Group horizontal>
          <Segment className="add-promo">
            <div className="promo-code">
              <h4>Use a generated promo code or type your own</h4>
              <Input
                onChange={(e) => this.handleChange(e, 'promo_code')}
                type='text'
                defaultValue={''}
                placeholder={'Alphanumeric Value'}
              />
              <Button icon onClick={() => this.onGenerateCode()}>GENERATE CODE</Button>
            </div>

            <div className="promo-value">
              <Input
                onChange={(e) => this.handleChange(e, 'promo_value_dollar')}
                labelPosition='right'
                type='text'
                defaultValue={''}
                placeholder={'Amount'}
              >
                <Label basic>$</Label>
                <input />
                <Label basic>OFF</Label>
              </Input>
              OR
              <Input
                onChange={(e) => this.handleChange(e, 'promo_value_percent')}
                labelPosition='right'
                type='text'
                defaultValue={''}
                placeholder={'Percent'}
              >
                <Label basic>%</Label>
                <input />
                <Label basic>OFF</Label>
              </Input>
            </div>

            <div className="promo-dates">
              <Input
                onChange={(e) => this.handleChange(e, 'start_date')}
                labelPosition='right'
                type='text'
                defaultValue={''}
                placeholder={'MM-DD-YYYY'}
              >
                <Label basic>Start Date</Label>
                <input />
              </Input>

              <Input
                onChange={(e) => this.handleChange(e, 'end_date')}
                labelPosition='right'
                type='text'
                defaultValue={''}
                placeholder={'MM-DD-YYYY'}
              >
                <Label basic>End Date</Label>
                <input />
              </Input>
            </div>
            <hr/>
            <Button icon className={'save-promo'} onClick={() => this.onSavePromo()}>SAVE PROMO CODE</Button>
          </Segment>
        </Segment.Group>

        <div className="promo-listing-section">
          <Segment.Group horizontal>
            <Segment>
              <Table>
                <Table.Header>
                  <Table.Row>
                    {
                      tableHeaders.map((header, i) => {
                        return (
                          <Table.Cell key={i + 1}>{header}</Table.Cell>
                        );
                      })
                    }
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {(data && data.length > 0) && data.map((promo, i) => {
                    return (
                      <Table.Row key={i + 1}>
                        <Table.Cell>{promo.created_on}</Table.Cell>
                        <Table.Cell>{promo.promo_code}</Table.Cell>
                        <Table.Cell>{promo.amount}</Table.Cell>
                        <Table.Cell>{promo.start_date}</Table.Cell>
                        <Table.Cell>{promo.end_date}</Table.Cell>
                        <Table.Cell><Icon name='close' onClick={() => this.onDeletePromo(promo.id)} /></Table.Cell>
                      </Table.Row>
                    );
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


export default Promotions;
