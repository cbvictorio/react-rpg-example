import React from 'react';
import { 
    Container,
    Box,
    Title
} from './styles'

export const Checkbox = ({ value = false, onClick = () => {}, title = '' }) => (
    <Container onClick={onClick}>
        <Box> { value ? '✔️' : '' } </Box>
        <Title> { title } </Title>
    </Container>
)