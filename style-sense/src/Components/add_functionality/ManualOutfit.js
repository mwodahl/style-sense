import React, { useEffect } from 'react';
import { Tabs, TabItem, Card, Image, Button, View, Flex, SelectField, ScrollView } from '@aws-amplify/ui-react'
import { IoAdd } from "react-icons/io5";
import { ImCancelCircle } from 'react-icons/im';
import { BiArrowBack } from 'react-icons/bi';


function ManualGenerate(props) {

    function goBack() {
         props.setAddItem(false)
    }

    function exitWindow() {
        props.reset()
    }

    function saveOutfit() {
        console.log("outfit saved")
        props.reset()
    }

    function addItem() {
        props.setAddItem(true)
        console.log("item added")
    }

    return (
        props.addItem === false ?
            (
                <View
                    position="fixed"
                    height="40%"
                    width="60%"
                    left="20%"
                    top="30%"
                    backgroundColor="#FFFFFF"
                    borderRadius="10%"
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
                            onClick={exitWindow} />
                    </Button>
                    <View
                        textAlign="center"
                    >
                        <h3>
                            Add Outfit
                        </h3 >
                    </View >
                    <View
                        width="100%"
                        position="relative"
                        marginLeft="auto"
                        marginRight="auto"
                        textAlign="center"
                    >
                        <Button
                            onClick={addItem}
                        >
                            <IoAdd />
                        </Button>
                    </View>
                    <Tabs
                        justifyContent="flex-start"
                    >
                        <TabItem title="Items">
                            {
                                props.items.length === 0 ? (
                                    <View
                                        width="100%"
                                        position="relative"
                                        textAlign="center"
                                    >
                                        <h3>No items in closet</h3>
                                    </View>
                                ) : (
                                    <ScrollView>
                                        <Flex>
                                            {
                                                props.items.length === 0 ?
                                                    <h3>No items in closet</h3> :
                                                    (
                                                        props.items.map((item) => (

                                                            <Card>
                                                                <Image
                                                                    source={item.image}
                                                                />
                                                                <h3>{item.name}</h3>
                                                            </Card>
                                                        )))
                                            }
                                        </Flex>
                                    </ScrollView>
                                )
                            }
                        </TabItem>

                    </Tabs>
                    <View
                        width="100%"
                        position="relative"
                        textAlign="center"
                    >
                        <Flex
                            flexDirection="row"
                            justifyContent="space-evenly"
                        >
                            <Button
                                marginTop={"6rem"}
                                onClick={saveOutfit}
                            >
                                Cancel
                            </Button>
                            <Button
                                marginTop={"6rem"}
                                onClick={saveOutfit}
                            >
                                Save Outfit
                            </Button>
                        </Flex>
                    </View>

                </View >
            )
            : (
                props.addItem === true ? (
                    <View
                        position="fixed"
                        height="40%"
                        width="60%"
                        left="20%"
                        top="30%"
                        backgroundColor="#FFFFFF"
                        borderRadius="10%"
                    >
                        <Button
                            position={'fixed'}
                            top={'1'}
                            left={'1'}
                            border={'none'}
                        >
                            <BiArrowBack
                                width={'1.5rem'}
                                height={'1.5rem'}
                                onClick={goBack} />
                        </Button>
                        <Tabs
                        position={'relatiive'}
                        marginTop = {'2rem'}
                        >
                            <TabItem title="Shoes">
                                {/* TODO: Map props to create cards in here that select that item onClick */}
                            </TabItem>
                            <TabItem title="Bottoms">
                                {/* TODO: Map props to create cards in here that select that item onClick */}
                            </TabItem>
                            <TabItem title="Tops">
                                {/* TODO: Map props to create cards in here that select that item onClick */}
                            </TabItem>
                            <TabItem title="Jackets">
                                {/* TODO: Map props to create cards in here that select that item onClick */}
                            </TabItem>
                            <TabItem title="Accessories">
                                {/* TODO: Map props to create cards in here that select that item onClick */}
                            </TabItem>
                        </Tabs>
                    </View>
                ) : (
                    null
                )
            )

    )
}

export default ManualGenerate;