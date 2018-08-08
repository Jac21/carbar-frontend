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
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Toast from 'grommet/components/Toast';

import CommonFooter from '../components/CommonFooter';
import { pageLoaded } from './utils';
import { headers } from '../api/utils';

class CarBarAdmin extends Component {
  constructor() {
    super();
    this.state = {
      addressInputValue: '', showOkToast: false, showWarningToast: false,
      showErrorToast: false,
    };
    this._onClick = this._onClick.bind(this);
    this._onAddressInputDOMChange = this._onAddressInputDOMChange.bind(this);
  }

  componentDidMount() {
    pageLoaded('CarBarAdmin');
  }

  componentWillUnmount() {
  }

  _onAddressInputDOMChange(event) {
    this.setState({ addressInputValue: event.target.value });
  }


  _onClick() {
    fetch('https://carbar.herokuapp.com/api/send', {
      method: 'GET',
      headers: headers()
    }).then(
      (response) => {
        if (response.status === 200) {
          this.setState({ showOkToast: true });
        } else if (response.status !== 200) {
          this.setState({ showWarningToast: true });
        }
      }
    )
      .catch((err) => {
        this.setState({ showErrorToast: true });
        console.log('Fetch Error :-S', err);
      });
  }

  render() {
    const { error } = this.props;
    const { showOkToast, showWarningToast, showErrorToast } = this.state;
    let toastNode;
    if (showOkToast) {
      toastNode = (
        <Toast status='ok'
          onClose={() =>
            this.setState({ showOkToast: false })}>
          Texts sent! <span role='img' aria-label='confetti'>🎊</span>
        </Toast>
      );
    } else if (showWarningToast) {
      toastNode = (
        <Toast status='warning'
          onClose={() =>
            this.setState({ showWarningToast: false })}>
          Unable to send texts at this moment <span role='img' aria-label='sad-face'>😢</span>
        </Toast>
      );
    } else if (showErrorToast) {
      toastNode = (
        <Toast status='critical'
          onClose={() =>
            this.setState({ showErrorToast: false })}>
          Server error when attempting to send messages, investigate logs to ascertain issue.
        </Toast>
      );
    }

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
        {toastNode}
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
          <Section basis='1/2'
            justify='center'
            align='center'
            wrap={true}
            pad='medium'
            margin='small'
            colorIndex='light-2'>
            <div className='carbar-admin-inputs'>
              <FormField>
                <TextInput id='address-input'
                  name='address-input'
                  value={this.state.addressInputValue}
                  placeHolder='Event Address'
                  onDOMChange={this._onAddressInputDOMChange}
                  onSelect={this._onSelect} />
              </FormField>
              <Button
                label='Get this party started 🎉'
                onClick={this._onClick}
                primary={true}
                secondary={false}
                accent={false}
                critical={false}
                plain={false} />
            </div>
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
