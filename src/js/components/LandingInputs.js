import React, { Component } from 'react';

import Toast from 'grommet/components/Toast';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import CarIcon from 'grommet/components/icons/base/Car';

import { headers } from '../api/utils';

class LandingInputs extends Component {
  constructor() {
    super();
    this.state = {
      phoneInputValue: '', addressInputValue: '',
      showOkToast: false, showWarningToast: false,
      showErrorToast: false, normalizePhoneInput: true
    };
    this._onPhoneInputDOMChange = this._onPhoneInputDOMChange.bind(this);
    this._onAddressInputDOMChange = this._onAddressInputDOMChange.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  _onPhoneInputDOMChange(event) {
    this.setState({ phoneInputValue: event.target.value });
  }

  _onAddressInputDOMChange(event) {
    this.setState({ addressInputValue: event.target.value });
  }

  _onClick() {
    let phoneInputValue = this.state.phoneInputValue;
    const addressInputValue = this.state.addressInputValue;

    if (phoneInputValue === '' || addressInputValue === '') {
      this.setState({ showWarningToast: true });
      return;
    }

    if (this.state.normalizePhoneInput) {
      phoneInputValue = phoneInputValue.replace(/'/g, '').replace(/'/g, '').replace(/\(|\)|-/g, '');
    }

    fetch('https://carbar.herokuapp.com/api/users', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        PHONE_NUMBER: phoneInputValue,
        LOCATION: addressInputValue,
      })
    }).then(
      (response) => {
        if (response.status !== 200) {
          this.setState({ showWarningToast: true });
          console.log('Looks like there was a problem =(');
        } else if (response.status === 200) {
          this.setState({ showOkToast: true });
        }
      }
    )
      .catch((err) => {
        this.setState({ showErrorToast: true });
        console.log('Fetch Error :-S', err);
      });
  }

  render() {
    const { showOkToast, showWarningToast, showErrorToast } = this.state;
    let toastNode;
    if (showOkToast) {
      toastNode = (
        <Toast status='ok'
          onClose={() =>
            this.setState({ showOkToast: false })}>
          You're all set! Keep an eye on your phone for a text from us!
        </Toast>
      );
    } else if (showWarningToast) {
      toastNode = (
        <Toast status='warning'
          onClose={() =>
            this.setState({ showWarningToast: false })}>
          Please ensure both your phone number and address are entered correctly.
        </Toast>
      );
    } else if (showErrorToast) {
      toastNode = (
        <Toast status='critical'
          onClose={() =>
            this.setState({ showErrorToast: false })}>
          We've run into an error saving your information, we'll try our best to resolve it soon!
        </Toast>
      );
    }

    return (
      <div className='landing-inputs-wrapper'>
        {toastNode}
        <FormField>
          <TextInput id='phone-input'
            name='phone-input'
            value={this.state.phoneInputValue}
            placeHolder='Phone Number'
            onDOMChange={this._onPhoneInputDOMChange}
            onSelect={this._onSelect} />
        </FormField>
        <FormField>
          <TextInput id='address-input'
            name='address-input'
            value={this.state.addressInputValue}
            placeHolder='Address'
            onDOMChange={this._onAddressInputDOMChange}
            onSelect={this._onSelect} />
        </FormField>
        <Button icon={<CarIcon />}
          label='Get Connected'
          onClick={this._onClick}
          primary={true}
          secondary={false}
          accent={false}
          critical={false}
          plain={false} />
      </div>
    );
  }
}

export default LandingInputs;
