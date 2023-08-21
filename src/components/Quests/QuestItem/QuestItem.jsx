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

  const OnChangeText = () => {
    props.CngQuest(props.id, TextRef.current.value, CheckRef.current.checked)
  }

  return (
    <div>

          <input ref={TextRef} onChange={OnChangeText} type='text' value={props.text} style={{width: "50%"}}/>
        
        <span>---</span>
        {
            complete ? 
            <input onClick={OnChangeText} ref={CheckRef} type='checkbox' checked={true}></input> : <input onClick={OnChangeText} ref={CheckRef} type='checkbox' checked={false}></input>
        }
        <span>---</span>
        <span><button onClick={OnDelete}>Delete</button></span>
    </div>
  )
}
