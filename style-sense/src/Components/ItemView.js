import React, { useState } from 'react';
import { Button, ScrollView, View, TextField, Flex, Image, SelectField } from '@aws-amplify/ui-react'
import BarLoader from 'react-spinners/BarLoader';
import { ImCancelCircle } from 'react-icons/im';
import '../css/Shared.css'


function ItemView(props) {

    // component state objects
    const [del, setDel] = useState(false)
    const [result, setResult] = useState({})
    const [loading, setLoading] = useState(false)
    const [itemEdit, setItemEdit] = useState({
        "name": false,
        "type": false,
        "color": false,
        "weather": false,
        "occasion": false,
        "description": false
    })

    // add 'env' file
    let bucket = require('../env.json')

    // Rmoves item from database
    async function deleteItem() {
        if (del) {
            setLoading(true)
            let res = await props.deleteItem(props.clothingItem.id)
            props.setImageFile(null)
            props.setItem({
                "name": null,
                "type": null,
                "color": null,
                "weather": null,
                "occasion": null,
                "description": null
            })
            props.setItemView(null)
            setResult(res)
            setLoading(false)
        } else {
            setDel(true)
        }
    }

    // updates item state
    async function updateValue(type, value) {
        let item
        if (props.item[type] === null) {
            item = props.clothingItem
        } else {
            item = props.item
        }
        item[type] = value
        await props.setItem(item)
        setItemEdit({
            "name": false,
            "type": false,
            "color": false,
            "weather": false,
            "occasion": false,
            "description": false
        })
        props.setImageFile(null)
    }

    // submits item changes to database
    async function update(id) {
        setLoading(true)
        let res = await props.updateItem(id)
        setResult(res)
        setLoading(false)
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
                    <h2
                        className='header'
                    >
                        {props.clothingItem.name}
                    </h2>
                </View>
                <View
                    position="relative"
                    width="fit-content"
                    height="fit-content"
                    marginLeft="auto"
                    marginRight="auto"
                    marginBottom="2rem"
                >
                    <Image
                        src={bucket.REACT_APP_BUCKET_URL + props.clothingItem.id}
                        width={'20vw'}
                        height={'20vw'}
                    />
                </View>
                <TextField
                    label="Item Name"
                    value={itemEdit["name"] === false ? props.clothingItem.name : null}
                    placeholder={itemEdit["name"] === true ? props.clothingItem.name : null}
                    onChange={(e) => updateValue("name", e.nativeEvent.target.value)} />
                <SelectField
                    label="Type"
                    onChange={(e) => updateValue("type", e.nativeEvent.target.value)}
                    value={props.clothingItem.type}
                >
                    <option value="Shoes">Shoes</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Tops">Tops</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Accessories">Accessories</option>
                </SelectField>
                <TextField
                    label="Color"
                    value={itemEdit["color"] === false ? props.clothingItem.color : null}
                    placeholder={itemEdit["color"] === true ? props.clothingItem.color : null}
                    onChange={(e) => updateValue("color", e.nativeEvent.target.value)} />
                <TextField
                    label="Weather"
                    value={itemEdit["weather"] === false ? props.clothingItem.weather : null}
                    placeholder={itemEdit["weather"] === true ? props.clothingItem.weather : null}
                    onChange={(e) => updateValue("weather", e.nativeEvent.target.value)} />
                <TextField
                    label="Occasion"
                    value={itemEdit["occasion"] === false ? props.clothingItem.occasion : null}
                    placeholder={itemEdit["occasion"] === true ? props.clothingItem.occasion : null}
                    onChange={(e) => updateValue("occasion", e.nativeEvent.target.value)} />
                <TextField
                    label="Description"
                    value={itemEdit["description"] === false ? props.clothingItem.description : null}
                    placeholder={itemEdit["description"] === true ? props.clothingItem.description : null}
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
                        <h3
                            className='success'
                        >
                            {result.success}
                        </h3>
                    ) : (
                        result.error !== undefined ? (
                            <h3
                                className='error'
                            >
                                Error: {result.error}
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
                    onClick={() => update(props.clothingItem.id)}
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
                            style={{ color: 'darkred', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}
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
                                onClick={() => setDel(false)}
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