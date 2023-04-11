import React from 'react';
import { Button, View, Flex, SelectField } from '@aws-amplify/ui-react'
import BarLoader from "react-spinners/BarLoader";
import { ImCancelCircle } from 'react-icons/im';


function GenerateOutfit(props) {

    function invokeGenerate() {
        console.log("invoke called!")
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
                height="40%"
                width="20%"
                left="40%"
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
                    marginTop="2rem"
                >
                    <h3>
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
                        marginTop="2rem"
                        onClick={invokeGenerate}>
                        Generate Outfit
                    </Button>
                </Flex>
            </View>
        ) : (
            <View
                position="fixed"
                height="fit-content"
                width="fit-content"
                left="40%"
                top="30%"
                backgroundColor="#FFFFFF"
                borderRadius="10%">
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
                {
                    props.loading === true ? (
                        <BarLoader color={"#123abc"} loading={props.loading} size={150} />
                    ) : (
                        <View>

                            <Button
                                onClick={goBack}
                            >
                                Back
                            </Button>
                            <h3>
                                Outfit Generated!
                            </h3>
                            <Button
                                onClick={invokeGenerate}
                            >
                                New Outfit
                            </Button>
                            <Button
                                onClick={saveOutfit}
                            >
                                Save Outfit
                            </Button>
                        </View>
                    )
                }
            </View>

        )
    )
}

export default GenerateOutfit;