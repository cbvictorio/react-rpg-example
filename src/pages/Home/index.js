import React from 'react';
import { connect } from 'react-redux';
import { Container, Title } from './styles';


const HomeComponent = ({ heroes = [], classes = [], famousHero = { first_name: '' }, famousRace = { name: '' }, famousWeapon = { name: '' } }) => (
    <Container>
        <Title> {`Available Heroes: ${heroes.length || 'Unknown'}`} </Title>
        <Title> {`Available Classes: ${classes.length}` || 'Unknown'} </Title>
        <Title> {`Most famous hero: ${famousHero.first_name || 'Unknown'}`} </Title>
        <Title> {`Most famous race: ${famousRace.id ? famousRace.name : 'Unknown'}`} </Title>
        <Title> {`Most famous weapon: ${famousWeapon.id ? famousWeapon.name : 'Unknown'}`} </Title>
    </Container>
)

const mapStateToProps = state => state

export const Home = connect(mapStateToProps)(HomeComponent)