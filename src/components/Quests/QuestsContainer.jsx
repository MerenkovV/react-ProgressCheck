import { AddQuestActionCreator, CngQuestActionCreator, DelQuestActionCreator, GetQuestActionCreator } from '../../redux/QuestPageReducer'
import { connect } from 'react-redux'
import Quests from './Quests';


let mapStateToProps = (state) => {
    return{
        quests: state.questPage.quests
    }
};

let mapDispatchToProps = (dispatch) => {
    return{
      AddQuest: (Text, Id) => {
        dispatch(AddQuestActionCreator(Text, Id))
      },
      GetQuest: (newState) => {
        dispatch(GetQuestActionCreator(newState))
      },
      DelQuest: (id) => {
        dispatch(DelQuestActionCreator(id))
      },
      CngQuest: (id, text, complete) => {
        dispatch(CngQuestActionCreator(id, text, complete))
      },
    }
  };

const QuestsContainer = connect(mapStateToProps, mapDispatchToProps)(Quests);

export default QuestsContainer;