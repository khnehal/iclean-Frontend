import React from 'react';
import PropTypes from 'prop-types';

import {
  Segment,
  Table,
  Menu,
  Icon,
} from 'semantic-ui-react';

const LandingContainer = (props) => {
  const {
    data,
    hasStatus,
    hasDateAndTime,
  } = props;

  return (
    <Segment>
      <Table>
        <Table.Body>
          {(data && data.length > 0) && data.map((item, i) => {
            return (
              <Table.Row key={i + 1}>
                <Table.Cell>{item.name}</Table.Cell>
                {hasStatus && <Table.Cell>Status - {item.hasStatus}</Table.Cell>}
                {hasDateAndTime && <Table.Cell>{item.dateTime}</Table.Cell>}
                <Table.Cell>
                  <Menu.Item as='a'>
                    <Icon name='arrow right' />
                  </Menu.Item>
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
  hasDateAndTime: PropTypes.bool,
};

export default LandingContainer;
