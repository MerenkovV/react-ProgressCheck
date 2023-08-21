import axios from "axios";

let initialState = {
  quests: []
};

function configCreate(Met, data) {
  let config = {
    method: `${Met}`,
    maxBodyLength: Infinity,
    url: 'http://reizor.temp.swtest.ru/API/quests',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return config;

}

export const GetQuestActionCreator = (newState) => {

  return (
    {
      type: "GET-QUEST",
      payload: {
        newState: newState
      }
    }
  )
};

export const DelQuestActionCreator = (id) => {

  return (
    {
      type: "DEL-QUEST",
      payload: {
        id: id
      }
    }
  )
};

export const CngQuestActionCreator = (id, newText, complete) => {
  if(complete === false){
    complete = 0;
  }else{
    complete = 1;
  }
  return (
    {
      type: "CNG-QUEST",
      payload: {
        id: id,
        text: newText,
        complete: complete
      }
    }
  )
};

export const AddQuestActionCreator = (Text, Id) => {
  return (
    {
      type: "ADD-QUEST",
      QuestText: Text,
      QuestId: Id
    }
  )
};

const QuestPageReducer = (state = initialState, action) => {

  if (action.type === "ADD-QUEST") {
    //..............................................AXIOS..................

    let data = JSON.stringify({//...................DATA
      'id': action.QuestId,
      'text': action.QuestText
    });

    let configGet = configCreate('post', data)//..........................CONFIG;

    axios.request(configGet)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
    return {
      ...state,
      quests: [...state.quests, { id: action.QuestId, text: action.QuestText, complete: '0' }]
    }
  } else if (action.type === "GET-QUEST") {
    return {
      ...state,
      ...action.payload.newState
    }
  } else if (action.type === "DEL-QUEST") {

    let data = JSON.stringify({
      "id": action.payload.id
    });

    let configGet = configCreate('delete', data);//..........................CONFIG;

    axios.request(configGet)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })

    let stateCopy = { ...state };
      
    stateCopy.quests = [];
    state.quests.map(quest => {
      
      if (action.payload.id !== quest.id) {
        
        stateCopy.quests.push({ id: quest.id, text: quest.text, complete: quest.complete })
      }
    });
    
    return stateCopy;
  }else if (action.type === "CNG-QUEST") {

    let data = JSON.stringify({
      "id": action.payload.id,
      "text": action.payload.text,
      "complete": action.payload.complete
    });

    let configGet = configCreate('patch', data);//..........................CONFIG;

    axios.request(configGet)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })

    let stateCopy = { ...state };

    stateCopy.quests = [];
    state.quests.map(quest => {
      if (action.payload.id !== quest.id) {
        stateCopy.quests.push({ id: quest.id, text: quest.text, complete: quest.complete })
      }else{
        stateCopy.quests.push({ id: quest.id, text: action.payload.text, complete: action.payload.complete })
      }
    });
    return stateCopy;
  }



  return state;
};
//GetApi();

export default QuestPageReducer;