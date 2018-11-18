import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router';

import { Header, Segment, Grid, Button, Checkbox, TextArea, Loader } from 'semantic-ui-react';

import './wash.css';

class WashSettings extends Component {

  static propTypes = {
    data: PropTypes.object,
    isLoading: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {};
  };

  renderDryCleanDetails = () => {
    const { data } = this.props;
    const options = [ { name: 'Use Fabric Softner', isChecked: data && data.fabric_softner },
                      { name: 'Use Unscented / Hypoallergenic Detergent', isChecked: data && data.unscented_detergent},
                      { name: 'Cold Wash', isChecked: data && data.wash_cold},
                      { name: 'Warm Wash', isChecked: data && data.wash_warm},
                      { name: 'Hot Wash', isChecked: data && data.wash_hot} ];

    const dryOptions = [ { name: 'Low', isChecked: data && data.dry_low },
                    { name: 'Medium', isChecked: data && data.dry_medium },
                    { name: 'High', isChecked: data && data.dry_high },
                    { name: 'Hand Dry', isChecked: data && data.dry_hang_dry } ];

    const specialInstructions = data.special_instructions ? data.special_instructions : '';

    return (
      <div>
        <Segment basic textAlign='left'>
        {
          options.map((item, i) => {
            return (
              <div key={i + 1}>
                <Checkbox
                  disabled
                  label={<label><b>{item.name}</b></label>}
                  checked={item.isChecked}
                />
              </div>
            )
          })
        }
        <Header as={'h3'}> Dry Option </Header>
        {
          dryOptions.map((item, i) => {
            return (
              <div key={i + 1}>
                <Checkbox
                  disabled
                  label={<label><b>{item.name}</b></label>}
                  checked={item.isChecked}
                />
              </div>
            )
          })
        }
        <br /> <br />
        <TextArea disabled value={specialInstructions} placeholder={'Special pickup Instructions'} />
        </Segment>
      </div>
    );
  };

  renderLaundryDetails =  () =>{
    const { data } = this.props;
    const options = [ { name: 'Hypoallergenic', isChecked: false },
                      { name: 'Detergent', isChecked: false },
                      { name: 'On Hanger', isChecked: data && data.package_hanger },
                      { name: 'Boxed - add $1', isChecked: data && data.package_boxed } ];

    const starchOptions = [ { name: 'None', isChecked: data && data.starch_none },
                         { name: 'Light', isChecked: data && data.starch_light },
                         { name: 'Medium', isChecked: data && data.starch_medium },
                         { name: 'Heavy', isChecked: data && data.starch_heavy } ];

    return (
      <div>
        <Segment basic textAlign='left'>
          {
            options.map((item, i) => {
              return (
                <div key={i + 1}>
                  <Checkbox
                    disabled
                    label={<label><b>{item.name}</b></label>}
                    checked={item.isChecked}
                  />
                </div>
              )
            })
          }
          <Header as={'h3'}> Starch </Header>
          {
            starchOptions.map((item, i) => {
              return (
                <div key={i + 1}>
                  <Checkbox
                    disabled
                    label={<label><b> {item.name} </b></label>}
                    checked={item.isChecked}
                  />
                </div>
              )
            })
          }
          <br /> <br />
          <TextArea disabled value={''} placeholder={'Special drop off Instructions'} />
        </Segment>
      </div>
    );
  };


  render() {
    const { data } = this.props;

    if(data && Object.keys(data).length > 0) {
      return (
        <div>
          <Loader inverted>Loading</Loader>
          <Segment secondary className="WashSettings">
            <Grid padded>
              <Grid.Column mobile={16} tablet={16} computer={8}>
                <Header as='h1' textAlign='left'> Wash Setting </Header>
              </Grid.Column>
              <Grid.Column textAlign="right" mobile={16} tablet={16} computer={8}>
                <Button color="green" size="medium"> Export </Button>
              </Grid.Column>
            </Grid>
          </Segment>
          <Grid padded>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <Header as='h2' textAlign='center'> Dry Clean </Header>
              {this.renderDryCleanDetails()}
              <Segment basic>
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={8}>
              <Header as='h2' textAlign='center'> Laundry Shirts </Header>
              {this.renderLaundryDetails()}
              <Segment basic>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      );
    }

    return null;
  }
}

// const mapStateToProps = (state) => ({
//   getDriversList: DriversSelector.getDriversList(state),
// });

// const mapDispatchToProps = (dispatch) => ({
//   getDrivers: async () => {
//     return dispatch(GET_DRIVERS());
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Drivers));
export default WashSettings;
