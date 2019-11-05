import styled from 'styled-components';

export const Container = styled.button`
    border: 1px solid black;
    border-radius: 3px;
    width: 100%;
    background-color: white;
    color: black;
    position: relative;
    text-align: center;
    margin-bottom: 12px;
    padding: 8px;
    cursor: pointer;
`

export const ItemsList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    border: 1px solid black;
    z-index: 5;
    background-color: white;
    max-height: 300px;
    overflow: auto;
`

export const Item = styled.li`
    text-align: center;
    font-size: 14px;
    color: black;
    padding: 4px 0;

    &:hover {
        background-color: blue;
        color: white;
    }
`

export const Title = styled.span`
    font-size: 20px;
    color: ${props => props.disabled ? 'gray' : 'black'};
`