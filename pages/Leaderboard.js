import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import styled from 'styled-components'
import { connect } from 'react-redux';

class Leaderboard extends Component {

  static navigationOptions = {
    title: 'Leaderboard',
  };

  componentDidMount() {
    console.log("Home :  ",this.props.scores)
    
  }

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };

  render() {
    const { scores } = this.props; 
    if(!scores||scores.length===0) {
      return (<Container><Text>No Data</Text></Container>);
    }   
    else{
      return (
        <Container>
          <FlatList
            data={scores}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({ item, index }) => (           
              <View>
                <TextDetails>
                { index + '   Score :   ' + item.score }{item.name? '   Name :  ' + item.name: ''} 
                </TextDetails>
              </View>
            )}
            keyExtractor={item => item.timestamp+""}       
          />
        </Container>
      );
    }      
  }
}

const Container = styled.View`
    flex:1;
    margin-left: 10;
    margin-right: 10;
    margin-bottom: 10;
    margin-top: 30;
`;

const TextDetails = styled.Text`
    background-color: #b3b3ff;
    padding: 10px;
    font-size: 15;
    height: 54;
`;


const mapStateToProps = state => {
  return {
      scores: state.gameInfoReducer.scores,
  }
}

export default connect(
  mapStateToProps
)(Leaderboard)

