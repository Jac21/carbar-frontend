import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import Menu from 'grommet/components/Menu';
import Actions from 'grommet/components/icons/base/Action';
import Anchor from 'grommet/components/Anchor';
import Notification from 'grommet/components/Notification';
import Distribution from 'grommet/components/Distribution';
import Section from 'grommet/components/Section';

import CommonFooter from '../components/CommonFooter';
import { pageLoaded } from './utils';

class AdminPanel extends Component {
  componentDidMount() {
    pageLoaded('AdminPanel');
  }

  componentWillUnmount() {
  }

  render() {
    const { error } = this.props;

    let errorNode;
    if (error) {
      errorNode = (
        <Notification
          status='critical'
          size='large'
          state={error.message}
          message='An unexpected error happened, please try again later'
        />
      );
    }

    return (
      <div>
        <Article primary={true} full={true}>
          <Header fixed={true}
            float={false}
            size='xlarge'
            splash={false}>
            <Title>
              Vendor Administration
            </Title>
            <Box flex={true}
              justify='end'
              direction='row'
              responsive={false}>
              <Search inline={true}
                fill={true}
                size='medium'
                placeHolder='Search'
                dropAlign={{ right: 'right' }} />
              <Menu icon={<Actions />}
                dropAlign={{ right: 'right' }}>
                <Anchor href='#'
                  className='active'>
                  Events
                </Anchor>
                <Anchor href='#'>
                  Inventory
                </Anchor>
                <Anchor href='#'>
                  Statistics
                </Anchor>
              </Menu>
            </Box>
          </Header>
          <Section basis='1/2'>
            <Title>Inventory and adjustments</Title>
            <Distribution
              series={[{ label: 'Sold', value: 40, colorIndex: 'graph-1' },
              { label: 'In-Stock', value: 30, colorIndex: 'accent-2' },
              { label: 'Back-Ordered', value: 20, colorIndex: 'unset' },
              { label: 'Receiving', value: 10, colorIndex: 'graph-1' }]}
            />
          </Section>
          {errorNode}

        </Article>
        <CommonFooter />
      </div>
    );
  }
}

AdminPanel.defaultProps = {
  error: undefined,
  task: undefined
};

AdminPanel.propTypes = {
  error: PropTypes.object
};

const select = state => ({ ...state.adminPanel });

export default connect(select)(AdminPanel);
