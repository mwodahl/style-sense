import React, { useState } from 'react';
import { Tabs, TabItem, Card, Image, Button, View, Flex, TextField, ScrollView } from '@aws-amplify/ui-react'
import Carousel from "react-elastic-carousel";
import { IoAdd } from "react-icons/io5";
import { ImCancelCircle } from 'react-icons/im';
import { RiSubtractFill } from "react-icons/ri";
import { BarLoader } from 'react-spinners';
import { BiArrowBack } from 'react-icons/bi';
import '../css/Shared.css'
import '../css/Closet.css';

function OutfitView(props) {

    // state variables
    const [addOutfitItem, setAddOutfitItem] = useState(false)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState({})
    const [outfitName, setOutfitName] = useState('')
    const [selectedItem, setSelectedItem] = useState(null)
    const [del, setDel] = useState(false)

    // pulling in the 'env' file
    let bucket = require('../env.json')

    // style objects
    const titleStyle = {
        position: 'relative',
        marginTop: '-1rem',
        marginBottom: '2rem',
    }

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 600, itemsToShow: 2 },
        { width: 900, itemsToShow: 3 },
        { width: 1050, itemsToShow: 4 },
        { width: 1200, itemsToShow: 5 },
    ];


    // returns to add item / clothing view
    function goBack() {
        setAddOutfitItem(false)
    }


    // exits the window
    function exitWindow() {
        props.reset()
        props.setOutfitView(null)
    }

    // saves a generated outfit
    async function saveOutfit() {
        setLoading(true)
        let name = outfitName === '' ? null : outfitName
        let res = await props.updateOutfit(name)
        setResult(res)
        setLoading(false)
    }

    function addItem(newItem) {
        let currItems
        props.outfitItems.length === 0 ?
            currItems = [...props.outfit.items] :
            currItems = [...props.outfitItems]
        currItems.push(newItem.id)
        props.setOutfitItems(currItems)
        setAddOutfitItem(false)
    }

    function selectItem(item) {
        if (item === selectedItem) {
            setSelectedItem(null)
        } else {
            setSelectedItem(item)
        }
    }

    function removeItem() {
        let currItems
        props.outfitItems.length === 0 ?
            currItems = [...props.outfit.items] :
            currItems = [...props.outfitItems]
        let index = currItems.indexOf(selectedItem)
        currItems.splice(index, 1)
        props.setOutfitItems(currItems)
        setSelectedItem(null)
    }

    async function deleteOutfit() {
        console.log('deleting outfit...')
        setLoading(true)
        await props.deleteOutfit()
        setLoading(false)
        props.setOutfitView(null)
    }

    console.log('outfit view props: ', props.outfitItems)
    console.log('outfit items: ', props.outfit.items)

    return (
        addOutfitItem === false ?
            (
                <View
                    position="fixed"
                    height="fit-content"
                    width="60%"
                    left="20%"
                    top="15%"
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
                            View Outfit
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
                            value={outfitName === '' ? props.outfit.name : outfitName}
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
                                    onClick={() => setAddOutfitItem(true)}
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
                                props.outfit.items.length === 0 ? (
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
                                                {
                                                    props.outfitItems.length === 0 ? (
                                                        props.outfit.items.map((item, index) => (
                                                            <Card
                                                                id={selectedItem === item ? "selectedClothingCard" : "clothingCard"}
                                                                key={index}
                                                                onClick={() => selectItem(item)}
                                                            >
                                                                <Image
                                                                    className='responsive'
                                                                    src={bucket.REACT_APP_BUCKET_URL + item}
                                                                />
                                                            </Card>
                                                        ))) : (
                                                        props.outfitItems.map((item, index) => (
                                                            <Card
                                                                id={selectedItem === item ? "selectedClothingCard" : "clothingCard"}
                                                                key={index}
                                                                onClick={() => selectItem(item)}
                                                            >
                                                                <Image
                                                                    className='responsive'
                                                                    src={bucket.REACT_APP_BUCKET_URL + item}
                                                                />
                                                            </Card>
                                                        )))
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
                            flexdirection="row"
                            justifyContent="space-evenly"
                        >
                            <Button
                                onClick={() => setDel(true)}
                                id="cancel-button"
                            >
                                Delete
                            </Button>
                            <Button
                                onClick={saveOutfit}
                                id="add-button"
                            >
                                Save
                            </Button>
                        </Flex>
                    </View>
                    {
                        del === true ? (
                            <View
                                textAlign="center"
                            >
                                <h5
                                    style={{ color: 'darkred', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}
                                >
                                    This operation will delete this outfit from your closet and cannot be undone.
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
                                        onClick={() => deleteOutfit()}
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

                </View >
            )
            : (
                addOutfitItem === true ? (
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

export default OutfitView;