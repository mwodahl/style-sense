import React from 'react';
import { ScrollView } from '@aws-amplify/ui-react'


function AddWidget(props) {
    // Add functionality here??
    // Temporarily just a placeholder

    // TODO:
    // 1. Figure out image file upload
    // 2. Figure out how to display the image
    // 3. Figure out how to save the image to the database
    // 4. Figure out the database schema and handle metadata upload

    return (
        <ScrollView
            position="fixed"
            height="50%"
            width="40%"
            bottom='5%'
            right='5%'
            zIndex='-1'
            backgroundColor="#FFFFFF"
            borderRadius="10%"
        >
            
        </ScrollView>
    );
}

export default AddWidget;