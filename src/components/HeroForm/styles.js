import styled from 'styled-components';

export const Modal = styled.form`
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(20, 20, 20, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`

export const Title = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    text-align: center;
`

export const RandomButton = styled.button`
    border-radius: 5px;
    background-color: black;
    border: none;
    color: white;
    font-size: 16px;
    text-align: center;
    padding: 8px;
    cursor: pointer;
    margin-left: 8px;
`

export const CloseButton = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: white;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    cursor: pointer;
`

export const Container = styled.fieldset`
    width: 500px;
    height: 80%;
    border-radius: 10px;
    background-color: white;
    border: 1px solid black;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
`

export const CreateUpdateButton = styled.button`
    border: none;
    background-color: green;
    color: white;
    padding: 12px;
    flex: 1;
    margin-right: auto;
    cursor: pointer;
`

export const DiscardButton = styled.button`
    border: none;
    background-color: gray;
    color: black;
    padding: 12px;
    flex: 1;
    color: white;
    margin-left: auto;
    cursor: pointer;
`

export const StatContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 12px;
`

export const StatTitle = styled.span`
    font-size: 20px;
    color: black;
    font-weight: ${props => props.highlighted ? 'bold' : 'normal'};
`

export const DiceButton = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: gray;
    color: white;
    cursor: pointer;
    border: none;
    text-align: center;
    margin: 0 12px;
`