import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Heading from 'grommet/components/Heading';
import Notification from 'grommet/components/Notification';
import Section from 'grommet/components/Section';
import Button from 'grommet/components/Button';

import LandingInputs from '../components/LandingInputs';

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
        <Hero background={<Image src='/img/three-full.jpg'
          fit='cover'
          full={true} />}
          backgroundColorIndex='dark'
          size='large'>
          <Section basis='1/2'
            align='end'
            alignContent='end'
            direction='row'
            pad='medium'
            justify='end'>
            <Button label='Vend With Us'
              href='/vendorsignup'
              primary={false}
              accent={false}
              critical={false}
              plain={false} />
            <s />
            <Button label='Vendor Login'
              href='/admin'
              primary={false}
              accent={false}
              critical={false}
              plain={false} />
          </Section>
          <Box basis='1/2'
            align='start'
            pad='medium' />
          <Box basis='1/2'
            align='start'
            pad='medium'>
            <Image src='/img/V1.png'
              size='medium' />
            <LandingInputs />
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
