import React from 'react';
import { withAuthenticator, ScrollView } from '@aws-amplify/ui-react'
import { Storage, API } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import '@aws-amplify/ui-react/styles.css'
import NavBar from './Components/NavBar';
import Menu from './Components/Menu'
import AddItem from './Components/add_functionality/AddItem';
import OutfitDecision from './Components/add_functionality/OutfitDecision';
import { useState } from 'react';
import GenerateOutfit from './Components/add_functionality/GenerateOutfit';
import ManualGenerate from './Components/add_functionality/ManualOutfit';
import SavedOutfits from './Components/Display/SavedOutfits';
import MyCloset from './Components/Display/MyCloset';
import ItemView from './Components/ItemView';
import OutfitView from './Components/OutfitView';
import { graphqlOperation } from 'aws-amplify';
import {
  createClothing, deleteClothing, updateClothing,
  createOutfit, updateOutfit, deleteOutfit
} from './graphql/mutations';
import { listClothing, listOutfits } from './graphql/queries';
import './css/Login.css';

function App({ signOut, user }) {

  // navigation state items
  const [selected, setSelected] = useState("");
  const [manualGenerate, setManualGenerate] = useState(null);
  const [generateOutfit, setGenerateOutfit] = useState(null);
  const [weather, setWeather] = useState("")
  const [occasion, setOccasion] = useState("")
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  // boolean for manually add items when generating an outfit
  const [manAddItem, setManAddItem] = useState(false)
  const [item, setItem] = useState({
    "name": null,
    "id": null,
    "type": null,
    "color": null,
    "weather": null,
    "occasion": null,
    "description": null
  })
  const [itemView, setItemView] = useState(null)

  // state for clothing/outfit list
  const [userInfo, setUserInfo] = useState(false)

  // state for outfit items
  const [shoes, setShoes] = useState([])
  const [bottoms, setBottoms] = useState([])
  const [tops, setTops] = useState([])
  const [outerwear, setOuterwear] = useState([])
  const [accessories, setAccessories] = useState([])

  // state for outfits
  const [outfits, setOutfits] = useState([])
  const [outfitItems, setOutfitItems] = useState([])
  const [outfitView, setOutfitView] = useState(null)

  function resetGenerate() {
    setSelected("")
    setManualGenerate(null)
    setGenerateOutfit(null)
    setWeather("")
    setOccasion("")
  }

  // functions to add/delete/update clothing items
  async function addItem() {
    if (
      imageFile !== null &&
      item.name !== null &&
      item.type !== null &&
      item.color !== null &&
      item.weather !== null &&
      item.occasion !== null &&
      item.description !== null
    ) {

      try {
        // here generate image id w/ uuid
        let imgName = uuidv4() + imageFile.name

        await Storage.put(imgName, imageFile, {
          contentType: imageFile.type
        })
        await API.graphql(graphqlOperation(createClothing, {
          input: {
            name: item.name,
            id: imgName,
            type: item.type,
            color: item.color,
            description: item.description,
            occasion: item.occasion.split(","),
            weather: item.weather.split(",")
          }
        }));

        // update user closet information
        await onLogin()

        setImageFile(null)

        return {
          "success": "Item added"
        }
      } catch (err) {
        console.log(err)
        return {
          "error": "Error adding outfit"
        }
      }
    } else {
      return {
        "error": "Missing information"
      }
    }
  }


  async function deleteItem(itemID) {

    // remove item from database on id
    try {
      await API.graphql({
        query: deleteClothing,
        variables: {
          input: {
            id: itemID
          }
        }
      });

      //remove image from s3 bucket
      await Storage.remove(itemID);

      // update user closet information
      await onLogin()

      return {
        "success": "Item deleted successfully"
      }
    } catch (err) {
      console.log(err)
      return {
        "error": "Error deleting item"
      }
    }

  }


  async function updateOutfitItem(itemID) {

    try {
      if (item.name !== null) {
        await API.graphql(graphqlOperation(updateClothing, {
          input: {
            id: item.id,
            name: item.name,
            type: item.type,
            color: item.color,
            description: item.description,
            occasion: item.occasion,
            weather: item.weather
          }
        }))
      }

      // update user closet information
      await onLogin()

      return {
        "success": "Item updated successfully"
      }
    } catch (err) {
      console.log(err)
      return {
        "error": "Error updating item"
      }
    }
  }


  // pulls in user item information
  async function onLogin() {
    const res = await API.graphql({
      query: listClothing
    })

    const outfitRes = await API.graphql({
      query: listOutfits
    })

    // reset clothing lists
    let newShoes = []
    let newBottoms = []
    let newTops = []
    let newOuterwear = []
    let newAccessories = []

    // filter 
    for (const item of res.data.listClothing.items) {
      switch (item.type) {
        case "Shoes":
          newShoes.push(item)
          break;
        case "Bottoms":
          newBottoms.push(item)
          break;
        case "Tops":
          newTops.push(item)
          break;
        case "Outerwear":
          newOuterwear.push(item)
          break;
        case "Accessories":
          newAccessories.push(item)
          break;
        default:
          break;
      }
    }

    // update state with new clothing lists + outfit list
    setShoes(newShoes)
    setBottoms(newBottoms)
    setTops(newTops)
    setOuterwear(newOuterwear)
    setAccessories(newAccessories)
    setOutfits(outfitRes.data.listOutfits.items)

  }


  // functions to add/delete/update outfits
  async function submitOutfit(outfitName) {

    if (outfitItems.length > 0) {
      try {

        let stringArr = []
        for (const item of outfitItems) {
          stringArr.push(item.id)
        }

        const itemId = uuidv4()

        //Creates the outfit
        await API.graphql(graphqlOperation(createOutfit, {
          input: {
            id: itemId,
            name: outfitName,
            items: [...stringArr]
          }
        }));

        // update user closet information
        await updateOutfits()

        return {
          "success": "Outfit Added"
        }

      } catch (err) {
        console.log(err)
        return {
          "error": "Outfit Added"
        }
      }
    }
  }

  async function updateClosetOutfit(name) {
    try {
      let outfitInput = {
        id: outfitView.id,
        name: name === null ? outfitView.name : name,
        items: outfitItems.length > 0 ? outfitItems : outfitView.items
      }

      const res = await API.graphql(graphqlOperation(
        updateOutfit, {
          input: outfitInput
        }
      ))

      console.log(res)

      // update user closet information
      await updateOutfits()

      return {
        "success": "Outfit updated"
      }
    } catch (err) {
      console.log(err)
      return {
        "error": "Error updating outfit"
      }
    }
  }

  async function deleteClosetOutfit() {

    try {
      await API.graphql({
        query: deleteOutfit,
        variables: {
          input: {
            id: outfitView.id
          }
        }
      });

      // update user closet information
      await updateOutfits()

      return {
        "success": "Outfit deleted successfully"
      }

    } catch (err) {
      console.log(err)
      return {
        "error": "Error deleting outfit"
      }
    }

  }


  // pulls back updated outfit list
  async function updateOutfits() {
    try {
      const res = await API.graphql({
        query: listOutfits
      })

      setOutfits(res.data.listOutfits.items)
    } catch (err) {
      console.log(err)
    }
  }


  // pull in user info after login
  if (!userInfo) {
    setUserInfo(true)
    onLogin()
  }


  return (
    <div>
      <NavBar
        User={user.username}
        SignOut={signOut}
      />
      <Menu
        selected={selected}
        setSelected={setSelected}
      />
      <ScrollView
        height={'fit-content'}
        width={'fit-content'}
      >
        <SavedOutfits
          savedOutfits={outfits}
          setOutfitView={setOutfitView}


        />
        <MyCloset
          shoes={shoes}
          bottoms={bottoms}
          tops={tops}
          outerwear={outerwear}
          accessories={accessories}
          setItemView={setItemView}
        />
      </ScrollView>
      {
        itemView !== null ? (
          <ItemView
            clothingItem={itemView}
            setImageFile={setImageFile}
            setSelected={setSelected}
            setItem={setItem}
            item={item}
            setItemView={setItemView}
            deleteItem={deleteItem}
            updateItem={updateOutfitItem}
          />
        ) : (
          null
        )
      }
      {
        outfitView !== null ? (
          <OutfitView
            reset={resetGenerate}
            outfit={outfitView}
            setOutfitView={setOutfitView}
            deleteOutfit={deleteClosetOutfit}
            shoes={shoes}
            bottoms={bottoms}
            tops={tops}
            outerwear={outerwear}
            accessories={accessories}
            outfitItems={outfitItems}
            setOutfitItems={setOutfitItems}
            updateOutfit={updateClosetOutfit}
          />
        ) : (
          null
        )
      }
      {
        selected === "Add Item" ? (
          <AddItem
            setSelected={setSelected}
            setImageFile={setImageFile}
            addItem={addItem}
            item={item}
            setItem={setItem}
          />
        ) : (
          null
        )
      }
      {
        (selected === "Add Outfit" && manualGenerate === null) ? (
          <OutfitDecision
            generate={manualGenerate}
            setGenerateOutfit={setManualGenerate}
            setSelected={setSelected}
          />
        ) : (
          null
        )
      }
      {
        (selected === "Add Outfit" && manualGenerate === false) ? (
          <GenerateOutfit
            generate={generateOutfit}
            setGenerateOutfit={setGenerateOutfit}
            setManualGenerate={setManualGenerate}
            weather={weather}
            setWeather={setWeather}
            occasion={occasion}
            setOccasion={setOccasion}
            loading={loading}
            setLoading={setLoading}
            reset={resetGenerate}
            shoes={shoes}
            bottoms={bottoms}
            tops={tops}
            outerwear={outerwear}
            accessories={accessories}
            submitOutfit={submitOutfit}
            setOutfitItems={setOutfitItems}
          />
        ) : (
          (selected === "Add Outfit" && manualGenerate === true) ? (
            <ManualGenerate
              addItem={manAddItem}
              setAddItem={setManAddItem}
              reset={resetGenerate}
              shoes={shoes}
              bottoms={bottoms}
              tops={tops}
              outerwear={outerwear}
              accessories={accessories}
              outfitItems={outfitItems}
              setOutfitItems={setOutfitItems}
              submitOutfit={submitOutfit}
            />
          ) : (
            null
          )
        )
      }
    </div>
  )
}

export default withAuthenticator(App);