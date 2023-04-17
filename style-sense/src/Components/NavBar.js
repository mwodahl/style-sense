import React, { useState, useEffect } from 'react';
import { View, Card, Flex, Menu, MenuItem, MenuButton, Image } from '@aws-amplify/ui-react'
import '../css/Shared.css';
import '../css/NavBar.css';
import Logo from '../assets/StyleSense_logo.png'
import { BsCloudRain } from "react-icons/bs";
import { BsCloud } from "react-icons/bs";
import { BsCloudSnow } from "react-icons/bs";
import { IoSunnyOutline } from "react-icons/io5";
import { PulseLoader } from 'react-spinners';

function NavBar(props) {

  // component state objects
  const [data, setData] = useState({});
  const [lat, setLat] = useState({});
  const [lon, setLon] = useState({});


  // component style objects
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

  const iconMap = {
    "Rain": <BsCloudRain size={'2.5rem'} />,
    "Clouds": <BsCloud size={'2.5rem'} />,
    "Snow": <BsCloudSnow size={'2.5rem'} />,
    "Clear": <IoSunnyOutline size={'2.5rem'} />
  }


  // grab user's location
  navigator.geolocation.getCurrentPosition(function (position) {
    setLat(position.coords.latitude.toString());
    setLon(position.coords.longitude.toString());
  });


  // fetch weather data
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
            <View>
              <Image
                marginTop={'-1rem'}
                marginLeft={'1rem'}
                maxWidth={'9rem'}
                maxHeight={'100%'}
                src={Logo}
              />
            </View>
          </Flex>
        </Card>
        <Card
          height="100%"
          width="calc(100% / 3)"
          className='background'>
          {
            data.weather === undefined ?
              (
                <View
                  display='Flex'
                  height='100%'
                  width='100%'
                  justifyContent='center'
                  alignItems='center'
                >
                  <PulseLoader color={'white'} size={20} speedMultiplier={'0.5'} />
                </View>
              )
              : (
                <Flex
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <View className="weather">
                    {data.weather ? iconMap[data.weather[0].main] : null}
                  </View>
                  <View className="weather">
                    {data.name ? <h2>{data.name}</h2> : null}
                  </View>
                  <View className="weather">
                    {data.main ? <h2>{data.main.temp.toFixed()}°F</h2> : null}
                  </View>
                </Flex>
              )
          }
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