import { createStore } from 'redux';
import { 
    FETCH_ALL_CLASSES, 
    FETCH_ALL_HEROES,
    FETCH_ALL_RACES,
    FETCH_MOST_FAMOUS_HERO,
    FETCH_MOST_FAMOUS_RACE,
    FETCH_MOST_FAMOUS_WEAPON,
    FETCH_FIRST_NAMES,
    FETCH_LAST_NAMES,
    OPEN_HERO_MODAL,
    MODIFY_HERO,
    LOADING 
} from './ActionTypes'

function reducer(state = {}, action) {
    switch (action.type) {
        case FETCH_ALL_CLASSES: return { ...state, classes: action.payload }
        case FETCH_ALL_RACES: return { ...state, races: action.payload }
        case FETCH_ALL_HEROES: return { ...state, heroes: action.payload }
        case FETCH_MOST_FAMOUS_HERO: return { ...state, famousHero: action.payload }
        case FETCH_MOST_FAMOUS_RACE: return { ...state, famousRace: action.payload }
        case FETCH_MOST_FAMOUS_WEAPON: return { ...state, famousWeapon: action.payload }
        case FETCH_FIRST_NAMES: return { ...state, firstNames: action.payload }
        case FETCH_LAST_NAMES: return { ...state, lastNames: action.payload }
        case OPEN_HERO_MODAL: return { ...state, heroModal: action.payload }
        case MODIFY_HERO: return { ...state, hero: action.payload }
        case LOADING: return { ...state, loading: action.payload }
        default: return state
      }
}

let Store = createStore(reducer, {
    races: [],
    classes: [],
    heroes: [],
    firstNames: [],
    lastNames: [],
    famousHero: {},
    famousRace: {},
    famousWeapon: {},
    hero: {},
    heroModal: false,
    loading: true
});


export { Store }