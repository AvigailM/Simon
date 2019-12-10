import React, { Component } from 'react';
import styled from 'styled-components'
import * as Images from '../res/images';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { addGameScore } from '../redux/actions';
import * as Constans from '../res/constans';


class Home extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    componentDidMount() {
        this.retrieveData()
    }
    
    retrieveData = async () => {
    const { addGameScores } = this.props; 
        try {
          const scores = await AsyncStorage.getItem(Constans.SCORES_DATA_KEY)
    
          if (scores !== null) {
            console.log("scores",scores)
            addGameScores(JSON.parse(scores))
          }
          else {
            console.log("scores else ",scores) 
            addGameScores([])
          }
        } catch (e) {
          //alert('Failed to load scores.')
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container>
                <ContainerRamk>
                    <TouchableOpacityImgRank onPress={() => navigate('Leaderboard')}>
                        <RankImage source={Images.rank} />
                    </TouchableOpacityImgRank>           
                </ContainerRamk>         
                <ContainerGame>
                <Title>Simon Game</Title>
                    <IcImage source={Images.memory} />
                    <ButtonPlay
                        title="PLAY"
                        onPress={() => navigate('SimonGame')}
                    />
                </ContainerGame>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      addGameScores: (data) => dispatch(addGameScore("ADD_GAME_SCORE",data)),
    };
};

export default connect(null, mapDispatchToProps)(Home);

const ButtonPlay = styled.Button.attrs({
    color: "#99ccff"
})`
 padding:20px;
 width: 200px; 
 height: 100px;
`

const IcImage = styled.Image.attrs({
    resizeMode: 'contain',
})`
 width: 200px; 
 height: 100px;
 padding:20px;
 margin-bottom:20px;
`

const RankImage = styled.Image.attrs({
    resizeMode: 'cover',
})`
display:flex;
 width: 50%; 
 height: 100px; 
`

const TouchableOpacityImgRank = styled.TouchableOpacity`
    display:flex;
    background-color: papayawhip;
    flex-direction:row;
    align-items: center;
`;


const ContainerRamk = styled.View`
    flex: 0.2;
    display:flex;
    background-color: papayawhip;
    flex-direction:row;
    align-items: center;
`;

const ContainerGame = styled.View`
    flex: 0.6;
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
`;

const Container = styled.View`
    flex: 1;
    background-color: papayawhip;
`;


const Title = styled.Text`
    font-size: 30px;
    color: palevioletred;
    margin-bottom:20px;
`;