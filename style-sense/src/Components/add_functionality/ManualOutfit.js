import React, { useState } from 'react';
import { Tabs, TabItem, Card, Image, Button, View, Flex, TextField, ScrollView } from '@aws-amplify/ui-react'
import Carousel from "react-elastic-carousel";
import { IoAdd } from "react-icons/io5";
import { RiSubtractFill } from "react-icons/ri";
import { ImCancelCircle } from 'react-icons/im';
import { BarLoader } from 'react-spinners';
import { BiArrowBack } from 'react-icons/bi';
import '../../css/Shared.css'
import '../../css/Closet.css';

function ManualGenerate(props) {

    // component state objects
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState({})
    const [outfitName, setOutfitName] = useState('')
    const [selectedItem, setSelectedItem] = useState(null)

    // import 'env' file
    let bucket = require('../../env.json')

    // component style objects
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 600, itemsToShow: 2 },
        { width: 900, itemsToShow: 3 },
        { width: 1050, itemsToShow: 4 },
        { width: 1200, itemsToShow: 5 },
    ];

    const titleStyle = {
        position: 'relative',
        marginTop: '-1rem',
        marginBottom: '2rem',
    }

    // returns to add item / clothing view
    function goBack() {
        props.setAddItem(false)
    }

    // exits the window
    function exitWindow() {
        props.reset()
        props.setOutfitItems([])
    }

    // submits outfit to database
    async function saveOutfit() {
        setLoading(true)
        let res = await props.submitOutfit(outfitName)
        setResult(res)
        setLoading(false)
    }

    // adds item to outfit
    function addItem(newItem) {
        let currItems = [...props.outfitItems]
        currItems.push(newItem)
        props.setOutfitItems(currItems)
        props.setAddItem(false)
    }

    // sets selected item
    function selectItem(item) {
        if (item === selectedItem) {
            setSelectedItem(null)
        } else {
            setSelectedItem(item)
        }
    }

    // removes selected item from outfit
    function removeItem() {
        let currItems = [...props.outfitItems]
        let index = currItems.indexOf(selectedItem)
        currItems.splice(index, 1)
        props.setOutfitItems(currItems)
        setSelectedItem(null)
    }

    return (
        props.addItem === false ?
            (
                <ScrollView
                    position="fixed"
                    height="fit-content"
                    width="60%"
                    left="20%"
                    top="25%"
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
                        onClick={exitWindow}
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
                        width="40%"
                        position="relative"
                        marginLeft="auto"
                        marginRight="auto"
                        marginTop="-0.5rem"
                        marginBottom="2rem"
                        textAlign="center"
                    >
                        <TextField
                            placeholder="Enter a name for your outfit"
                            value={outfitName === '' ? null : outfitName}
                            onChange={(e) => setOutfitName(e.nativeEvent.target.value)}
                        />
                    </View>
                    <View
                        width="100%"
                        position="relative"
                        marginLeft="auto"
                        marginRight="auto"
                        textAlign="center"
                    >
                        {
                            selectedItem === null ? (
                                <Button
                                    onClick={() => props.setAddItem(true)}
                                    id="add-button"
                                >
                                    <IoAdd />
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => removeItem()}
                                    id="cancel-button"
                                >
                                    <RiSubtractFill />
                                </Button>
                            )
                        }
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
                                props.outfitItems.length === 0 ? (
                                    <View
                                        position="relative"
                                        style={{ marginTop: '4rem', marginBottom: '4rem' }}
                                        textAlign="center"
                                    >
                                        <h3 className='header'>Select the '+' to add items to outfit.</h3>
                                    </View>
                                ) : (
                                    <ScrollView>
                                        <Flex>
                                            <Carousel breakPoints={breakPoints}>
                                                {props.outfitItems.map((item, index) => (
                                                    <Card
                                                        id={selectedItem === item ? "selectedClothingCard" : "clothingCard"}
                                                        key={index}
                                                        onClick={() => selectItem(item)}
                                                    >
                                                        <Image
                                                            className='responsive'
                                                            src={bucket.REACT_APP_BUCKET_URL + item.id}
                                                        />
                                                    </Card>
                                                ))
                                                }
                                            </Carousel>
                                        </Flex>
                                    </ScrollView>
                                )
                            }
                        </TabItem>

                    </Tabs>

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
                                onClick={exitWindow}
                                id="cancel-button"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={saveOutfit}
                                id="add-button"
                            >
                                Save Outfit
                            </Button>
                        </Flex>
                    </View>

                </ScrollView >
            )
            : (
                props.addItem === true ? (
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
                                {
                                    props.shoes.length === 0 ? (
                                        <View
                                            marginTop="5rem"
                                            marginBottom="5rem"
                                            textAlign="center"
                                            className='header'
                                        >
                                            <h3> No shoes in closet </h3>
                                        </View>
                                    ) : (
                                        <Carousel breakPoints={breakPoints}>
                                            {
                                                props.shoes.map((item, index) => (
                                                    <Card
                                                        id="clothingCard"
                                                        key={index}
                                                        onClick={() => addItem(props.shoes[index])}
                                                    >
                                                        <Image
                                                            className='responsive'
                                                            src={bucket.REACT_APP_BUCKET_URL + item.id}
                                                        />
                                                    </Card>
                                                ))
                                            }
                                        </Carousel>
                                    )
                                }
                            </TabItem>
                            <TabItem title="Bottoms">
                                {
                                    props.bottoms.length === 0 ? (
                                        <View
                                            marginTop="5rem"
                                            marginBottom="5rem"
                                            textAlign="center"
                                            className='header'
                                        >
                                            <h3> No bottoms in closet </h3>
                                        </View>
                                    ) : (
                                        <Carousel breakPoints={breakPoints}>
                                            {
                                                props.bottoms.map((item, index) => (
                                                    <Card
                                                        id="clothingCard"
                                                        key={index}
                                                        onClick={() => addItem(props.bottoms[index])}
                                                    >
                                                        <Image
                                                            className='responsive'
                                                            src={bucket.REACT_APP_BUCKET_URL + item.id}
                                                        />
                                                    </Card>
                                                ))
                                            }
                                        </Carousel>
                                    )
                                }
                            </TabItem>
                            <TabItem title="Tops">
                                {
                                    props.tops.length === 0 ? (
                                        <View
                                            marginTop="5rem"
                                            marginBottom="5rem"
                                            textAlign="center"
                                            className='header'
                                        >
                                            <h3> No tops in closet </h3>
                                        </View>
                                    ) : (
                                        <Carousel breakPoints={breakPoints}>
                                            {
                                                props.tops.map((item, index) => (
                                                    <Card
                                                        id="clothingCard"
                                                        key={index}
                                                        onClick={() => addItem(props.tops[index])}
                                                    >
                                                        <Image
                                                            className='responsive'
                                                            src={bucket.REACT_APP_BUCKET_URL + item.id}
                                                        />
                                                    </Card>
                                                ))
                                            }
                                        </Carousel>
                                    )
                                }
                            </TabItem>
                            <TabItem title="Outerwear">
                                {
                                    props.outerwear.length === 0 ? (
                                        <View
                                            marginTop="5rem"
                                            marginBottom="5rem"
                                            textAlign="center"
                                            className='header'
                                        >
                                            <h3> No outerwear in closet </h3>
                                        </View>
                                    ) : (
                                        <Carousel breakPoints={breakPoints}>
                                            {
                                                props.outerwear.map((item, index) => (
                                                    <Card
                                                        id="clothingCard"
                                                        key={index}
                                                        onClick={() => addItem(props.outerwear[index])}
                                                    >
                                                        <Image
                                                            className='responsive'
                                                            src={bucket.REACT_APP_BUCKET_URL + item.id}
                                                        />
                                                    </Card>
                                                ))
                                            }
                                        </Carousel>
                                    )
                                }
                            </TabItem>
                            <TabItem title="Accessories">
                                {
                                    props.accessories.length === 0 ? (
                                        <View
                                            marginTop="5rem"
                                            textAlign="center"
                                            className='header'
                                        >
                                            <h3> No accessories in closet </h3>
                                        </View>
                                    ) : (
                                        <Carousel breakPoints={breakPoints}>
                                            {
                                                props.accessories.map((item, index) => (
                                                    <Card
                                                        id="clothingCard"
                                                        key={index}
                                                        onClick={() => addItem(props.accessories[index])}
                                                    >
                                                        <Image
                                                            className='responsive'
                                                            src={bucket.REACT_APP_BUCKET_URL + item.id}
                                                        />
                                                    </Card>
                                                ))
                                            }
                                        </Carousel>
                                    )
                                }
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