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
import Section from 'grommet/components/Section';
import Button from 'grommet/components/Button';

import CommonFooter from '../components/CommonFooter';
import { pageLoaded } from './utils';

class CarBarAdmin extends Component {
  constructor() {
    super();
    this.state = {
    };
    this._onClick = this._onClick.bind(this);
  }
  componentDidMount() {
    pageLoaded('CarBarAdmin');
  }

  componentWillUnmount() {
  }

  _onClick() { console.log('Clicked!'); }

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
              CarBar Administration
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
            <Button
              label='Get this party started 🎉'
              onClick={this._onClick}
              primary={true}
              secondary={false}
              accent={false}
              critical={false}
              plain={false} />
          </Section>
          {errorNode}

        </Article>
        <CommonFooter />
      </div>
    );
  }
}

CarBarAdmin.defaultProps = {
  error: undefined,
  task: undefined
};

CarBarAdmin.propTypes = {
  error: PropTypes.object
};

const select = state => ({ ...state.carBarAdmin });

export default connect(select)(CarBarAdmin);
