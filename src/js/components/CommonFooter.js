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
            © 2016 CarBar Labs
          </Paragraph>
          <Menu direction='row'
            size='small'
            dropAlign={{ right: 'right' }}>
            <Anchor href='/landing'>
              Home
            </Anchor>
            <Anchor href='#'>
              Support
            </Anchor>
            <Anchor href='#'>
              Contact
            </Anchor>
            <Anchor href='#'>
              About
            </Anchor>
          </Menu>
        </Box>
      </Footer>
    );
  }
}

export default CommonFooter;
