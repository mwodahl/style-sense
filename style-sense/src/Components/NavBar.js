import React, { useState, useEffect } from 'react';
import { View, Card, Flex, Menu, MenuItem, MenuButton } from '@aws-amplify/ui-react'
import '../css/Shared.css';
import '../css/NavBar.css';

function NavBar(props) {

  const profileStyle = {
    color: '#F0F6F6',
    borderRadius: '50%',
    border: '1px solid #F0F6F6',
    backgroundColor: '#22223b',
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

  const [data, setData] = useState({});
  const [lat, setLat] = useState({});
  const [lon, setLon] = useState({});
  navigator.geolocation.getCurrentPosition(function (position) {
    setLat(position.coords.latitude.toString());
    setLon(position.coords.longitude.toString());
  });

  const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=e2ab1469ff86523278c10e93f6baf4b3&units=imperial";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);


  return (
    <View
      position="fixed"
      height="10%"
      top="0"
      width="100%"
      style={viewStyle}
    >
      <Flex
        className='background'
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
            <View className="weather">
              {data.name ? <h2>{data.name}</h2> : null}
              {data.main ? <h3>{data.main.temp.toFixed()}°F</h3> : null}
              {data.weather ? <h3>{data.weather[0].main}</h3> : null}
            </View>
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
      </Flex >
    </View >
  );

}

export default NavBar;