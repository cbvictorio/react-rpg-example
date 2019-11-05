import styled from 'styled-components';
import { Link } from "@reach/router"

export const Container = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 2px solid black;
    /* border: 2px solid blue; */
    /* justify-content: flex-end; */
`

export const List = styled.ul`
    margin: 0;
    padding: 0;
`

export const ListItem = styled(Link)`
    color: black;
    text-decoration: none;
    position: relative;
    padding-left: 40px;
    font-size: 32px;
    ${props => props.release && 
    `
    &::after {
        content: "Soon!";
        width: 30px;
        height: 20px;
        background-color: rgb(200, 200, 200);
        position: absolute;
        font-size: 12px;
        color: black;
        margin: auto 0;
        top: 0;
        bottom: 0;
        margin-left: 8px;
        border-radius: 20px;
        text-align: center;
        padding: 5px;
    }
     `
    }

    &:visited {
        color: black;
    }

    &[aria-current=page] {
        color: ${props => props.release ? 'rgb(200, 200, 200)' : 'red'};
        text-decoration: underline;
    }

`