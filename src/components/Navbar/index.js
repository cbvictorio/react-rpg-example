import React from 'react';
import { Container, List, ListItem } from './styles'

export const Navbar = () => (
    <Container>
        <List>
            <ListItem to='/'> Dashboard </ListItem>
            <ListItem to='/heroes'> Heroes </ListItem>
            <ListItem to='/monsters' release='soon'> Monsters </ListItem>
        </List>
    </Container>
)
