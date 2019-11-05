import React from 'react';
import { connect } from 'react-redux';
import { OPEN_HERO_MODAL, MODIFY_HERO } from '../../store/ActionTypes'
import { Store } from '../../store'
import { deleteHero } from '../../utils/fetchMethods'
import { 
    Container, 
    ListItem, 
    FullName,
    SpecTitle,
    Spec,
    Row,
    Title,
    AddButton,
    DeleteButton,
    ButtonContainer,
    ModifyButton
} from './styles';

const HeroesComponent = ({ heroes = [], dispatch }) => {
   
    const handleOpenModal = () => Store.dispatch({ type: OPEN_HERO_MODAL, payload: true })

    const modifyHero = (hero) => {
        handleOpenModal()
        dispatch({ type: MODIFY_HERO, payload: hero })
    }

    return (
        <Container>
            <ButtonContainer>
                <AddButton onClick={handleOpenModal}> New </AddButton>
            </ButtonContainer>
            {heroes.length <= 0 ? <h1> No heroes were found. </h1> : heroes.map(hero => 
                <ListItem key={hero.id}>
                    <Row>
                        <Title> Full name: </Title> 
                        <FullName> { hero.first_name } { hero.last_name } </FullName>
                    </Row>
                    <Row>
                        <SpecTitle> Class: </SpecTitle>
                        <Spec> { hero.class[0].name } </Spec> 
                    </Row>
                    <Row>
                        <SpecTitle> Race: </SpecTitle>
                        <Spec> { hero.race[0].name } </Spec> 
                    </Row>
                    <Row>
                        <SpecTitle> Weapon: </SpecTitle>
                        <Spec> { hero.weapon[0].name } </Spec> 
                    </Row>
                    <Row>
                        <SpecTitle> Str: </SpecTitle>
                        <Spec> { hero.strength } </Spec> 
                    </Row>
                    <Row>
                        <SpecTitle> Int: </SpecTitle>
                        <Spec> { hero.intelligence } </Spec> 
                    </Row>
                    <Row>
                        <SpecTitle> Dex: </SpecTitle>
                        <Spec> { hero.dexterity } </Spec> 
                    </Row>
                    <ButtonContainer>
                        <DeleteButton onClick={async () => { await deleteHero(hero.id) }}> Delete </DeleteButton>
                        <ModifyButton onClick={() => modifyHero(hero)}> Modify </ModifyButton>
                    </ButtonContainer>
                </ListItem>
            )}
        </Container>
    )
}

const mapStateToProps = state => state

export const Heroes = connect(mapStateToProps)(HeroesComponent)