import React from 'react';
import { View } from '@aws-amplify/ui-react'


function MyClosetWidget(props) {
    // Add functionality here??
    // Temporarily just a placeholder

    return (
        <View
            position="fixed"
            height="50%"
            width="30%"
            top='12%'
            left='18%'
            zIndex='-1'
            backgroundColor="#FFFFFF"
            borderRadius="10%"
        >
        </View>
    );
}

export default MyClosetWidget;