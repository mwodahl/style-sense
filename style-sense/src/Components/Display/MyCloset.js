import React from 'react';
import { Tabs, TabItem, View, Card, Image } from '@aws-amplify/ui-react'


function MyCloset(props) {

    // So....we have tabs that map to cards.
    // Also a left + right button to switch between outfitView

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
                            <TabItem title="Shoes"/>
                            <TabItem title="Bottoms"/>
                            <TabItem title="Tops"/>
                            <TabItem title="Jackets"/>
                            <TabItem title="Accessories"/>
                        </Tabs>
            )}

        </View>
    )
}

export default MyCloset;