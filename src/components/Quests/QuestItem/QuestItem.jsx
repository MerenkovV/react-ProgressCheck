import { Button, Checkbox, Input } from '@mui/material';
import React from 'react'
let complete = false;



export default function QuestItem(props) {
  const TextRef = React.createRef();
  const CheckRef = React.createRef();
  
  if(props.complete == 0){
    complete = false;
  }else{
    complete = true;
  }
  const OnDelete = () => {
    props.DelQuest(props.id);
  }

  const OnChangeText = (e) => {
    props.CngQuest(props.id, e.target.value, complete)
  }

  const OnChangeCheck = (e) => {
    props.CngQuest(props.id, props.text, e.target.checked)
  }

  return (
    <li style={{listStyleType: "none", marginBottom: "10px"}}>
        <Input
          required
          ref={TextRef}
          value={props.text}
          onChange={OnChangeText}
          style={{width: "50%"}}
        />
        {
            complete ? 
            <Checkbox onClick={OnChangeCheck} ref={CheckRef} checked={true}/> : <Checkbox onClick={OnChangeCheck} ref={CheckRef} checked={false}/>
        }
        <Button onClick={OnDelete} variant="outlined">Delete</Button>
    </li>
  )
}
