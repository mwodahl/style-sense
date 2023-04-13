import React, { useState } from 'react';
import { Tabs, TabItem, View, Card, Image } from '@aws-amplify/ui-react'
import Carousel from "react-elastic-carousel";
import '../../css/Closet.css';
import '../../css/Shared.css'

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 600, itemsToShow: 2 },
    { width: 900, itemsToShow: 3 },
    { width: 1050, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 },
];

function MyCloset(props) {

    let bucket = require('../../env.json')
    const data = require('../../tmp_schema/data.json')

    // TODO:
    // Get rid of this after pulling in data
    const shoes = [
        data.clothes[0],
        data.clothes[1],
        data.clothes[2],
        data.clothes[3],
        data.clothes[4],
        data.clothes[5],
        data.clothes[6]
    ]

    const setView = (index) => {
        console.log('setView called...' + index)
        props.setItemView(data.clothes[index])
    }

    // Placeholders
    const [tops, setTops] = useState([1, 2, 3, 4, 5, 6, 7]);
    const [jackets, setJackets] = useState([1, 2, 3]);
    const [accessories, setAccessories] = useState([1, 2, 3, 4, 5]);
    return (
        <View
            height="45%"
            width="85%"
            position="absolute"
            top="10%"
            left="15%"
            backgroundColor="#FFFFFF"
        >

            <View
                display="relative"
                textAlign="center"
            >
                <h2
                    className='header'
                >
                    My Closet
                </h2>
            </View>
            <View
                position="relative"
                width="90%"
                marginLeft="auto"
                marginRight="auto"
                height=""
            >
                <Tabs>
                    <TabItem title="Shoes">
                        {
                            props.clothes.length === 0 ? (
                                <View
                                    textAlign="center"
                                >
                                    <h3> Select 'Add Item' to add an item to your closet </h3>
                                </View>
                            ) : (
                                <Carousel breakPoints={breakPoints}>
                                    {
                                        /* 
                                        * So in here we're going to map props.shoes
                                        * to a card with an image. Card should have a slight box shadow.
                                        * TODO:
                                        * Replace with props.shoes (or filter in this component)
                                        */
                                        shoes.map((item, index) => (
                                            <Card
                                                id="clothingCard"
                                                key={index}
                                                onClick={() => setView(index)}
                                            >
                                                <Image
                                                    className='responsive'
                                                    src={bucket.REACT_APP_BUCKET_URL + item.id}
                                                />
                                            </Card>
                                        ))
                                    }
                                </Carousel>
                            )
                        }
                    </TabItem>
                    <TabItem title="Bottoms">
                        {
                            [].length === 0 ? (
                                <View
                                    textAlign="center"
                                    position="relative"
                                    marginTop="5rem"
                                >
                                    <h3
                                    className='header'
                                    > Select 'Add Item' to add an item to your closet </h3>
                                </View>
                            ) : (
                                <Carousel breakPoints={breakPoints}>
                                    {
                                        /* 
                                        * So in here we're going to map props.shoes
                                        * to a card with an image. Card should have a slight box shadow.
                                        * TODO:
                                        * Replace with props.shoes (or filter in this component)
                                        */
                                        [].map((item, index) => (
                                            <Card
                                                id="clothingCard"
                                                key={index}
                                                onClick={() => setView(index)}
                                            >
                                                <Image
                                                    className='responsive'
                                                    src={bucket.REACT_APP_BUCKET_URL + item.id}
                                                />
                                            </Card>
                                        ))
                                    }
                                </Carousel>
                            )
                        }
                    </TabItem>
                    <TabItem title="Tops">
                        <Carousel breakPoints={breakPoints}>
                            {tops.map(item => <View className='closet__carousel' key={item}>{item}</View>)}
                        </Carousel>
                    </TabItem>
                    <TabItem title="Jackets">
                        <Carousel breakPoints={breakPoints}>
                            {jackets.map(item => <View className='closet__carousel' key={item}>{item}</View>)}
                        </Carousel>
                    </TabItem>
                    <TabItem title="Accessories">
                        <Carousel breakPoints={breakPoints}>
                            {accessories.map(item => <View className='closet__carousel' key={item}>{item}</View>)}
                        </Carousel>
                    </TabItem>
                </Tabs>
            </View>
        </View>
    )
}

export default MyCloset;