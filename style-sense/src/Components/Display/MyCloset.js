import React, {useState} from 'react';
import { Tabs, TabItem, View, Card, Image, Divider } from '@aws-amplify/ui-react'
import Carousel from "react-elastic-carousel";


function MyCloset(props) {

    // So....we have tabs that map to cards.
    // Also a left + right button to switch between outfitView

    const [shoes, setShoes] = useState([1, 2, 3, 4]); //shoes array
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
                            <Carousel>
                                {shoes.map(item => <View key={item}>{item}</View>)}
                            </Carousel>
                            </TabItem>
                            <TabItem title="Bottoms">
                            <Carousel>
                                {bottoms.map(item => <View key={item}>{item}</View>)}
                            </Carousel>
                            </TabItem>
                            <TabItem title="Tops">
                            <Carousel>
                                {tops.map(item => <View key={item}>{item}</View>)}
                            </Carousel>
                            </TabItem>
                            <TabItem title="Jackets">
                            <Carousel>
                                {jackets.map(item => <View key={item}>{item}</View>)}
                            </Carousel>
                            </TabItem>
                            <TabItem title="Accessories">
                            <Carousel>
                                {accessories.map(item => <View key={item}>{item}</View>)}
                            </Carousel>
                            </TabItem>
                        </Tabs>
            )}

        </View>
    )
}

export default MyCloset;