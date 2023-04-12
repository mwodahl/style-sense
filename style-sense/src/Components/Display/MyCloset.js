import React, { useState } from 'react';
import { Tabs, TabItem, View, Image } from '@aws-amplify/ui-react'
import Carousel from "react-elastic-carousel";
import '../../css/Closet.css';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 600, itemsToShow: 2 },
    { width: 900, itemsToShow: 3 },
    { width: 1050, itemsToShow: 7 },
    { width: 1200, itemsToShow: 8 },
];

function MyCloset(props) {

    // So....we have tabs that map to cards.
    // Also a left + right button to switch between outfitView

    // Placeholders
    const [shoes, setShoes] = useState([1, 2, 3, 4]);
    const [bottoms, setBottoms] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
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
                textAlign="center"
            >
                <h3>
                    My Closet
                </h3>
            </View>
            {
                props.savedOutfits.length === 0 ?
                    (<View
                        textAlign="center"
                    >
                        <h3> No Items </h3>
                    </View>
                    ) : (
                        <Tabs>
                            <TabItem title="Shoes">
                                <Carousel breakPoints={breakPoints}>
                                    {shoes.map(item => <View className='closet__carousel' key={item}>{item}</View>)}
                                </Carousel>
                            </TabItem>
                            <TabItem title="Bottoms">
                                <Carousel breakPoints={breakPoints}>
                                    {bottoms.map(item => <View className='closet__carousel' key={item}>{item}</View>)}
                                </Carousel>
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
                    )}

        </View>
    )
}

export default MyCloset;