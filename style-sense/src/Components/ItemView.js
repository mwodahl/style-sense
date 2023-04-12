import React, { useState } from 'react';
import { Button, ScrollView, View, TextField, Flex, Image } from '@aws-amplify/ui-react'
import { FileUploader } from "react-drag-drop-files";
import BarLoader from 'react-spinners/BarLoader';
import { ImCancelCircle } from 'react-icons/im';
import '../css/Shared.css'


function ItemView(props) {
    
    let bucket = require('../env.json')
    const bucketURI = bucket.REACT_APP_BUCKET_URL + props.clothingItem.id
    const fileTypes = ["JPG", "PNG", "JPEG"]
    
    const [del, setDel] = useState(false)
    const [result, setResult] = useState({})
    const [loading, setLoading] = useState(false)

    const handleFile = (file) => {
        props.setImageFile(file)
    }

    function deleteItem() {
        if (del) {
            console.log("delete")
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
            props.setItemView(null)
            // TODO:
            // Call props + delete item from database + storage
        } else {
            setDel(true)
        }
    }

    function updateValue(type, value) {
        let item = props.item
        item[type] = value
        props.setItem(item)
    }

    async function submitItem() {
        setLoading(true)
        
        // TODO: Create an update clothing function in props
        // await that instead of addItem

        setLoading(false)
        setResult("")
    }

    function exitWindow() {
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
        props.setItemView(null)
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
            boxShadow={'10px 10px 40px 0px #22223b'}
        >
            <Button
                height='fit-content'
                width='fit-content'
                position={'relative'}
                marginLeft={'0.5rem'}
                marginTop={'1rem'}
                border={'none'}
                onClick={exitWindow}
            >
                <ImCancelCircle size={'1.5rem'} />
            </Button>
            <Flex
                direction="column"
                justifyContent="start"
                gap="1rem"
                width="90%"
                marginLeft="auto"
                marginRight="auto">
                <View
                    textAlign="center"
                    position="relative"
                    marginBottom="1rem"
                >
                    <h3
                        className='header'
                    >
                        {props.clothingItem.name}
                    </h3>
                </View>
                <View
                    position="relative"
                    width="fit-content"
                    height="fit-content"
                    marginLeft="auto"
                    marginRight="auto"
                >
                    <Image
                        src={bucketURI}
                        width={'20vw'}
                        height={'20vw'}
                    />
                </View>

                <View
                    position="relative"
                    marginBottom="1rem"
                    marginTop="1rem"
                >
                    <FileUploader types={fileTypes} multiple={false} handleChange={handleFile} />
                </View>

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
                    onClick={deleteItem}
                    id='cancel-button'
                >
                    Delete
                </Button>
                <Button
                    onClick={submitItem}
                    id='add-button'
                >
                    Save
                </Button>
            </Flex>

            {
                del === true ? (
                    <View
                        textAlign="center"
                    >
                        <h5
                            style= {{color: 'darkred', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold'}}
                        >
                            This operation will delete this item from your closet and cannot be undone.
                            Would you like to proceed?
                        </h5>
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
                                id='cancel-button'
                                onClick={() => setDel(false) }
                            >
                                No
                            </Button>
                            <Button
                                id='add-button'
                                onClick={deleteItem}
                            >
                                Yes
                            </Button>
                        </Flex>
                    </View>
                )
                    : (
                        null
                    )
            }

        </ScrollView>
    )
}

export default ItemView;