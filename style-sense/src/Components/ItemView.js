import React, { useState } from 'react';
import { Storage } from 'aws-amplify';
import { Button, ScrollView, View, TextField, Flex, Image } from '@aws-amplify/ui-react'
import { FileUploader } from "react-drag-drop-files";
import BarLoader from 'react-spinners/BarLoader';
import { ImCancelCircle } from 'react-icons/im';


function ItemView(props) {

    // TODO:
    // Make sure props align. Modify to Show image + default to prop values
    // Styling. 

    let bucket = require('../env.json')

    const bucketURI = bucket.REACT_APP_BUCKET_URL + props.clothingItem.id
    console.log(bucketURI)

    const [result, setResult] = useState({})
    const [loading, setLoading] = useState(false)

    const fileTypes = [
        "JPG", "PNG", "JPEG"
    ]

    const handleFile = (file) => {
        props.setImageFile(file)
    }

    function cancelItem() {
        props.setSelected("")
        props.setImageFile(null)
        props.setItem({
            "name": null,
            "id": null,
            "type": null,
            "color": null,
            "weather": null,
            "occasion": null,
            "description": null
        })
    }

    function updateValue(type, value) {
        let item = props.item
        item[type] = value
        props.setItem(item)
    }

    async function submitItem() {
        setLoading(true)
        const res = await props.addItem()
        setLoading(false)
        setResult(res)
    }

    return (
        <ScrollView
            position="fixed"
            height="70%"
            width="30%"
            left="33%"
            top="15%"
            backgroundColor="#FFFFFF"
            borderRadius="10%"
            paddingRight='2%'
            paddingLeft='2%'
        >
            <Button
                position={'fixed'}
                top={'1'}
                left={'1'}
                border={'none'}
            >
                <ImCancelCircle
                    width={'1.5rem'}
                    height={'1.5rem'}
                    onClick={cancelItem} />
            </Button>
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
                        { props.clothingItem.name }
                    </h3>
                </View>

                { /* TODO: lowkey fine though. */}
                <View
                position= "relative"
                width="100%"
                height="fit-content"
                >
                    <Image
                        src={bucketURI}
                        width={'20vw'}
                        height={'20vw'}
                    />
                </View>

                <FileUploader types={fileTypes} multiple={false} handleChange={handleFile} />

                <TextField
                    label="Item Name"
                    value={props.clothingItem.name}
                    onChange={(e) => updateValue("name", e.nativeEvent.target.value)} />
                <TextField
                    label="Type"
                    value={props.clothingItem.type}
                    onChange={(e) => updateValue("type", e.nativeEvent.target.value)} />
                <TextField
                    label="Color"
                    value={props.clothingItem.color}
                    onChange={(e) => updateValue("color", e.nativeEvent.target.value)} />
                <TextField
                    label="Weather"
                    value={props.clothingItem.weather}
                    onChange={(e) => updateValue("weather", e.nativeEvent.target.value)} />
                <TextField
                    label="Occasion"
                    value={props.clothingItem.occasion}
                    onChange={(e) => updateValue("occasion", e.nativeEvent.target.value)} />
                <TextField
                    label="Description"
                    value={props.clothingItem.description}
                    onChange={(e) => updateValue("description", e.nativeEvent.target.value)} />
                <View height="1rem"></View>
            </Flex>

            <View
                position="relative"
                width="100%"
                height="fit-content"
                id="idfk"
                textAlign="center"
                marginBottom="2rem"
            >
                {
                    result.success !== undefined ? (
                        <h3>
                            {result.success}
                        </h3>
                    ) : (
                        result.error !== undefined ? (
                            <h3>
                                {result.error}
                            </h3>
                        ) : (
                            null
                        )
                    )
                }

            </View>

            {
                loading ? (
                    <View
                        position="relative"
                        width="100%"
                        height="fit-content"
                        textAlign="center"
                        marginBottom="2rem"
                    >
                        <BarLoader
                            color={"#2D3142"}
                            height={10}
                            width={'100%'} />
                    </View>
                ) : (
                    null
                )
            }

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

export default ItemView;