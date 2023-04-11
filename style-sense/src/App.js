import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import '@aws-amplify/ui-react/styles.css'
import NavBar from './Components/NavBar';
import Menu from './Components/Menu'
import MainDisplay from './Components/MainDisplay'
import AddItem from './Components/add_functionality/AddItem';
import OutfitDecision from './Components/add_functionality/OutfitDecision';
import { useState } from 'react';
import GenerateOutfit from './Components/add_functionality/GenerateOutfit';
import ManualGenerate from './Components/add_functionality/ManualOutfit';
import SavedOutfits from './Components/Display/SavedOutfits';
import MyCloset from './Components/Display/MyCloset';
import ItemView from './Components/ItemView';

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

  let data = require('./tmp_schema/data.json')

  console.log(data.user)

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
        // TODO:
        // Here add to database

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

  function userInfo() {
    // 1. Grab user list
    // 2. If user not in list add user to list via POST request
    // 3. Elif user in there then grab all their info.
    // 4. Add to user object in state

    // Filter data

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
      <MainDisplay />
      <SavedOutfits
        savedOutfits={[]}
      />
      <MyCloset
        savedOutfits={["something"]}
      />
      { /* TODO: Remove this + Add appropriately after sytling */}
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