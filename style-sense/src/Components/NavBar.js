import React from 'react';
import { View, Card, Flex, Menu, MenuItem, MenuButton } from '@aws-amplify/ui-react'


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

  const menuStyle = {
    zIndex: '99',
  }

  // Show loader on signout??



  return (
    <View
      position="fixed"
      height="10%"
      top="0"
      width="100%"
      backgroundColor="#F0F6F6"
      style = {menuStyle}
    >
      <Flex
        height="100%"
        width="100%"
        direction='row'
        justifyContent="space-evenly"
      >
        <Card
            height="100%"
            width="calc(100% / 3)"
            borderRadius="0.5rem"
          >
            <Flex
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <h3>StyleSense Logo</h3>
            </Flex>
          </Card>
          <Card
            height="100%"
            width="calc(100% / 3)"
            borderRadius="0.5rem"
          >
            <Flex
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <h3>Weather Info?</h3>
            </Flex>
          </Card>
          <Card
            height="100%"
            width="calc(100% / 3)"
            borderRadius="0.5rem"
          >
            <Flex
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Menu
              menuAlign='end'
              trigger={
                <MenuButton
                style={profileStyle}>
                  {(props.User[0]).toUpperCase()}
                </MenuButton>
              }>
                <MenuItem style={menuStyle} onClick={props.SignOut}>Sign Out</MenuItem>
                <MenuItem disabled={true} onClick={() => console.log("Profile")}>Profile</MenuItem>
              </Menu>
            </Flex>
          </Card>
      </Flex>
    </View>
  );

}

export default NavBar;