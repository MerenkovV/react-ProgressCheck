import React, { useRef } from 'react'
import QuestItem from './QuestItem/QuestItem';
import axios from 'axios';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button, TextField } from '@mui/material';


let text;
let LastID;

const handleChange = event => {
    text = event.target.value;
};

let flag = true;

export default function Quests(props) {
    if (flag) {
        
        flag = false;
        axios.get('http://reizor.temp.swtest.ru/API/quests', {}).then((info) => {
            
            let ApiState = {
                quests: [
                    ...info.data
                ]
            }
            
            LastID = info.data[info.data.length - 1].id
            console.log(LastID);
            props.GetQuest(ApiState);
        });
    }
    let QuestElements = props.quests.map((quest, index) => {
        return (<QuestItem id={quest.id} text={quest.text} complete={quest.complete} DelQuest={props.DelQuest} CngQuest={props.CngQuest}/>);
    });

    const ClickPost = () => {
        if(typeof text !== 'undefined'){
            if(text !== ""){
                LastID++;
                props.AddQuest(text, LastID);
                document.getElementById("newPost").value = '';
            }
        }
    };

  return (
    <div>
        <ul>{QuestElements}
        <li style={{listStyleType: "none", marginTop: "30px", maxWidth: '100%'}}><TextField style={{width: '50%'}} size="small" id='newPost' label="Add new task" onChange={handleChange}/><Button variant="contained" onClick={ClickPost}>Post</Button></li>
        </ul>
    </div>
  )
}
