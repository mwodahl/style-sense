import React from 'react';
import { Button, View, Flex } from '@aws-amplify/ui-react'


function OutfitDecision(props) {

    function handleClick(val) {
        props.setGenerateOutfit(val)
    }

    return (
        <View
            position="fixed"
            height="20%"
            width="15%"
            left="42.5%"
            top="40%"
            backgroundColor="#FFFFFF"
            borderRadius="10%"
        >
            <View
                textAlign="center"
                marginTop="2rem"
            >
                <h3>
                    Manually Generate Outfit?
                </h3>
            </View>
            <Flex
                width="100%"
                height="fit-content"
                position="relative"
                direction="row"
                justifyContent="space-evenly"
                marginTop="5rem"
            >
                <Button
                    onClick={() => handleClick(false)}
                >
                    No
                </Button>
                <Button
                    onClick={() => handleClick(true)}
                >
                    Yes
                </Button>
            </Flex>
        </View>
    )
}

export default OutfitDecision;