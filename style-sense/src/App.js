import React from 'react';
import { withAuthenticator} from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import NavBar from './Components/NavBar';
import Menu from './Components/Menu'
import MainDisplay from './Components/MainDisplay'
import { useState } from 'react';

function App({signOut, user }) {

  const [selected, setSelected] = useState("");

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
      <MainDisplay/>
    </div>
  )
}

export default withAuthenticator(App);