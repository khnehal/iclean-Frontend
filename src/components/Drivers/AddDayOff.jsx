import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Segment,
  Table,
  Input,
  Header,
  Button,
} from 'semantic-ui-react';
import './style.css';

import moment from 'moment';
import DisplayMessage from '../DisplayMessage/DisplayMessage';
import {
  SAVE_DAYOFF,
  RELOAD_DAYOFFS,
  GET_DAYOFFS,
  DELETE_DAYOFF,
} from '../../store/actions';
import { driverSelector } from '../../store/selectors';

class AddDayOff extends Component {

  static propTypes = {
    dayoffSaved: PropTypes.string,
    dayoffErrors: PropTypes.array,
    dayoffsList: PropTypes.array,
    reloadDayoffs: PropTypes.bool,
    getDayoffs: PropTypes.func,
    saveDayoff: PropTypes.func,
    deleteDayoff: PropTypes.func,
    resetData: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      date: '',
    };
  };

  componentDidMount() {
    this.props.getDayoffs();
  }

  componentWillReceiveProps(nextProps) {
    const {
      reloadDayoffs,
      resetData,
      getDayoffs,
    } = nextProps;

    if (reloadDayoffs) {
      resetData(RELOAD_DAYOFFS);
      getDayoffs();
    }
  }

  onSaveDayoff = () => {
    this.props.saveDayoff({ day_off_date: this.state.date });
  }

  handleChange = (e, { value }) => {
    this.setState({ date: value });
  };

  renderDateTable = () => {
    const { date } = this.state;
    const minDate = moment().format('YYYY-MM-DD');

    return (
      <Table striped collapsing className={'driverDate'}>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={8} verticalAlign='middle'><b>Date: </b></Table.Cell>
            <Table.Cell width={8}>
              <Input
                type={'date'}
                value={date}
                min={minDate}
                onChange={this.handleChange}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  };

  renderDayOffsTable = () => {
    const { dayoffsList, deleteDayoff } = this.props;

    return (
      <Segment basic textAlign='center'>
        { (dayoffsList && dayoffsList.length > 0) ?
          <Table striped celled collapsing className={'driverDayOffDate'}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={4}>Day Off Date</Table.HeaderCell>
                <Table.HeaderCell width={4}>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { dayoffsList.map((dayoff, i) => {
                return (
                  <Table.Row key={i + 1}>
                    <Table.Cell width={4}> { dayoff.day_off_date } </Table.Cell>
                    <Table.Cell width={4}>
                      <Button
                        basic
                        circular
                        color={'red'}
                        size='medium'
                        icon='delete'
                        onClick={() => deleteDayoff(dayoff.id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                )
                })
              }
            </Table.Body>
          </Table> : (<h4>No dayoffs to display.</h4>)
        }
      </Segment>
    );
  };

  render() {
    const { dayoffSaved, dayoffErrors } = this.props;

    return (
      <Segment className="Driver">
        <Segment padded basic>
          <Header as='h1' textAlign='left'> Add Day Off </Header>
          <Button floated='right' color='green' onClick={() => this.onSaveDayoff()}> Done </Button>
        </Segment>
        <Segment basic textAlign='center'>
          <DisplayMessage message={dayoffSaved} errors={dayoffErrors} />

          {this.renderDateTable()}
        </Segment>
        <hr/>
        <Segment basic textAlign='center'>
          <Header as='h2' textAlign='center'>Delivery (Pickup / Dropoff) has been disabled for the following days.</Header>
        </Segment>
        <Segment basic textAlign='center'>
          {this.renderDayOffsTable()}
        </Segment>
      </Segment>
    );
  }
}


const mapStateToProps = (state) => ({
  dayoffSaved: driverSelector.dayoffSaved(state),
  dayoffErrors: driverSelector.getDayoffErrors(state),
  dayoffsList: driverSelector.getDayoffsList(state),
  reloadDayoffs: driverSelector.reloadDayoffs(state),
});

const mapDispatchToProps = (dispatch) => ({
  getDayoffs: async () => {
    return dispatch(GET_DAYOFFS());
  },
  saveDayoff: async (data) => {
    return dispatch(SAVE_DAYOFF(data));
  },
  deleteDayoff:  async (id) => {
    return dispatch(DELETE_DAYOFF(id));
  },
  resetData: async (type, data) => {
    return dispatch({ type, data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddDayOff));
