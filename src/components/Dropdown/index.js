import React, { useState } from 'react';
import { Container, ItemsList, Item, Title } from './styles';

export const Dropdown = ({ items = [], onSelectItem = () => {}, value, isObject = false, attr = 'name', title = 'Title', disabled = false }) => {
    const [opened, setOpened] = useState(false)
    const handleOpenModal = () => items.length === 0 ? null : (disabled ? null : setOpened(!opened))
    const handleOnSelect = (item) => {
        if (disabled) return
        onSelectItem(item)
        setOpened(false)
    }
    return (
        <Container type='button' onClick={handleOpenModal}>
            <Title disabled={disabled}> { value ? value[attr] : title } </Title>
            { opened &&
                <ItemsList>
                    {items.map((item, key) => 
                        <Item key={key} onClick={() => { handleOnSelect(item) }}> 
                            { isObject ? item[attr] : item } 
                        </Item>
                    )}
                </ItemsList>
            }
        </Container>
    )
}