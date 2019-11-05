import styled from 'styled-components'

export const Container = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`

export const Row = styled.div`
    padding: 4px 0;
    margin: 0;
`

export const ListItem = styled.li`
    margin-bottom: 16px;
    border: 1px dotted black;
    padding: 12px;
`

export const FullName = styled.span`
    font-size: 20px;
    font-weight: bold;
`

export const SpecTitle = styled.span`
    font-size: 20px;
`

export const Spec = styled.span`
    font-size: 20px;
`

export const Title = styled.span`
    font-weight: bold;
    font-size: 24px;
`

export const AddButton = styled.button`
    width: 80px;
    height: 50px;
    border-radius: 6px;
    background-color: green;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const DeleteButton = styled.button`
    width: 80px;
    height: 50px;
    border-radius: 6px;
    background-color: red;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    margin-top: 12px;
`

export const ModifyButton = styled.button`
    width: 80px;
    height: 50px;
    border-radius: 6px;
    background-color: gray;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    margin-left: 12px;
    margin-top: 12px;
`

export const ButtonContainer = styled.div`
    display: flex;
    margin-bottom: 8px;
`