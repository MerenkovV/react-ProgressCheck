import React from 'react'
import axios from 'axios'
import Get from './Get';

export default function App() {
  axios.get('http://reizor.temp.swtest.ru/API/quests').then(response => {
    console.log(response.data);
  }).catch(error => { console.error(error) })

    return (
      <div>
        <Get text="Hey" />
      </div>
    )

}
