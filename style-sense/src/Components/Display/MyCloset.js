import React from 'react';
import { Tabs, TabItem, View, Card, Image } from '@aws-amplify/ui-react'
import Carousel from "react-elastic-carousel";
import '../../css/Closet.css';
import '../../css/Shared.css'

function MyCloset(props) {

    // carousel settings
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 600, itemsToShow: 2 },
        { width: 900, itemsToShow: 3 },
        { width: 1050, itemsToShow: 4 },
        { width: 1200, itemsToShow: 5 },
    ];

    // import 'env' file
    let bucket = require('../../env.json')

    // set item view
    const setView = (type, index) => {
        switch (type) {
            case "shoes":
                props.setItemView(props.shoes[index])
                break;
            case "bottoms":
                props.setItemView(props.bottoms[index])
                break;
            case "tops":
                props.setItemView(props.tops[index])
                break;
            case "outerwear":
                props.setItemView(props.outerwear[index])
                break;
            case "accessories":
                props.setItemView(props.accessories[index])
                break;
            default:
                break;
        }
    }

    return (
        <View
            height="45%"
            width="85%"
            position="absolute"
            top="10%"
            left="15%"
            backgroundColor="#FFFFFF"
            marginTop={'1rem'}
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
                            props.shoes.length === 0 ? (
                                <View
                                    marginTop="5rem"
                                    textAlign="center"
                                    className='header'
                                >
                                    <h3> Select 'Add Item' to add an item to your closet </h3>
                                </View>
                            ) : (
                                <Carousel breakPoints={breakPoints}>
                                    {
                                        props.shoes.map((item, index) => (
                                            <Card
                                                id="clothingCard"
                                                key={index}
                                                onClick={() => setView("shoes", index)}
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
                            props.bottoms.length === 0 ? (
                                <View
                                    marginTop="5rem"
                                    textAlign="center"
                                    className='header'
                                >
                                    <h3
                                        className='header'
                                    > Select 'Add Item' to add an item to your closet </h3>
                                </View>
                            ) : (
                                <Carousel breakPoints={breakPoints}>
                                    {
                                        props.bottoms.map((item, index) => (
                                            <Card
                                                id="clothingCard"
                                                key={index}
                                                onClick={() => setView("bottoms", index)}
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
                        {
                            props.tops.length === 0 ? (
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
                                        props.tops.map((item, index) => (
                                            <Card
                                                id="clothingCard"
                                                key={index}
                                                onClick={() => setView("tops", index)}
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
                    <TabItem title="Outerwear">
                        {
                            props.outerwear.length === 0 ? (
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
                                        props.outerwear.map((item, index) => (
                                            <Card
                                                id="clothingCard"
                                                key={index}
                                                onClick={() => setView("outerwear", index)}
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
                    <TabItem title="Accessories">
                        {
                            props.accessories.length === 0 ? (
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
                                        props.accessories.map((item, index) => (
                                            <Card
                                                id="clothingCard"
                                                key={index}
                                                onClick={() => setView("accessories", index)}
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
                </Tabs>
            </View>
        </View>
    )
}

export default MyCloset;