import React from 'react';
import { View, Card, Flex } from '@aws-amplify/ui-react'
import { IoAdd } from "react-icons/io5";
import { IoShirtSharp } from "react-icons/io5";
import '../css/Menu.css'


function Menu(props) {

    // create a map of icons to be used in the menu
    const iconMap = {
        "Add Item": (< IoAdd id="menu-icon" />),
        "Add Outfit": (< IoShirtSharp id="menu-icon" />),
    }

    // if the selected item is the same as the item that was clicked, then set the selected item to ""
    // else set the selected item to the item that was clicked
    function handleClick(item) {
        props.selected === item ?
            props.setSelected("") :
            props.setSelected(item)
    }

    // return the menu component
    return (
        <View
            position="fixed"
            height="90%"
            top="10%"
            width="15%"
            backgroundColor="#F9E0D9"
        >
            <Flex
                height="100%"
                direction='column'
                justifyContent="start"
                gap="0rem"
            >
                {["Add Item", "Add Outfit"].map((item) => (
                    <Card
                        paddingTop="0.5rem"
                        id={props.selected === item ? "menu-card-selected" : "menu-card"}
                        onClick={() => handleClick(item)}
                        key={item}
                        className='menuCard'
                    >
                        <Flex
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            {
                                iconMap[item]
                            }
                            <h3
                                className="text"
                            >{item}</h3>
                        </Flex>
                    </Card>))}
            </Flex>
        </View>
    );
}

export default Menu;