import React from 'react';
import { Tabs, TabItem, View, Card, Image } from '@aws-amplify/ui-react'


function SavedOutfits(props) {

    // So....we have tabs that map to cards.
    // Also a left + right button to switch between outfitView

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
                <h3>
                    Saved Outfits
                </h3>
            </View>
            {
                props.savedOutfits.length === 0 ?
                    (<View
                        textAlign="center"
                    >
                        <h3> No Saved Outfits </h3>
                    </View>
                    ) : (
                        <Tabs>
                            {
                             props.savedOutfits.map((outfit) => {

                                <TabItem label={outfit.name}>
                                    <Card>
                                        <Image>
    
                                        </Image>
                                    </Card>
                                </TabItem>                           
                            })}  
                    </Tabs>
            )}

        </View>
    )
}

export default SavedOutfits;