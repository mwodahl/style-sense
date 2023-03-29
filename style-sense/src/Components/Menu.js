import React from 'react';
import { View, Card, Flex } from '@aws-amplify/ui-react'
import { IoAdd } from "react-icons/io5";
import { IoShirtSharp } from "react-icons/io5";
import { BsSave2Fill } from "react-icons/bs";
import { RiLightbulbFlashLine } from "react-icons/ri";
import '../css/Menu.css'


function Menu(props) {

    // create a menu component that will be used on the dashboard with aws amplify
    // the menu will have the following options:
    // 1. My Closet
    // 2. Add Outfit
    // 3. Saved Outfits
    // 4. Generate Outfit


    const iconMap = {
        "My Closet": (< IoAdd id={props.selected === "My Closet" ? "menu-icon-selected" : "menu-icon"}  />),
        "Add Outfit": (< IoShirtSharp id={props.selected === "Add Outfit" ? "menu-icon-selected" : "menu-icon"} />),
        "Saved Outfits": (<BsSave2Fill id={props.selected === "Saved Outfits" ? "menu-icon-selected" : "menu-icon"} />),
        "Generate Outfit": (<RiLightbulbFlashLine id={props.selected === "Generate Outfit" ? "menu-icon-selected" : "menu-icon"} />)
    }

    function handleClick(item) {
        props.selected === item ? 
        props.setSelected("") :
        props.setSelected(item)
    }

    return (
        <View
            position="fixed"
            height="90%"
            top="10%"
            width="15%"
            backgroundColor="#F0F6F6"
        >
            <Flex
                height="100%"
                direction='column'
                justifyContent="start"
                gap="0.5rem"
            >
                {["My Closet", "Add Outfit", "Saved Outfits", "Generate Outfit"].map((item) => (
                    <Card
                        marginTop="0.5rem"
                        borderRadius="0.5rem"
                        id={props.selected === item ? "menu-card-selected" : "menu-card"}
                        onClick={() => handleClick(item)}
                        key={item}
                    >
                        <Flex
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            {
                                iconMap[item]
                            }
                            <h3>{item}</h3>
                        </Flex>
                    </Card>))}
            </Flex>
        </View>
    );
}

export default Menu;