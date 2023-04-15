import React from 'react';
import { Tabs, TabItem, View, Card, Image } from '@aws-amplify/ui-react'
import Carousel from "react-elastic-carousel";
import '../../css/Closet.css';
import '../../css/Shared.css';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 600, itemsToShow: 2 },
    { width: 900, itemsToShow: 3 },
    { width: 1050, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 },
];

function SavedOutfits(props) {

    // Note:
    // Add carousel
    // Add props functionality for viewing / modifying an outfit

    // onClick -> set outfitView to be the outfit that was clicked...
    // allow users to modify the outfit in manual

    let bucket = require('../../env.json')

    console.log(props.savedOutfits)

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
            <Tabs>
                {
                    props.savedOutfits.length === 0 ? (
                        <TabItem title="Outfit">
                            <View
                                textAlign="center"
                                position="relative"
                                marginTop="8rem"
                            >
                                <h3
                                    className='header'
                                > Select 'Add Outfit' to add an outfit to your closet </h3>
                            </View>
                        </TabItem>
                    ) : (
                            props.savedOutfits.map((outfit) => (
                                <TabItem title={outfit.name}>
                                <Carousel breakPoints={breakPoints}>
                                    {
                                        /* 
                                        * TODO:
                                        * Issue in here that needs to be figured out.
                                        */
                                        // outfit.map((item, index) => (
                                        //     <Card
                                        //         id="clothingCard"
                                        //         key={index}
                                        //         onClick={() => console.log('click')}
                                        //     >
                                        //         <Image
                                        //             className='responsive'
                                        //             src={bucket.REACT_APP_BUCKET_URL + item.id}
                                        //         />
                                        //     </Card>
                                        // ))
                                    }
                                    </Carousel>
                                    </TabItem>
                            ))
                    )
                }
            </Tabs>
        </View>
    )
}

export default SavedOutfits;