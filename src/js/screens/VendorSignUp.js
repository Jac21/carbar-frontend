import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Notification from 'grommet/components/Notification';
import Section from 'grommet/components/Section';

import CommonFooter from '../components/CommonFooter';
import { pageLoaded } from './utils';

class VendorSignUp extends Component {
  componentDidMount() {
    pageLoaded('VendorSignUp');
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
              Vendor Sign-Up
            </Title>
          </Header>
          <Section basis='1/2'>
            <Title>Questions</Title>
          </Section>
          {errorNode}

        </Article>
        <CommonFooter />
      </div>
    );
  }
}

VendorSignUp.defaultProps = {
  error: undefined,
  task: undefined
};

VendorSignUp.propTypes = {
  error: PropTypes.object
};

const select = state => ({ ...state.vendorSignUp });

export default connect(select)(VendorSignUp);
