import {
  GET_INFO_REQUEST,
  GET_INFO_FAIL,
  SET_INPUT_VALUE,
  REFRESH_CARD_REQUEST,
  REFRESH_CARD_SUCCESS,
  REFRESH_CARD_FAIL,
  REMOVE_CARD_REQUEST,
  REMOVE_CARD_SUCCESS,
  REMOVE_CARD_FAIL,
  ADD_CARD_TO_LIST,
  ERROR_ACT
} from '../constants/Page';


const initialState = {
  cardsList: [],
  refreshCityId: null,
  removeCityId: null,
  inputValue: '',
  error: ''
};

let cards = localStorage.getItem('city');
if(cards && cards !== '[]'){
  initialState.cardsList = JSON.parse(cards);
} else {
  localStorage.setItem('city', '[]');
}

export default function page(state = initialState, action) {

  switch (action.type) {
    case REFRESH_CARD_REQUEST:
      return { ...state, refreshCityId: action.payload, error: '' };

    case REFRESH_CARD_SUCCESS:
      return { ...state, cardsList: action.payload, error: '' };

    case REFRESH_CARD_FAIL:
      return { ...state, error: action.payload.message};

    case REMOVE_CARD_REQUEST:
      return { ...state, removeCityId: action.payload, error: '' };

    case REMOVE_CARD_SUCCESS:
      return { ...state, cardsList: action.payload, error: '' };

    case REMOVE_CARD_FAIL:
      return { ...state, error: action.payload.message};

    case GET_INFO_REQUEST:
      return { ...state, city: action.payload, fetching: true, error: '' };

    case GET_INFO_FAIL:
      return { ...state, error: action.payload.message, fetching: false, inputValue: '' };

    case SET_INPUT_VALUE:
      return { ...state, inputValue: action.payload};

    case ADD_CARD_TO_LIST:
      return { ...state, cardsList: [...state.cardsList, action.payload], error: '', inputValue: '', fetching: false };

    case ERROR_ACT:
      return { ...state, error: action.payload};
    default:
      return state;

  }

}