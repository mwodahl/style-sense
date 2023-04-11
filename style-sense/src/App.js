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

function App({ signOut, user }) {

  const [selected, setSelected] = useState("");
  const [manualGenerate, setManualGenerate] = useState(null);
  const [generateOutfit, setGenerateOutfit] = useState(null);
  const [weather, setWeather] = useState("")
  const [occasion, setOccasion] = useState("")
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [manAddItem, setManAddItem] = useState(false)

  function resetGenerate() {
    setSelected("")
    setManualGenerate(null)
    setGenerateOutfit(null)
    setWeather("")
    setOccasion("")
  }

  async function addItem() {
    // validate everything up here
    // if valid then do else setError

    let imgName = uuidv4()
    console.log(imgName)

    try {
      const result = await Storage.put(imageFile.name, imageFile, {
        contentType: imageFile.type
      })
      console.log(result)
    } catch (err) {
      console.log(err)
    }
    // TODO:
    // if imageFile is null, then don't add item.
    // if imageFile is not null, then add item.

    // add to database

    // update user information
  }

  function userInfo() {
    // 1. Grab user list
    // 2. If user not in list add user to list via POST request
    // 3. Elif user in there then grab all their info.
    // 4. Add to user object in state

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
      savedOutfits={["idfk"]}
      />
      {
        selected === "Add Item" ? (
          <AddItem
            setSelected={setSelected}
            setImageFile={setImageFile}
            addItem={addItem}
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