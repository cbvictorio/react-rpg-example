import React from 'react';
import { InputContainer, InputComponent, Title } from './styles';

export const Input = ({ value = '', onChange = () => {}, title = 'Title', disabled = false }) => (
    <InputContainer>
        <Title> { title } </Title>
        <InputComponent disabled={disabled} value={value} onChange={onChange} />
    </InputContainer>
)