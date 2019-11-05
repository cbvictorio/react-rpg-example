import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { OPEN_HERO_MODAL, MODIFY_HERO } from '../../store/ActionTypes'
import { Dropdown } from '../Dropdown'
import { Store } from '../../store'
import { generateStatsArray, randomStatGenerator } from '../../utils/statsGenerator'
import { createHero, updateHero } from '../../utils/fetchMethods'
import { 
    Modal,
    Container, 
    Title, 
    CloseButton,
    ButtonContainer,
    CreateUpdateButton,
    DiscardButton,
    StatContainer,
    DiceButton,
    StatTitle,
    RandomButton
} from './styles'

const useInput = initialValue => {
    const [value, setValue] = useState(initialValue)
    const onChange = e => setValue(e.target.value)
    return { value, onChange, setValue }
}

const FormComponent = ({ onCreate = () => {}, hero = {}, races = [], classes = [], firstNames = [], lastNames = [], heroModal = false }) => {
    const firstName = useInput(hero.first_name)
    const lastName = useInput(hero.last_name)
    const [weapon, setWeapon] = useState(hero.weapon)
    const [race, setRace] = useState(hero.race)
    const [possibleClasses, setPossibleClasses] = useState([])
    const [possibleWeapons, setPossibleWeapons] = useState([])
    const [heroClass, setHeroClass] = useState(hero.class)
    const [strength, setStrength] = useState([])
    const [dexterity, setDexterity] = useState([])
    const [intelligence, setIntelligence] = useState([])
    const [random, setRandom] = useState(false)

    
    const handleSetRace = item => {
        setRace(item)
        setPossibleClasses(item.possible_classes || [])
        setHeroClass(null)
        setPossibleWeapons([])
        setWeapon(null)
        firstName.setValue(null)
        lastName.setValue(null)
    }

    const handleSetClass = item => {
        const id = item.id
        const findClass = classes.find(x => x.id === id)
        setHeroClass(item)
        setPossibleWeapons(findClass.possible_weapons)
        setWeapon(null)
    }

    const handleDiscard = () => {
        firstName.setValue(null)
        lastName.setValue(null)
        setWeapon(null)
        setRace(null)
        setPossibleClasses([])
        setPossibleWeapons([])
        setHeroClass(null)
        setStrength([])
        setDexterity([])
        setIntelligence([])
        setRandom(false)
    }

    const handleSelectFirstName = (firstNameItem) => {
        if (!race) return alert('You must pick a race first')
        firstName.setValue(firstNameItem)
    }

    const handleSelectLastName = (lastNameItem) => {
        if (!race) return alert('You must pick a race first')
        if (!firstName.value) return alert('You must pick a first name before the last name.')
        lastName.setValue(lastNameItem)
    }

    const handleCloseModal = () => {
        handleDiscard()
        Store.dispatch({ type: OPEN_HERO_MODAL, payload: false })
        Store.dispatch({ type: MODIFY_HERO, payload: {} })
    }

    const handleSetStrength = () => random ? null : (hero.id ? null : setStrength(generateStatsArray()))
    const handleSetDexterity = () => random ? null : (hero.id ? null : setDexterity(generateStatsArray()))
    const handleSetIntelligence = () => random ? null : (hero.id ? null : setIntelligence(generateStatsArray()))

    useEffect(() => {
        if (hero.id) {
            const possibleClasses = races.find(race => hero.race[0].id === race.id).possible_classes
            const possibleWeapons = classes.find(heroClass => hero.class[0].id === heroClass.id).possible_weapons
            firstName.setValue({ name: hero.first_name })
            lastName.setValue({ name: hero.last_name })
            setWeapon(hero.weapon[0])
            setRace(hero.race[0])
            setHeroClass(hero.class[0])
            setPossibleClasses(possibleClasses)
            setPossibleWeapons(possibleWeapons)
        }
    }, [hero])

    const generateRandomRace = () => races[randomStatGenerator(0, races.length)]

    const generateRandomClass = classes => classes[randomStatGenerator(0, classes.length)]

    const generateRandomWeapon = weapons => weapons[randomStatGenerator(0, weapons.length)]

    const generateRandomFirstName = (generatedRace) => {
        const position = randomStatGenerator(0, firstNames.length)
        const firstName = firstNames[position]
        if (generatedRace.name === 'Dwarf') {
            const firstNameIsValid = firstName.name.toLowerCase().split('').indexOf('r') !== -1
            if (!firstNameIsValid) return generateRandomFirstName(generatedRace)
        }
        return firstName
    }

    const generateRandomLastName = (generatedRace, generatedFirstName) => {
        const position = randomStatGenerator(0, lastNames.length)
        const lastName = lastNames[position]
        switch (generatedRace.name) {
            case 'Half-Orc':
            case 'Dragonborn': {
                return undefined
            }
            case 'Elf': {
                const mirrored = generatedFirstName.name.toLowerCase().split('').reverse().join('')
                const capitalized = mirrored.split('').map((x, i) => i === 0 ? x.toUpperCase() : x.toLowerCase()).join('')
                return capitalized
            }
            case 'Dwarf': {
                const firstNameIsValid = lastName.name.toLowerCase().split('').indexOf('r') !== -1
                if (!firstNameIsValid) return generateRandomLastName(generatedRace, generatedFirstName)
            }
            default: return lastName
        }
    }

    const createUpdate = async () => {
        
        let customHero = {}

        if (!random && (!firstName.value || !race.id || !heroClass.id || !weapon.id)) {
            return alert('You must fill all the information of the hero')
        }


        if (hero.id) {
            // Modify or update a hero
            const modifiedHero = {
                id: hero.id,
                first_name: firstName.value.name,
                last_name: lastName.value ? lastName.value.name : '',
                races_id: race.id,
                classes_id: heroClass.id,
                weapon_id: weapon.id,
            }

            handleCloseModal()
            await updateHero(modifiedHero)
            
        } else {
            // Create a new by ourselves or randomly
            if (random) {
                
                const randomRace = generateRandomRace()
                const randomFirstName = generateRandomFirstName(randomRace)
                const randomLastName = generateRandomLastName(randomRace, randomFirstName)
                const randomClass = generateRandomClass(races.find(race => race.id === randomRace.id).possible_classes)
                const randomWeapon = generateRandomWeapon(classes.find(findClass => findClass.id === randomClass.id).possible_weapons)

                const randomStrength = generateStatsArray()
                const randomIntelligence = generateStatsArray()
                const randomDexterity = generateStatsArray()

                const minStr = randomStrength.reduce((a, b) => Math.min(a, b))
                const minDex = randomDexterity.reduce((a, b) => Math.min(a, b))
                const minInt = randomIntelligence.reduce((a, b) => Math.min(a, b))

                customHero = {
                    first_name: randomFirstName.name,
                    last_name: randomLastName ? randomLastName.name : '',
                    races_id: randomRace.id,
                    classes_id: randomClass.id,
                    weapon_id: randomWeapon.id,
                    strength: randomStrength.filter(x => x !== minStr).reduce((a, b) => a + b),
                    dexterity: randomDexterity.filter(x => x !== minDex).reduce((a, b) => a + b),
                    intelligence: randomIntelligence.filter(x => x !== minInt).reduce((a, b) => a + b), 

                }
            } else {
                
                if (strength.length === 0 || intelligence.length === 0 || dexterity.length === 0) {
                    return alert('You must roll the dices for the new hero stats')
                }

                const minStr = strength.reduce((a, b) => Math.min(a, b))
                const minDex = dexterity.reduce((a, b) => Math.min(a, b))
                const minInt = intelligence.reduce((a, b) => Math.min(a, b))

                customHero = {
                    first_name: firstName.value.name,
                    last_name: lastName.value ? lastName.value.name : '',
                    races_id: race.id,
                    classes_id: heroClass.id,
                    weapon_id: weapon.id,
                    strength: strength.filter(x => x !== minStr).reduce((a, b) => a + b),
                    intelligence: intelligence.filter(x => x !== minInt).reduce((a, b) => a + b),
                    dexterity: dexterity.filter(x => x !== minDex).reduce((a, b) => a + b)
                }

            }
            
            handleCloseModal()
            await createHero(customHero)
        }

    }
    
    if (!heroModal) return null

    return (
        <Modal>
            <Container> 
                <Title>
                    <h3>{ `${hero.id ? 'Update' : 'Create'} hero` }</h3>
                    <RandomButton type='button' onClick={() => hero.id ? null : setRandom(!random)}> { `Random ${random ? '✅' : '?'}` } </RandomButton>
                    <CloseButton onClick={handleCloseModal} type='button'> X </CloseButton>
                </Title>
                <Dropdown
                    disabled={random} 
                    isObject 
                    items={races}
                    title='Choose a race'
                    value={race}
                    onSelectItem={ (item) => handleSetRace(item) } 
                />
                <Dropdown 
                    disabled={random}
                    isObject 
                    items={possibleClasses}
                    title='Choose a class'
                    value={heroClass}
                    onSelectItem={ (item) => handleSetClass(item) } 
                />
                <Dropdown
                    disabled={random} 
                    isObject 
                    items={possibleWeapons}
                    title='Choose a weapon'
                    value={weapon}
                    onSelectItem={ (item) => setWeapon(item) } 
                />
                <Dropdown 
                    disabled={random}
                    isObject 
                    items={firstNames}
                    title='Choose a First Name'
                    value={firstName.value}
                    onSelectItem={ (item) => handleSelectFirstName(item) } 
                />
                <Dropdown 
                    disabled={random}
                    isObject 
                    items={lastNames}
                    title='Choose a Last Name'
                    value={lastName.value}
                    onSelectItem={ (item) => handleSelectLastName(item) } 
                />
                <StatContainer>
                    <StatTitle> Strength </StatTitle>
                    <DiceButton type='button' onClick={handleSetStrength}> R </DiceButton>
                    <span> {'['}  {strength.map((x, i) => <StatTitle key={i} highlighted={x !== strength.reduce((a, b) => Math.min(a, b))}> { x } </StatTitle>)} {']'} </span>
                </StatContainer>
                <StatContainer>
                    <StatTitle> Dexterity </StatTitle>
                    <DiceButton type='button' onClick={handleSetDexterity}> R </DiceButton>
                    <span> {'['}  {dexterity.map((x, i) => <StatTitle key={i} highlighted={x !== dexterity.reduce((a, b) => Math.min(a, b))}> { x } </StatTitle>)} {']'} </span>
                </StatContainer>
                <StatContainer>
                    <StatTitle> Intelligence </StatTitle>
                    <DiceButton type='button' onClick={handleSetIntelligence}> R </DiceButton>
                    <span> {'['}  {intelligence.map((x, i) => <StatTitle key={i} highlighted={x !== intelligence.reduce((a, b) => Math.min(a, b))}> { x } </StatTitle>)} {']'} </span>
                </StatContainer>
                <ButtonContainer>
                    <CreateUpdateButton type='button' onClick={async () => { await createUpdate() }}> {hero.id ? 'Update' : 'Create' } </CreateUpdateButton>
                    <DiscardButton type='button' onClick={handleDiscard}> Discard </DiscardButton>
                </ButtonContainer>
            </Container>
        </Modal>
    )
}

const mapStateToProps = state => state

export const HeroForm = connect(mapStateToProps)(FormComponent)