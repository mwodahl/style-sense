import React from 'react';
import { Button, View, Flex, SelectField } from '@aws-amplify/ui-react'
import BarLoader from "react-spinners/BarLoader";
import { ImCancelCircle } from 'react-icons/im';
import '../../css/Shared.css'


function GenerateOutfit(props) {

    function invokeGenerate() {
        props.setGenerateOutfit(true)
        props.setLoading(true)
        setTimeout(generateOutfit, 2000)
        // TODO:
        // generate outfit here.
    }

    function generateOutfit() {
        console.log("outfit generating")
        props.setLoading(false)
    }

    function goBack() {
        props.setGenerateOutfit(null)
    }

    function saveOutfit() {
        console.log("outfit saved")
        props.reset()
    }

    function exitWindow() {
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
                        onChange={(e) => props.setWeather(e.nativeEvent.target.value)}
                    >
                        <option value="Sunny">Sunny</option>
                        <option value="Hot">Hot</option>
                        <option value="Overcast">Overcast</option>
                        <option value="Cold">Cold</option>
                        <option value="Snow">Snowing</option>
                        <option value="Rain">Rainy</option>
                        <option value="Windy">Windy</option>
                    </SelectField>
                    <SelectField
                        label="Occasion"
                        placeholder="Select Occasion"
                        onChange={(e) => props.setOccasion(e.nativeEvent.target.value)}
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
                        onClick={invokeGenerate}>
                        Generate Outfit
                    </Button>
                </Flex>
            </View>
        ) : (
            <View
                position="fixed"
                height="fit-content"
                width="20%"
                padding="1rem"
                left="40%"
                top="30%"
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

                            <BarLoader color={"#4a4e69"} loading={props.loading} width={'100%'} height={'20px'} />
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
                                    marginTop='-0.5rem'
                                >
                                    Outfit Generated!
                                </h3>
                                {
                                    /* Note
                                    * This is where the outfit will be generated.
                                    * So map the outfit here...
                                    * Display images...
                                    * With tabs?
                                    * Or perhaps just a vertical ScrollView
                                    */
                                }

                                <Flex
                                    direction={'row'}
                                    justifyContent={'space-between'}
                                    alignItems={'center'}
                                >
                                    <Button
                                        id="cancel-button"
                                        onClick={invokeGenerate}
                                    >
                                        New Outfit
                                    </Button>
                                    <Button
                                        id="add-button"
                                        onClick={saveOutfit}
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