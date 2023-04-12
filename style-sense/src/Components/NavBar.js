import React from 'react';
import { View, Card, Flex, Menu, MenuItem, MenuButton } from '@aws-amplify/ui-react'
import '../css/Shared.css'

function NavBar(props) {

  const profileStyle = {
    color: '#F0F6F6',
    borderRadius: '50%',
    border: '1px solid #F0F6F6',
    backgroundColor: '#2D3142',
    width: '3rem',
    height: '3rem',
    marginRight: '3rem',
  }

  const viewStyle = {
    zIndex: '99',
  }

  const menuStyle = {
    border: '1px solid #22223b',
    borderRadius: '5px'
  }

  return (
    <View
      position="fixed"
      height="10%"
      top="0"
      width="100%"
      style = {viewStyle}
    >
      <Flex
        height="100%"
        width="100%"
        direction='row'
        gap='0rem'
      >
        <Card
            height="100%"
            width="calc(100% / 3)"
            className='background'
          >
            <Flex
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <h3
              className='navHeader'>
                StyleSense Logo
                </h3>
            </Flex>
          </Card>
          <Card
            height="100%"
            width="calc(100% / 3)"
            className='background'
          >
            <Flex
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <h3
              className='navHeader'
              >Weather Info?</h3>
            </Flex>
          </Card>
          <Card
            height="100%"
            width="calc(100% / 3)"
            className='background'
          >
            <Flex
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Menu
              menuAlign='end'
              style={menuStyle}
              trigger={
                <MenuButton
                style={profileStyle}>
                  {(props.User[0]).toUpperCase()}
                </MenuButton>
              }>
                <MenuItem className='profileOption' onClick={props.SignOut}>Sign Out</MenuItem>
                <MenuItem className='profileOption' disabled={true} onClick={() => console.log("Profile")}>Profile</MenuItem>
              </Menu>
            </Flex>
          </Card>
      </Flex>
    </View>
  );

}

export default NavBar;