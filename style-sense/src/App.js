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

  let data = require('./tmp_schema/data.json')

  function resetGenerate() {
    setSelected("")
    setManualGenerate(null)
    setGenerateOutfit(null)
    setWeather("")
    setOccasion("")
  }

  async function addItem() {

    if (
      // TODO:
      // Add back in id generation here
      imageFile !== null &&
      item.name !== null &&
      item.type !== null &&
      item.color !== null &&
      item.weather !== null &&
      item.occasion !== null &&
      item.description !== null
    ) {
      try {
        console.log(imageFile.toString())
        console.log(item)

        // TODO:
        // here generate image id w/ uuid
        // let imgName = uuidv4()
        // console.log(imgName)

        const result = await Storage.put(imageFile.name, imageFile, {
          contentType: imageFile.type
        })
        await API.graphql(graphqlOperation(createClothing, {
          input: {
            name: item.name,
            type: item.type,
            color: item.color,
            description: item.description,
            occasion: item.occasion.split(","),
            weather: item.weather.split(",")
          }
        }));
        

        // TODO:
        // Here add to database
        console.log(user.username)
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

    // TODO: 
    // update user info here...
  }

  async function deleteItem() {
    //remove on id
    const deletedItem = await API.graphql({
      query: deleteClothing,
      variables: {
        input: {
          id: "YOUR_RECORD_ID"
        }
      }
    });
    //remove image
    await Storage.remove("name");
  }

  async function updateOutfitItem() {
    //make sure you have the id
    await API.graphql(graphqlOperation(updateClothing, {
      input: {
        id: "ADD ID HERE",
        name: item.name,
        type: item.type,
        color: item.color,
        description: item.description,
        occasion: item.occasion.split(","),
        weather: item.weather.split(",")
      }
    }));
    //everything but storage
    // TODO: Update image
  }

  async function onLogin() {
    //query all clothes
    //seperate by type (top, bottom, jacket)
    const vars = {
      filter: {
        type: {
          eq: "Shirt"
        }
      }
    }
    const res = await API.graphql({
      query: listClothing,
      variables: vars
    });
    console.log(res)
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
        clothes={["something"]}
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
            addItem={addItem} />
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