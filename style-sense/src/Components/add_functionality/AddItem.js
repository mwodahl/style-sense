import React from 'react';
import { Storage } from 'aws-amplify';
import { Button, ScrollView, View, TextField, Flex } from '@aws-amplify/ui-react'
import { FileUploader } from "react-drag-drop-files";


function AddItem(props) {

    const fileTypes = [
        "JPG", "PNG", "JPEG"
    ]

    const handleFile = (file) => {
        console.log(file.toString())
        console.log(file.name)
        console.log(file.size)
        console.log(file.type)
        console.log("file handled")
        props.setImageFile(file)
    }

    function cancelItem() {
        props.setSelected("")
        props.setImageFile(null)
    }

    async function submitItem() {
        // TODO:
        // set loading to true
        // display absolute loading bar
        // submit item to database
        // update user information
        // loading to false
        // update other props. 
        // display error if error. 
        const res = await Storage.list('')
        console.log(res)
        console.log("submitting item")
        props.addItem()
        props.setSelected("")
        props.setImageFile(null)
    }


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
                        Add Item
                    </h3>
                </View>

                <FileUploader types={fileTypes} multiple={false} handleChange={handleFile} />
                {

                }
                
                <TextField
                    label="Item Name"
                    placeholder='Green Jacket'
                    onChange={(e) => console.log(e.nativeEvent.target.value)} />
                <TextField
                    label="Type"
                    placeholder='Jacket'
                    onChange={(e) => console.log(e.nativeEvent.target.value)} />
                <TextField
                    label="Color"
                    placeholder='Green'
                    onChange={(e) => console.log(e.nativeEvent.target.value)} />
                <TextField
                    label="Weather"
                    placeholder='Cold, Snowy, Rainy'
                    onChange={(e) => console.log(e.nativeEvent.target.value)} />
                <TextField
                    label="Occasion"
                    placeholder='Formal, Work'
                    onChange={(e) => console.log(e.nativeEvent.target.value)} />
                <TextField
                    label="Description"
                    placeholder='My favorite formal green jacket. Bought in 2019.'
                    onChange={(e) => console.log(e.nativeEvent.target.value)} />
                <View height="1rem"></View>
            </Flex>
            <Flex
            position={"relative"}
            width="90%"
            height="fit-content"
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            marginLeft={"auto"}
            marginRight={"auto"}
            marginBottom={"1.5rem"}

            >
            <Button
            onClick={cancelItem}
            >
                Cancel
            </Button>
            <Button
            onClick={submitItem}
            >
                Save
            </Button>
            </Flex>

        </ScrollView>
    )
}

export default AddItem;