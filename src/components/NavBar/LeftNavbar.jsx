import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import { Container, Sidebar, Segment, Button, Menu, Image, Icon, Header, Accordion } from 'semantic-ui-react'; //eslint-disable-line

class LeftNavbar extends Component {

    constructor() {
        super();
        this.state = {
            activeIndex: 0
        };
    };

    handleClick = (e, titleProps) => {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;

        return (
            <Sidebar
                as={Menu}
                icon='labeled'
                vertical
                visible={true}
                className={'SidebarMenu'}
            >
              <Accordion>
                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                  <Menu.Item as={NavLink} to={'/orders/waitingOrders/'}>
                    <Button icon labelPosition='left'>
                        <span><Image src={'/imgs/order_icon.png'} className="NavbarIcons" />
                        Orders</span>
                    </Button>
                  </Menu.Item>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                    <Menu.Item as={NavLink} to={'/orders/waitingOrders/'}>
                        <Button icon labelPosition='left'>
                            <Icon name='arrow right' />
                            Waiting for Cleaning
                        </Button>
                    </Menu.Item>
                    <Menu.Item as={NavLink} to={'/orders/cleaning/'}>
                        <Button icon labelPosition='left'>
                            <Icon name='arrow right' />
                            Cleaning now
                        </Button>
                    </Menu.Item>
                    <Menu.Item as={NavLink} to={'/orders/all/'}>
                        <Button icon labelPosition='left'>
                            <Icon name='arrow right' />
                            All Customers
                        </Button>
                    </Menu.Item>
                </Accordion.Content>

                <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                    <Menu.Item as={NavLink} to={'/drivers/driversList/'}>
                        <Button icon labelPosition='left'>
                            <span><Image src={'/imgs/drivers_icon.png'} className="NavbarIcons" />
                            Drivers</span>
                        </Button>
                    </Menu.Item>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                    <Menu.Item as={NavLink} to={'/drivers/driversList/'}>
                        <Button icon labelPosition='left'>
                            <Icon name='arrow right' />
                            Drivers
                        </Button>
                    </Menu.Item>
                    <Menu.Item as={NavLink} to={'/drivers/areas/'}>
                        <Button icon labelPosition='left'>
                            <Icon name='arrow right' />
                            Drivers Areas
                        </Button>
                    </Menu.Item>
                    <Menu.Item as={NavLink} to={'/drivers/addDrivers/'}>
                        <Button icon labelPosition='left'>
                            <Icon name='arrow right' />
                            Add a Driver
                        </Button>
                    </Menu.Item>
                    <Menu.Item as={NavLink} to={'/drivers/addDayOff/'}>
                        <Button icon labelPosition='left'>
                            <Icon name='arrow right' />
                            Add a Day Off
                        </Button>
                    </Menu.Item>
                </Accordion.Content>

                <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                    <Menu.Item as={NavLink} to={'/customers/'}>
                        <Button icon labelPosition='left'>
                            <span><Image src={'/imgs/customers_icon.png'} className="NavbarIcons" />
                            Customers</span>
                        </Button>
                    </Menu.Item>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                    <Menu.Item as={NavLink} to={'/notifications/'}>
                        <Button icon labelPosition='left'>
                            <Icon name='arrow right' />
                            Notifications
                        </Button>
                    </Menu.Item>
                    <Menu.Item as={NavLink} to={'/customers/'}>
                        <Button icon labelPosition='left'>
                            <Icon name='arrow right' />
                            Customers List
                        </Button>
                    </Menu.Item>
                </Accordion.Content>

                <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
                    <Menu.Item as={NavLink} to={'/promotions/'}>
                        <Button icon labelPosition='left'>
                            <span><Image src={'/imgs/promotions_icon.png'} className="NavbarIcons" />
                            Promotions</span>
                        </Button>
                    </Menu.Item>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 3}>
                    <Menu.Item as={NavLink} to={'/promotions/'}>
                        <Button icon labelPosition='left'>
                            <Icon name='arrow right' />
                            Promotions
                        </Button>
                    </Menu.Item>
                </Accordion.Content>

                <Accordion.Title active={activeIndex === 4} index={4} onClick={this.handleClick}>
                    <Menu.Item as={NavLink} to={'/items/price-list/'}>
                        <Button icon labelPosition='left'>
                            <span><Image src={'/imgs/items_icon.png'} className="NavbarIcons" />
                            Items</span>
                        </Button>
                    </Menu.Item>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 4}>
                    <Menu.Item as={NavLink} to={'/items/price-list/'}>
                        <Button icon labelPosition='left'>
                            <Icon name='arrow right' />
                            Items
                        </Button>
                    </Menu.Item>
                </Accordion.Content>
              </Accordion>

            </Sidebar>
        );
    }

}

export default LeftNavbar;
