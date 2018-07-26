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

class About extends Component {
  componentDidMount() {
    pageLoaded('About');
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
              About Us
            </Title>
          </Header>
          <Section basis='1/2'>
            <Title>About Us</Title>
          </Section>
          {errorNode}

        </Article>
        <CommonFooter />
      </div>
    );
  }
}

About.defaultProps = {
  error: undefined,
  task: undefined
};

About.propTypes = {
  error: PropTypes.object
};

const select = state => ({ ...state.aboutUs });

export default connect(select)(About);
