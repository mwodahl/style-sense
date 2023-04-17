import React, { useState } from 'react';
import { Button, View, Flex, SelectField, Tabs, TabItem, Card, Image } from '@aws-amplify/ui-react'
import BarLoader from "react-spinners/BarLoader";
import Carousel from "react-elastic-carousel";
import { ImCancelCircle } from 'react-icons/im';
import '../../css/Shared.css'

function GenerateOutfit(props) {

    // component state objects
    const [weather, setWeather] = useState(null)
    const [occasion, setOccasion] = useState(null)
    const [outfit, setOutfit] = useState({})
    const [loading, setLoading] = useState(false)

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

    // invokes generateOutfit function
    function invokeGenerate() {
        props.setGenerateOutfit(true)
        props.setLoading(true)
        setTimeout(generateOutfit, 2000)
    }

    // generates outfit based on weather and occasion
    function generateOutfit() {
        let shoes = []
        let bottoms = []
        let tops = []
        let outerwear = []
        let accessories = []
        for (let shoe of props.shoes) {
            if (shoe.weather.includes(weather) && shoe.occasion.includes(occasion)) {
                shoes.push(shoe)
            }
        }
        for (let bottom of props.bottoms) {
            if (bottom.weather.includes(weather) && bottom.occasion.includes(occasion)) {
                bottoms.push(bottom)
            }
        }
        for (let top of props.tops) {
            if (top.weather.includes(weather) && top.occasion.includes(occasion)) {
                tops.push(top)
            }
        }
        for (let outer of props.outerwear) {
            if (outer.weather.includes(weather) && outer.occasion.includes(occasion)) {
                outerwear.push(outer)
            }
        }
        for (let accessory of props.accessories) {
            if (accessory.weather.includes(weather) && accessory.occasion.includes(occasion)) {
                accessories.push(accessory)
            }
        }

        let outfit = []
        let shoe = getItem(shoes)
        let bottom = getItem(bottoms)
        let top = getItem(tops)
        let outer = getItem(outerwear)
        let accessory = getItem(accessories)

        if (shoe !== undefined) { outfit.push(shoe) }
        if (bottom !== undefined) { outfit.push(bottom) }
        if (top !== undefined) { outfit.push(top) }
        if (outer !== undefined) { outfit.push(outer) }
        if (accessory !== undefined) { outfit.push(accessory) }

        // 3. generate outfit (Shoe, bottom, top, outerwear)
        // 4. display outfit
        console.log(outfit)
        setOutfit(outfit)
        props.setOutfitItems(outfit)
        props.setLoading(false)
    }

    // returns item from filtered array
    function getItem(arr) {
        let index = Math.floor(Math.random() * arr.length)
        return arr[index]
    }

    function goBack() {
        props.setGenerateOutfit(null)
    }

    // saves generated outfit to database
    async function saveGeneratedOutfit() {
        props.setOutfitItems(outfit)
        setLoading(true)
        let outfitName = weather + ' ' + occasion
        await props.submitOutfit(outfitName)
        setLoading(false)
        props.setOutfitItems([])
        props.reset()
    }

    function exitWindow() {
        props.setOutfitItems([])
        props.reset()
    }

    return (
        props.generate === null ? (

            <View
                position="fixed"
                height="fit-content"
                width="20%"
                left="40%"
                top="30%"
                backgroundColor="#FFFFFF"
                borderRadius="10px"
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
                    position="relative"
                    textAlign="center"
                    marginTop="2rem"
                >
                    <h3
                        className="header"
                    >
                        Please Select Parameters:
                    </h3>
                </View>
                <Flex
                    position="relative"
                    width="90%"
                    height="fit-content"
                    paddingTop="1rem"
                    paddingBottom="1rem"
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center"
                    gap="1rem"
                    marginBottom="2rem"
                >
                    <SelectField
                        label="Weather"
                        placeholder="Select Weather"
                        onChange={(e) => setWeather(e.nativeEvent.target.value)}
                    >
                        <option value="Sunny">Sunny</option>
                        <option value="Hot">Hot</option>
                        <option value="Overcast">Overcast</option>
                        <option value="Cold">Cold</option>
                        <option value="Snowing">Snowing</option>
                        <option value="Rainy">Rainy</option>
                        <option value="Windy">Windy</option>
                    </SelectField>
                    <SelectField
                        label="Occasion"
                        placeholder="Select Occasion"
                        onChange={(e) => setOccasion(e.nativeEvent.target.value)}
                    >
                        <option value="Formal">Formal</option>
                        <option value="Casual">Casual</option>
                        <option value="Sporty">Sporty</option>
                        <option value="Work">Work</option>
                        <option value="Party">Party</option>
                        <option value="Vacation">Vacation</option>
                    </SelectField>
                    <Button
                        position={"relative"}
                        marginTop="1rem"
                        id='add-button'
                        onClick={() => invokeGenerate()}>
                        Generate Outfit
                    </Button>
                </Flex>
            </View>
        ) : (
            <View
                position="fixed"
                height="fit-content"
                width="40%"
                padding="1rem"
                left="30%"
                top="20%"
                backgroundColor="#FFFFFF"
                borderRadius='10px'
                boxShadow={'10px 10px 40px 0px #22223b'}
            >
                {
                    props.loading === true ? (
                        <View
                            display='relative'
                            width='95%'
                            marginLeft='auto'
                            marginRight={'auto'}
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
                                    onClick={goBack} />
                            </Button>
                            <View
                                position="relative"
                                marginBottom={'10rem'}
                                marginTop={'10rem'}
                                width="95%"
                                marginLeft="auto"
                                marginRight="auto"
                            >
                                <BarLoader color={"#4a4e69"} loading={props.loading} width={'100%'} height={'20px'} />
                            </View>
                        </View>
                    ) : (
                        <View>
                            <View
                                display='relative'
                                width='100%'
                                marginLeft='auto'
                                marginRight={'auto'}
                            >
                                <Button
                                    height='fit-content'
                                    width='fit-content'
                                    position={'relative'}
                                    marginLeft={'0.5rem'}
                                    padding='0.5rem'
                                    border={'none'}
                                >
                                    <ImCancelCircle
                                        size={'1.5rem'}
                                        onClick={goBack} />
                                </Button>
                            </View>
                            <View
                                textAlign="center"
                            >
                                <h3
                                    className='header'
                                    display='relative'
                                >
                                    Outfit Generated!
                                </h3>
                                <View
                                    position="relative"
                                    width="90%"
                                    marginLeft="auto"
                                    marginRight="auto"
                                    marginTop="1rem"
                                    marginBottom="1rem"
                                >
                                    <Tabs>
                                        <TabItem title={weather + ' ' + occasion}>
                                            <Carousel breakPoints={breakPoints}>
                                                {
                                                    outfit.map((item, index) => (
                                                        <Card
                                                            id="clothingCard"
                                                            key={index}
                                                        >
                                                            <Image
                                                                className='responsive'
                                                                src={bucket.REACT_APP_BUCKET_URL + item.id}
                                                            />
                                                        </Card>
                                                    ))
                                                }
                                            </Carousel>
                                        </TabItem>
                                    </Tabs>
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
                                    direction={'row'}
                                    justifyContent={'space-evenly'}
                                    alignItems={'center'}
                                    marginBottom={'1rem'}
                                >
                                    <Button
                                        id="cancel-button"
                                        onClick={() => invokeGenerate()}
                                    >
                                        New Outfit
                                    </Button>
                                    <Button
                                        id="add-button"
                                        onClick={() => saveGeneratedOutfit()}
                                    >
                                        Save Outfit
                                    </Button>
                                </Flex>
                            </View>
                        </View>
                    )
                }
            </View>

        )
    )
}

export default GenerateOutfit;