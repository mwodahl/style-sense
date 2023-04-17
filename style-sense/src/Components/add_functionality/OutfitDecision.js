import React from 'react';
import { Button, View, Flex } from '@aws-amplify/ui-react'
import { ImCancelCircle } from 'react-icons/im';
import '../../css/Shared.css'


function OutfitDecision(props) {

    // component to handle user decision to generate outfit

    function handleClick(val) {
        props.setGenerateOutfit(val)
    }

    function exitWindow() {
        props.setSelected("")
    }

    return (
        <View
            position="fixed"
            height="fit-content"
            width="15%"
            left="42.5%"
            top="40%"
            backgroundColor="#FFFFFF"
            borderRadius="10px"
            padding="5px"
            boxShadow={'10px 10px 40px 0px #22223b'}
        >
            <Button
                position={'relative'}
                marginLeft={'0.5rem'}
                marginTop={'0.5rem'}
                padding='0.5rem'
                border={'none'}
                onClick={exitWindow}
            >
                <ImCancelCircle
                    size={'1.5rem'}
                    onClick={exitWindow} />
            </Button>
            <View
                textAlign="center"
                position="relative"
                marginTop={"-0.5rem"}
                marginBottom={"2rem"}
            >
                <h3
                    className='header'
                >
                    Manually Add Outfit?
                </h3>
            </View>
            <Flex
                width="100%"
                height="fit-content"
                position="relative"
                direction="row"
                justifyContent="space-evenly"
                marginTop="2rem"
                marginBottom="2rem"
            >
                <Button
                    id="cancel-button"
                    onClick={() => handleClick(false)}
                >
                    No
                </Button>
                <Button
                    id="add-button"
                    onClick={() => handleClick(true)}
                >
                    Yes
                </Button>
            </Flex>
        </View>
    )
}

export default OutfitDecision;