import React from 'react';
import { Tabs, TabItem, View, Card, Image } from '@aws-amplify/ui-react'
import Carousel from "react-elastic-carousel";
import '../../css/Closet.css';
import '../../css/Shared.css';

function SavedOutfits(props) {

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

    function setOutfit(outfit) {
        console.log(outfit)
        props.setOutfitView(outfit)
    }

    return (
        <View
            height="45%"
            width="85%"
            position="absolute"
            bottom="0"
            right="0"
            backgroundColor="#FFFFFF"
        >
            <View
                textAlign="center"
            >
                <h2
                    className='header'
                    style={{
                        marginTop: '1rem',
                        position: 'relative',
                    }}
                >
                    Saved Outfits
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
                    {
                        props.savedOutfits.length === 0 ? (
                            <TabItem title="Outfit">
                                <View
                                    textAlign="center"
                                    position="relative"
                                    marginTop="8rem"
                                    width="95%"
                                    marginLeft="auto"
                                    marginRight="auto"
                                >
                                    <h3
                                        className='header'
                                    > Select 'Add Outfit' to add an outfit to your closet </h3>
                                </View>
                            </TabItem>
                        ) : (
                            props.savedOutfits.map((outfit, index) => (
                                <TabItem title={outfit.name} key={index}>
                                    <Carousel breakPoints={breakPoints}>
                                        {
                                            outfit.items.map((item, index) => (
                                                <Card
                                                    id="clothingCard"
                                                    key={index}
                                                    onClick={() => setOutfit(outfit)}
                                                >
                                                    <Image
                                                        className='responsive'
                                                        src={bucket.REACT_APP_BUCKET_URL + item}
                                                    />
                                                </Card>
                                            ))
                                        }
                                    </Carousel>
                                </TabItem>
                            ))
                        )
                    }
                </Tabs>
            </View>
        </View >
    )
}

export default SavedOutfits;