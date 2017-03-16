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


import Client from '../utils/Client';
import { refreshLocalCity, removeLocalCity } from '../utils/localStorageActions';


function getCityData(cityName, dispatch) {
  Client.search(cityName, (data) => {

    if (data.error) {
      dispatch({
        type: GET_INFO_FAIL,
        payload: new Error(data.error)
      })
    } else {
      let cityIsExist = false;
      let localCity = localStorage.getItem('city');
      localCity = JSON.parse(localCity);
      if(localCity){
        localCity.forEach((city) => {
          if (city.id === data.id) {
            cityIsExist = true;
          }
        });
      }

      if (!cityIsExist) {
        localCity.push(data);
        localStorage.city = JSON.stringify(localCity);
        dispatch({
          type: ADD_CARD_TO_LIST,
          payload: data
        });
      } else {
        dispatch({
          type: GET_INFO_FAIL,
          error: true,
          payload: new Error('city already exist')
        })
      }
    }
  })
}


function refreshCityById(cityId, cardsList, dispatch) {
  Client.refreshCard(cityId, (data) => {
    if(data.error){
      dispatch({
        type: REFRESH_CARD_FAIL,
        payload: new Error(data.error)
      })
    } else {
      refreshLocalCity(data, function(err, localList) {
        if(!err){
          let buf = [];
          cardsList.forEach((card) => {
            if(card.id === cityId){
              buf.push(data);
            } else {
              buf.push(card)
            }
          });
          dispatch({
            type: REFRESH_CARD_SUCCESS,
            payload: buf
          })
        } else {
          dispatch({
            type: REFRESH_CARD_FAIL,
            payload: new Error(err)
          })
        }
      })
    }
  })
}

function removeById(cityId, cardsList, dispatch) {
  removeLocalCity(cityId, function(err, result) {
    if(!err){
      let cleanedList = [];
      cardsList.forEach((card) => {
        if(card.id !== cityId){
          cleanedList.push(card);
        }
      });
      dispatch({
        type: REMOVE_CARD_SUCCESS,
        payload: cleanedList
      })
    } else {
      dispatch({
        type: REMOVE_CARD_FAIL,
        payload: new Error(err)
      })
    }
  })

}

export function refreshCity(cityId ,cardsList) {
  return (dispatch) => {
    dispatch({
      type: REFRESH_CARD_REQUEST,
      action: cityId
    });
    refreshCityById(cityId, cardsList, dispatch);
  };
}

export function removeCity(cityId ,cardsList) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_CARD_REQUEST,
      payload: cityId
    });
    removeById(cityId, cardsList, dispatch);
  }
}

export function getCityWeather(cityName) {
  return (dispatch) => {
    dispatch({
      type: GET_INFO_REQUEST,
      payload: cityName
    });
    getCityData(cityName, dispatch);
  }
}

export function setInputValue(inputValue) {
  return (dispatch) => {
    dispatch({
      type: SET_INPUT_VALUE,
      payload: inputValue
    })
  }
}

export function errorAction(action) {
  return (dispatch) => {
    dispatch({
      type: ERROR_ACT,
      payload: action
    })
  }
}
