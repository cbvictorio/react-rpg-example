import { Store } from '../store'
import { useFetch } from './useFetch'
import { 
    FETCH_ALL_RACES,
    FETCH_ALL_CLASSES,
    FETCH_ALL_HEROES,
    FETCH_MOST_FAMOUS_HERO,
    FETCH_MOST_FAMOUS_RACE,
    FETCH_MOST_FAMOUS_WEAPON,
    FETCH_FIRST_NAMES,
    FETCH_LAST_NAMES
} from '../store/ActionTypes'


const fetchRaces = async () => {
    const races = await useFetch('/races')
    Store.dispatch({ type: FETCH_ALL_RACES, payload: races.data })
}
const fetchClasses = async () => {
    const classes = await useFetch('/classes')
    Store.dispatch({ type: FETCH_ALL_CLASSES, payload: classes.data })
}
const fetchHeroes = async () => {
    const heroes = await useFetch('/heroes')
    await fetchMostFamousHero()
    await fetchMostFamousRace()
    await fetchMostFamousWeapon()
    Store.dispatch({ type: FETCH_ALL_HEROES, payload: heroes.data })
}
const fetchMostFamousHero = async () => {
    const mostFamousHero = await useFetch('/heroes/famous')
    Store.dispatch({ type: FETCH_MOST_FAMOUS_HERO, payload: mostFamousHero.data })
}
const fetchMostFamousRace = async () => {
    const mostFamousRace = await useFetch('/races/famous')
    Store.dispatch({ type: FETCH_MOST_FAMOUS_RACE, payload: mostFamousRace.data[0] })
}
const fetchMostFamousWeapon = async () => {
    const mostFamousWeapon = await useFetch('/weapon/famous')
    Store.dispatch({ type: FETCH_MOST_FAMOUS_WEAPON, payload: mostFamousWeapon.data })
}

const fetchFirstNames = async () => {
    const fistNames = await useFetch('/first-names')
    Store.dispatch({ type: FETCH_FIRST_NAMES, payload: fistNames.data })
}

const fetchLastNames = async () => {
    const lastNames = await useFetch('/last-names')
    Store.dispatch({ type: FETCH_LAST_NAMES, payload: lastNames.data })
}

const createHero = async (hero) => {
    await useFetch('/heroes', 'POST', hero)
    await fetchHeroes()
}

const updateHero = async (hero) => {
    await useFetch(`/heroes/${hero.id}`, 'PUT', hero)
    await fetchHeroes()
}

const deleteHero = async (id) => {
    await useFetch(`/heroes/${id}`, 'DELETE')
    await fetchHeroes()
}

export {
    fetchRaces,
    fetchClasses,
    fetchHeroes,
    fetchMostFamousHero,
    fetchMostFamousRace,
    fetchMostFamousWeapon,
    fetchFirstNames,
    fetchLastNames,
    createHero,
    updateHero,
    deleteHero
}