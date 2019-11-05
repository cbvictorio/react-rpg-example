import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Navbar } from './src/components/Navbar'
import { Router } from '@reach/router';
import { Heroes } from './src/pages/Heroes';
import { Home } from './src/pages/Home';
import { Monsters } from './src/pages/Monsters';
import { HeroForm } from './src/components/HeroForm'
import { Store } from './src/store'
import { LOADING } from './src/store/ActionTypes'
import {
    fetchRaces,
    fetchClasses,
    fetchHeroes,
    fetchMostFamousHero,
    fetchMostFamousRace,
    fetchMostFamousWeapon,
    fetchFirstNames,
    fetchLastNames
} from './src/utils/fetchMethods';

const AppComponent = ({ loading }) => {

    const fetchData = async () => {
        await fetchRaces()
        await fetchClasses()
        await fetchHeroes()
        await fetchMostFamousHero()
        await fetchMostFamousRace()
        await fetchMostFamousWeapon()
        await fetchFirstNames()
        await fetchLastNames()
    }

    useEffect(() => { fetchData() }, [])

    if (loading) return <h1> Loading... </h1>
    
    return (
        <Container>
            <Navbar />
            <HeroForm />
            <Navigator>
                <Home path='/' />
                <Heroes path='/heroes' />
                <Monsters path='/monsters' />
            </Navigator>
        </Container>
    )
}

const mapStateToProps = state => state

const Container = styled.div`
    height: 100vh;
    display: grid;
    grid-template-rows: 120px minmax(0, 1fr);
`

const Navigator = styled(Router)`
    padding: 24px 40px;
`

export const App = connect(mapStateToProps)(AppComponent)