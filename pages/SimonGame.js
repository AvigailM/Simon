import React, { Component } from 'react';

import ColorButtonSimon from "../components/ColorButtonSimon";
import Sound from 'react-native-sound';

import styled from 'styled-components'

import { uid } from 'react-uid';

import { connect } from 'react-redux';

import { addGameScore } from '../redux/actions';

import AsyncStorage from '@react-native-community/async-storage';

import ModalSaveScore from '../components/ModalSaveScore'

import * as Constans from '../res/constans';

import * as Utils from '../res/utils';

import * as Colors from '../res/colors';


class SimonGame extends Component {

  state = {
    scores: this.props.scores,
    isDialogVisible: false,
    computerGameScenarios: [],
    score: 0,
    userInputIndex: 0,
    clickedIndex: -1,
    status: Constans.COMPUTER_PLAYING,
    lost: false
  }

  static navigationOptions = {
    title: 'Simon Game',
  };

  componentDidMount() {
    console.log("GGGG", Colors.BLUE_DARK)
    this.goToNextLevel(0, 50);
  }

  setPlayAgain = () => {
    this.setState({
      lost: false,
      computerGameScenarios: [],
      userInputIndex: 0,
      clickedIndex: -1
    }, () => this.goToNextLevel(0, 50))
  }

  saveScore = async name => {

    let { score, scores } = this.state;
    const { addGameScores } = this.props;

    if (!scores) {
      scores = []
    }

    const data = { 'score': score, timestamp: Date.now(), 'name': name }
    let scoresData = [...scores, data]

    scoresData.sort((a, b) => (a.score < b.score) ? 1 : (a.score === b.score) ? ((a.timestamp < b.timestamp) ? 1 : -1) : -1)

    try {
      await AsyncStorage.setItem(Constans.SCORES_DATA_KEY, JSON.stringify(scoresData))
      alert('Data successfully saved!')
    } catch (e) {
      console.log("saveScore ", e, JSON.stringify(scoresData))
      alert('Failed to save score.')
    }
    this.setState(prevState => ({
      scores: scoresData,
      isDialogVisible: false,
      score: 0,
      lost: true,
    }))
    addGameScores(scoresData)
  }

  setIsDialogVisible = () => {
    this.setState(prevState => ({
      isDialogVisible: !prevState.lost
    }))
  }

  findIfNeededSaveScore = (scores, score) => {

    if (!scores || scores.length <= 10) {
      return true
    }

    let minVal = (scores[10].score) > 0 ? scores[10].score : 0;
    let maxVal = scores[0].score;
    console.log("scores[0].score ", score, minVal, maxVal, score >= maxVal, (score >= minVal && score <= maxVal))

    if (score >= maxVal || (score >= minVal && score <= maxVal)) {
      console.log("scores[0].score ", score, minVal, maxVal, score >= maxVal, (score >= minVal && score <= maxVal))
      scores.splice(10, 1)
      this.setState(prevState => ({
        scores: scores,
        isDialogVisible: !prevState.isDialogVisible,
      }))
      console.log("scores ", this.state.scores)
      return true
    }
    else {
      return false
    }

  }

  setLost = () => {
    const { score, scores } = this.state;

    if (this.findIfNeededSaveScore(scores, score)) {
      this.setState(prevState => ({
        isDialogVisible: true,
      }))
    }
    else {
      this.setState(prevState => ({
        isDialogVisible: false,
        lost: !prevState.lost,
        score: 0
      }))
    }

  }

  onPress = (input) => {
    const { computerGameScenarios, userInputIndex, score } = this.state;

    this.setSound(input)
    if (input !== computerGameScenarios[userInputIndex]) {
      this.setLost()
    }
    else {
      if (userInputIndex !== computerGameScenarios.length - 1) {
        this.setState({ userInputIndex: userInputIndex + 1 });
      }
      else {
        this.goToNextLevel(score + 1)
      }
    }
  }

  goToNextLevel = (score, timeToNextLevel = 500) => {
    this.setState({
      score,
      userInputIndex: 0,
      computerGameScenarios: this.setComputerGameScenarios()
    }, () => {
      this.setState({ status: Constans.COMPUTER_PLAYING });
      this.interval = setTimeout(this.setAfterButtonClicked, timeToNextLevel);
    });
  }

  setAfterButtonClicked = () => {
    const { clickedIndex, computerGameScenarios } = this.state;

    this.setState({
      clickedIndex: -1
    }, () => {
      if (clickedIndex < computerGameScenarios.length - 1) {
        this.setState({
          clickedIndex: clickedIndex + 1,
          status: Constans.COMPUTER_PLAYING
        })
      }
      else {
        this.setState({ status: Constans.USER_PLAYING })
      }
    });
  }

  setComputerGameScenarios = () => {
    const { computerGameScenarios } = this.state;
    return [...computerGameScenarios, Utils.generateRandomNumber()]
  }

  setSound = (index) => {
    Sound.setCategory('Playback');
    const soundGame = new Sound(Constans.urlSounds[index], Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      soundGame.play();
    });
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  listButtons = () => {
    const { computerGameScenarios, clickedIndex, status, lost } = this.state;
    return Constans.colorsName.map((item, index) => {
      return (
        <ContainerButton key={uid(item)} >
          <ColorButtonSimon
            onPress={() => this.onPress(index)}
            onSound={() => this.setSound(index)}
            isFlashing={computerGameScenarios[clickedIndex] === index}
            onButtonClicked={this.setAfterButtonClicked}
            disabled={status === Constans.COMPUTER_PLAYING || lost}
            background={Constans.colorsForButtons[index]}
          />
        </ContainerButton>
      )
    })
  }

  render() {
    const { score, isDialogVisible } = this.state;
    return (
      <Container>
        <ContainerText>
          <TextScore>{`score : ${score}`}</TextScore>
        </ContainerText>
        <ModalSaveScore
          isDialogVisible={isDialogVisible}
          sendInput={(res) => this.saveScore(res)}
          showDialog={() => this.setIsDialogVisible()}
        />
        <ContainerButtonsList>{this.listButtons()}</ContainerButtonsList>
        <ContainerButton>
          <ContainerText>
            <ButtonPlay onPress={() => this.setPlayAgain()}>
              <ButtonText>play</ButtonText></ButtonPlay>
          </ContainerText>
        </ContainerButton>
      </Container>
    );
  }
}



const mapStateToProps = state => {
  return {
    scores: state.gameInfoReducer.scores,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addGameScores: (data) => dispatch(addGameScore("ADD_GAME_SCORE", data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SimonGame)

const ButtonText = styled.Text`
  font-size: 18px;
  color: white;
`

const ButtonPlay = styled.TouchableOpacity`
  color: white;
  padding: 5px;
  border-radius: 5px;    
  background-color:  ${Colors.BLUE_DARK};
  border: 1px solid #4D20A0;
`;
const ContainerButton = styled.View`
  justify-content: center;
  align-items: center;
  text-align:center;
`;

const ContainerText = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding:20px;
`;

const Container = styled.View`
	flex: 1;
`;

const TextScore = styled.Text`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size:20px;
  color: ${Colors.BLUE_DARK};
`;

const ContainerButtonsList = styled.View`
  margin:20px;
  align-items: center;
  justify-content: center;
  flex: 1; 
  flex-direction: row; 
  flex-wrap: wrap ;
`;
