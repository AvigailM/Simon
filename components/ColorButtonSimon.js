import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';

import styled from 'styled-components'

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class ColorButtonSimon extends Component {
    state = {
        buttonOpacity: new Animated.Value(1)
    }

    flash = () => {
     const { buttonOpacity } = this.state;
     const { onButtonClicked, onSound } = this.props;
        Animated.sequence([
            Animated.timing(buttonOpacity, {
                toValue : 0,
                timing : 200
              }),
            Animated.timing(buttonOpacity,{
                toValue : 1,
                duration : 200
            })        
        ]).start(onButtonClicked);
        onSound()
    }

    componentDidUpdate(preProps) {
    const { isFlashing } = this.props;

        if ( isFlashing && preProps.isFlashing !== isFlashing ) {
            this.flash();
        }

    }

    render() {
        const { disabled, onPress, background } = this.props;
        const { buttonOpacity } = this.state;

        return (
            <TouchableButtonSimon disabled={disabled} onPress={onPress}>
                <SimonColorView as={Animated.View}
                    backgroundColor={background}
                    opacity={buttonOpacity}>
                </SimonColorView>
            </TouchableButtonSimon>
        );
    }
}


const TouchableButtonSimon = styled.TouchableOpacity`
    width: ${(deviceWidth / 2.5)}px; 
    height:  ${(deviceWidth / 2.5)}px; 
    padding: 10px;
`

const SimonColorView = styled.View`
    border-Radius:${(deviceWidth / 2.5)}px; 
    flex: 1;
`;


export default ColorButtonSimon;