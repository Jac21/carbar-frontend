import React, { Component } from 'react';

import Button from 'grommet/components/Button';
import CarIcon from 'grommet/components/icons/base/Car';

class LandingInputs extends Component {
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    console.log('onClick');
  }

  render() {
    return (
      <div className='landing-button-wrapper'>
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
