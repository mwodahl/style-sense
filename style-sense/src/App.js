import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react'
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
import { graphqlOperation } from 'aws-amplify';
import { createClothing, deleteClothing, deleteOutfit, updateClothing, createOutfitItem } from './graphql/mutations';
import { listClothing } from './graphql/queries';

function App({ signOut, user }) {

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


  function resetGenerate() {
    setSelected("")
    setManualGenerate(null)
    setGenerateOutfit(null)
    setWeather("")
    setOccasion("")
  }

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
          "error": "Error adding item"
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
      const deletedItem = await API.graphql({
        query: deleteClothing,
        variables: {
          input: {
            id: itemID
          }
        }
      });

      console.log(deletedItem)

      //remove image from s3 bucket
      const res = await Storage.remove(itemID);

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


  async function onLogin() {
    const res = await API.graphql({
      query: listClothing
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

    setShoes(newShoes)
    setBottoms(newBottoms)
    setTops(newTops)
    setOuterwear(newOuterwear)
    setAccessories(newAccessories)

  }


  async function createOutfit() {
    //Creates the outfit
    const outfit = await API.graphql(graphqlOperation(createOutfit, {
      input: {
        name: "My First Fit!"
      }
    }));

    // Must do this for every clothing item (maybe for loop for each clothing item) 
    await API.graphql(graphqlOperation(createOutfitItem, {
      input: {
        clothingId: "ID",
        outfitId: outfit.data.createOutfit.id
      }
    }));
  }


  async function deleteOutfit() {
    const deletedItem = await API.graphql({
      query: deleteOutfit,
      variables: {
        input: {
          id: "YOUR_RECORD_ID"
        }
      }
    });
  }

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
      <SavedOutfits
        savedOutfits={[]}
      />
      <MyCloset
        shoes={shoes}
        bottoms={bottoms}
        tops={tops}
        outerwear={outerwear}
        accessories={accessories}
        setItemView={setItemView}
      />
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
          />
        ) : (
          (selected === "Add Outfit" && manualGenerate === true) ? (
            <ManualGenerate
              items={[]}
              addItem={manAddItem}
              setAddItem={setManAddItem}
              reset={resetGenerate}
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