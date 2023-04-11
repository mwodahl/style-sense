import React from 'react';
import { ScrollView, View, TextField, Flex } from '@aws-amplify/ui-react'


function ItemView(props) {

    // TODO:
    // Make sure props align && display is correct

    return (
        <ScrollView
            position="fixed"
            height="70%"
            width="30%"
            left="35%"
            top="15%"
            backgroundColor="#FFFFFF"
            borderRadius="10%"
        >
            <Flex
                direction="column"
                justifyContent="start"
                gap="1rem"
                width="90%"
                marginLeft="auto"
                marginRight="auto">
                <View
                    textAlign="center">
                    <h3>
                        {props.itemName}
                    </h3>
                </View>
                { /* TODO: Add Image that pulls from unique ID */}
                <image>

                </image>
                <TextField
                    label="Item Name"
                    placeholder='Green Jacket'
                    onChange={(e) => console.log(e.nativeEvent.target.value)}
                    disabled={props.edit ? "true" : "false"} />
                <TextField
                    label="Type"
                    placeholder='Jacket'
                    onChange={(e) => console.log(e.nativeEvent.target.value)} 
                    disabled={props.edit ? "true" : "false"} />
                <TextField
                    label="Color"
                    placeholder='Green'
                    onChange={(e) => console.log(e.nativeEvent.target.value)}
                    disabled={props.edit ? "true" : "false"} />
                <TextField
                    label="Weather"
                    placeholder='Cold, Snowy, Rainy'
                    onChange={(e) => console.log(e.nativeEvent.target.value)}
                    disabled={props.edit ? "true" : "false"} />
                <TextField
                    label="Occasion"
                    placeholder='Formal, Work'
                    onChange={(e) => console.log(e.nativeEvent.target.value)}
                    disabled={props.edit ? "true" : "false"} />
                <TextField
                    label="Description"
                    placeholder='My favorite formal green jacket. Bought in 2019.'
                    onChange={(e) => console.log(e.nativeEvent.target.value)}
                    disabled={props.edit ? "true" : "false"} />
                <Button></Button>
                <View height="1rem"></View>
            </Flex>

        </ScrollView>
    )
}

export default AddItem;