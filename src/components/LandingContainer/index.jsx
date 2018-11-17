import React from 'react';
// import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Segment,
  Table,
  Icon,
} from 'semantic-ui-react';

import './landingStyles.css';

const LandingContainer = (props) => {
  const {
    data,
    history,
    hasStatus,
    redirectTo,
    hasDateAndTime,
  } = props;

  const handleRedirection = () => {
    console.log('historyrrr', history, redirectTo);
    if (redirectTo) {
      history.push(redirectTo);
    }
  };

  return (
    <Segment className="landing-container">
      <Table padded selectable>
        <Table.Body>
          {(data && data.length > 0) && data.map((item, i) => {
            return (
              <Table.Row key={i + 1} onClick={handleRedirection}>
                <Table.Cell>{item.name}</Table.Cell>
                {hasStatus && <Table.Cell>Status - {item.hasStatus}</Table.Cell>}
                {hasDateAndTime && <Table.Cell>{item.dateTime}</Table.Cell>}
                <Table.Cell textAlign='right'>
                  <Icon name='arrow right' />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Segment>
  )
};

LandingContainer.propTypes = {
  data: PropTypes.array,
  hasStatus: PropTypes.true,
  redirectTo: PropTypes.string,
  hasDateAndTime: PropTypes.bool,
  history: PropTypes.object,
};

LandingContainer.defaultProps = {
  hasStatus: false,
  hasDateAndTime: false,
};

export default LandingContainer;
