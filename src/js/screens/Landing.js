import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Notification from 'grommet/components/Notification';
import Section from 'grommet/components/Section';
import Button from 'grommet/components/Button';
import Paragraph from 'grommet/components/Paragraph';

import LandingInputs from '../components/LandingInputs';
import CommonFooter from '../components/CommonFooter';

import { pageLoaded } from './utils';

class Landing extends Component {
  componentDidMount() {
    pageLoaded('Landing');
  }

  componentWillUnmount() {}

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
        <Hero
          background={
            <Image src='/img/three-full.jpg' fit='cover' full={true} alt='CarBar landing image' />
          }
          backgroundColorIndex='dark'
          size='large'
        >
          <Section
            basis='1/2'
            align='end'
            alignContent='end'
            direction='row'
            pad='medium'
            justify='end'
          >
            <Button
              label='About Us'
              href='/about'
              primary={false}
              accent={false}
              critical={false}
              plain={false}
              className='landing-link-button about-us-nav-item'
            />
            <s className='padding-element-small' />
            <Button
              label='Vend With Us'
              target='_blank'
              href='https://docs.google.com/forms/d/e/1FAIpQLScOlMm36vzY1QP55Qc0aSpXZBUN2H355IxS7NHifvN7d7fbIg/viewform'
              primary={false}
              accent={false}
              critical={false}
              plain={false}
              className='landing-link-button vend-with-us-nav-item'
            />
            <s className='padding-element-small' />
            <Button
              label='Admin Login'
              href='/carBarAdmin'
              primary={false}
              accent={false}
              critical={false}
              plain={false}
              className='landing-link-button admin-login-nav-item'
            />
          </Section>
          <Box basis='3/4' align='start' pad='large' primary={true} full={true}>
            <Image src='/img/V1.png' size='medium' />
            <Paragraph size='large' className='landing-slogan'>
              Connecting craft and community
            </Paragraph>
            <Paragraph size='large' className='landing-slogan'>
              #localfirst #pdxpride
            </Paragraph>
            <LandingInputs />
          </Box>
        </Hero>
        <CommonFooter />
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
