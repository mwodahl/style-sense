import React from 'react';
import { View } from '@aws-amplify/ui-react'
import SavedOutfits from './Display/SavedOutfits';


function MainDisplay(props) {
    // Responsible for the main area display
    // Needs to be 90%x90%
    // Needs to be able to display the following:
    // 1. My Closet
    // 2. Add Outfit
    // 3. Saved Outfits
    // 4. Generate Outfit

    const containerStyle = {
        zIndex: "-1",
    }



    return (
        <View
            position="fixed"
            height="90%"
            width="85%"
            bottom='0'
            right='0'
            backgroundColor="#F0F6F6"
            style={containerStyle}
        />
    );
}

export default MainDisplay;