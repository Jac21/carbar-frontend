import React, { Component } from 'react';

import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import CarIcon from 'grommet/components/icons/base/Car';

import { headers } from '../api/utils';

class LandingInputs extends Component {
  constructor() {
    super();
    this.state = { phoneInputValue: '', addressInputValue: '' };
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
    fetch('http://localhost:3005/users', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        PHONE_NUMBER: this.state.phoneInputValue,
        LOCATION: this.state.addressInputValue,
      })
    });
  }

  render() {
    return (
      <div className='landing-inputs-wrapper'>
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
