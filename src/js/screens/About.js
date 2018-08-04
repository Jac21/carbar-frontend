import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Article from 'grommet/components/Article';
import Paragraph from 'grommet/components/Paragraph';
import Headline from 'grommet/components/Headline';
import Notification from 'grommet/components/Notification';
import Section from 'grommet/components/Section';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import CommonFooter from '../components/CommonFooter';
import { pageLoaded } from './utils';

class About extends Component {
  componentDidMount() {
    pageLoaded('About');
  }

  componentWillUnmount() { }

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
        <Article scrollStep={true} controls={true}>
          <Section pad='large' justify='center' align='center' full='vertical'>
            <Headline margin='none'>About Us</Headline>
            <Paragraph>
              Natasha Torres and her wife Himalaya Rao founded
              CarBar in 2017. CarBar started as a nice way to catch up with
              friends after school. The two soon realized that they could bring
              a new face to how people party.
            </Paragraph>
          </Section>
          <Section
            pad='large'
            justify='center'
            align='center'
            full='vertical'
            colorIndex='grey-4'
          >
            <Headline margin='none'>How CarBar Works</Headline>
            <Paragraph>
              CarBar is a marketing service that takes products from local
              wineries, breweries, and cider houses, and sets up pop-up events
              to showcase these products to new market segments. After the
              pop-up event, CarBar gives vendors data analytics on things like
              market demand, customer preferences, and price elasticity for
              their specific products.
            </Paragraph>
            <Paragraph>
              <Paragraph>
                To enjoy the libations:<br />
                1. Sign-up for text or email alerts<br />
                2. Attend a CarBar event near you<br />
                3. Taste local products and be the popular one in your friend
                group, for once!<br />
              </Paragraph>
              <Paragraph>
                To be a featured vendor:<br />
                1. Fill out an{' '}
                <a
                  href='https://docs.google.com/forms/d/e/1FAIpQLScOlMm36vzY1QP55Qc0aSpXZBUN2H355IxS7NHifvN7d7fbIg/viewform'
                  rel='noopener noreferrer'
                >
                  interest form.
                </a>
                <br />
                2. Two cool ladies will follow up with you within a week.<br />
              </Paragraph>
              <Paragraph>
                To have CarBar at your next event:<br />
                1. Fill out an{' '}
                <a
                  href='https://docs.google.com/forms/d/e/1FAIpQLScOlMm36vzY1QP55Qc0aSpXZBUN2H355IxS7NHifvN7d7fbIg/viewform'
                  rel='noopener noreferrer'
                >
                  interest form.
                </a>
                <br />
                2. Two cool ladies will follow up with you within a week.<br />
              </Paragraph>
            </Paragraph>
          </Section>
          <Section pad='large' justify='center' align='center' full='vertical'>
            <Headline margin='none'>Join the Movement</Headline>
            <Paragraph>
              - Planned events -
              <List selectable={true}>
                <ListItem justify='between' separator='horizontal'>
                  <span>August 11, 2018</span>
                  <span className='secondary'>Lake Oswego</span>
                </ListItem>
                <ListItem justify='between'>
                  <span>September 2018</span>
                  <span className='secondary'>Portland</span>
                </ListItem>
                <ListItem justify='between'>
                  <span>October 2018</span>
                  <span className='secondary'>Salem</span>
                </ListItem>
              </List>
            </Paragraph>
          </Section>
          <Section pad='large'
            justify='center'
            align='center'
            full='vertical'>
            <Headline margin='none'>
              Interested In Having CarBar Come To You?
            </Headline>
            <Paragraph>
              Click{' '}
              <a
                href='https://docs.google.com/forms/d/e/1FAIpQLScOlMm36vzY1QP55Qc0aSpXZBUN2H355IxS7NHifvN7d7fbIg/viewform'
                target='_blank'
                rel='noopener noreferrer'
              >
                here{' '}
              </a>{' '}
              to fill out our survey!
            </Paragraph>
          </Section>
          <Section pad='large' justify='center' align='center' full='vertical'>
            <Headline margin='none'>
              Want To Be A Featured Vendor At A CarBar Event?
            </Headline>
            <Paragraph>
              Contact us directly, or fill out{' '}
              <a
                href='https://docs.google.com/forms/d/e/1FAIpQLScOlMm36vzY1QP55Qc0aSpXZBUN2H355IxS7NHifvN7d7fbIg/viewform'
                target='_blank'
                rel='noopener noreferrer'
              >
                this survey{' '}
              </a>{' '}
              so we can help you even quicker!
            </Paragraph>
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
