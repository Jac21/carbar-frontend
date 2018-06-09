import React, { Component } from 'react';

import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';

class LandingInputs extends Component {
  constructor() {
    super();
    this._onDOMChange = this._onDOMChange.bind(this);
    this._onSelect = this._onSelect.bind(this);
  }

  _onDOMChange() {
    console.log('DOMChange');
  }

  _onSelect() {
    console.log('Select');
  }

  render() {
    return (
      <div className='landing-inputs-wrapper'>
        <FormField>
          <TextInput id='phone-input'
            name='phone-input'
            value=''
            placeHolder='Phone Number'
            onDOMChange={this._onDOMChange}
            onSelect={this._onSelect} />
        </FormField>
        <FormField>
          <TextInput id='address-input'
            name='address-input'
            value=''
            placeHolder='Address'
            onDOMChange={this._onDOMChange}
            onSelect={this._onSelect} />
        </FormField>
      </div>
    );
  }
}

export default LandingInputs;
