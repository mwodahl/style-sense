import React, { useEffect } from 'react';
import { Tabs, TabItem, Card, Image, Button, View, Flex, SelectField, ScrollView } from '@aws-amplify/ui-react'
import { IoAdd } from "react-icons/io5";
import { ImCancelCircle } from 'react-icons/im';
import { BiArrowBack } from 'react-icons/bi';
import '../../css/Shared.css'


function ManualGenerate(props) {

    const titleStyle = {
        position: 'relative',
        marginTop: '-1rem',
        marginBottom: '2rem',
    }

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
                    height="fit-content"
                    width="60%"
                    left="20%"
                    top="30%"
                    backgroundColor="#FFFFFF"
                    borderRadius="10px"
                    boxShadow={'10px 10px 40px 0px #22223b'}
                >
                    <Button
                        height='fit-content'
                        width='fit-content'
                        position={'relative'}
                        marginLeft={'0.5rem'}
                        marginTop={'1rem'}
                        padding='0.5rem'
                        border={'none'}
                        onClick={goBack}
                    >
                        <ImCancelCircle size={'1.5rem'} />
                    </Button>
                    <View
                        textAlign="center"
                        style={titleStyle}
                    >
                        <h2
                            className='header'
                        >
                            Add Outfit
                        </h2 >
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
                            id="add-button"
                        >
                            <IoAdd />
                        </Button>
                    </View>
                    <Tabs
                        position={'relative'}
                        width={'95%'}
                        marginLeft={'auto'}
                        marginRight={'auto'}
                        justifyContent="flex-start"
                    >
                        <TabItem title="Items">
                            {
                                props.items.length === 0 ? (
                                    <View
                                        position="relative"
                                        style={{ marginTop: '4rem', marginBottom: '-2rem' }}
                                        textAlign="center"
                                    >
                                        <h3 className='header'>Select the '+' to add items to outfit.</h3>
                                    </View>
                                ) : (
                                    <ScrollView>
                                        <Flex>
                                            {
                                                props.items.map((item) => (
                                                    /* 
                                                    TODO:
                                                    Add Carousel here..?
                                                    Add Name of item on top of card
                                                    Image w/ source below. 
                                                    */
                                                    <Card>
                                                        <Image
                                                            source={item.image}
                                                        />
                                                        <h3>{item.name}</h3>
                                                    </Card>
                                                ))
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
                        marginBottom="2rem"
                    >
                        <Flex
                            flexDirection="row"
                            justifyContent="space-evenly"
                        >
                            <Button
                                marginTop={"6rem"}
                                onClick={exitWindow}
                                id="cancel-button"
                            >
                                Cancel
                            </Button>
                            <Button
                                marginTop={"6rem"}
                                onClick={saveOutfit}
                                id="add-button"
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
                        borderRadius="10px"
                        boxShadow={'10px 10px 40px 0px #22223b'}
                    >
                        <Button
                            position={'relative'}
                            marginLeft={'0.5rem'}
                            marginTop={'1rem'}
                            border={'none'}
                            onClick={goBack}
                        >
                            <BiArrowBack size={'1.5rem'} />
                        </Button>
                        <View
                        position={'relative'}
                        textAlign="center"
                        marginTop={'-1rem'}
                        >
                        <h2
                        className='header'
                        >
                            Select Item
                        </h2>
                        </View>
                        <Tabs
                            width={'95%'}
                            position={'relatiive'}
                            marginLeft={'auto'}
                            marginRight={'auto'}
                            marginTop={'2rem'}
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