import React, { Component } from 'react';

import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Menu from 'grommet/components/Menu';
import CarIcon from 'grommet/components/icons/base/Car';

class CommonFooter extends Component {
  render() {
    return (
      <Footer justify='between'>
        <Title>
          <s />
          <CarIcon />
          CarBar
        </Title>
        <Box direction='row'
          align='center'
          pad={{ between: 'medium' }}>
          <Paragraph margin='none'>
            © 2018 CarBar Labs
          </Paragraph>
          <Menu direction='row'
            size='small'
            dropAlign={{ right: 'right' }}>
            <Anchor href='/'>
              Home
            </Anchor>
            <Anchor href='#'>
              Contact
            </Anchor>
            <Anchor href='https://github.com/Jac21/carbar-frontend'>
              About
            </Anchor>
          </Menu>
        </Box>
      </Footer>
    );
  }
}

export default CommonFooter;
