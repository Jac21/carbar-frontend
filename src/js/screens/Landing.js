import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Heading from 'grommet/components/Heading';
import Notification from 'grommet/components/Notification';

import LandingInputs from '../components/LandingInputs';
import LandingInputButton from '../components/LandingSubmitButton';

import { pageLoaded } from './utils';

class Landing extends Component {
  componentDidMount() {
    pageLoaded('Landing');
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
      <Article primary={true} full={true}>
        <Hero background={<Image src='/img/three.jpg'
          fit='cover'
          full={true} />}
          backgroundColorIndex='dark'
          size='large'>
          <Box direction='row'
            justify='center'
            align='center'>
            <Box basis='1/2'
              align='end'
              pad='medium' />
            <Box basis='1/2'
              align='start'
              pad='medium'>
              <Heading margin='none'>
                CarBar
              </Heading>
              <LandingInputs />
              <LandingInputButton />
            </Box>
          </Box>
        </Hero>
        {errorNode}

      </Article>
    );
  }
}

Landing.defaultProps = {
  error: undefined,
  task: undefined
};

Landing.propTypes = {
  error: PropTypes.object
};

const select = state => ({ ...state.landing });

export default connect(select)(Landing);
