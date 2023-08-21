import React, { useRef } from 'react'
import QuestItem from './QuestItem/QuestItem';
import axios from 'axios';

let text;
let LastID;

const handleChange = event => {
    text = event.target.value;
};

const input = React.createRef();

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
                input.current.value = '';
            }
        }
    };

  return (
    <div>
        <p>{QuestElements}</p>
        <div><input ref={input} type="text" onChange={handleChange}/><button onClick={ClickPost}>Post</button></div>
    </div>
  )
}
