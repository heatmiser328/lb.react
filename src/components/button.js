import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import {Style} from 'react-native-nub';

var Button = React.createClass({
    getInitialState() {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            viewHeight: 100
        };
    },
    onLayout(e) {
        if (this.state.width != e.nativeEvent.layout.width ||
            this.state.height != e.nativeEvent.layout.height) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },
    render() {
        let width = (this.state.width*0.9) || 32;
        let height = (this.state.height*0.9) || 32;
        let verticalpadding = this.props.nopadding ? 0 : 15;
        let horizontalpadding = this.props.nopadding ? 0 : 45;
        let borderwidth = this.props.nopadding ? 0 : 1;
        let bordercolor = this.props.nopadding ? 'transparent' : 'black';
        let backgroundColor = this.props.nopadding ? 'transparent' : 'silver';
        let borderRadius = this.props.nopadding ? 0 : 10;
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{
                justifyContent: 'center',
                backgroundColor: backgroundColor,
                borderRadius: borderRadius,
                borderColor: bordercolor,
                borderWidth: borderwidth,
                paddingTop: Style.Padding.pad(verticalpadding),
                paddingLeft: Style.Padding.pad(horizontalpadding),
                paddingRight: Style.Padding.pad(horizontalpadding),
                paddingBottom: Style.Padding.pad(verticalpadding)
            }} onLayout={this.onLayout}>
                <Image
                    style={{width: width, height: height, resizeMode: 'contain', alignSelf: 'center'}}
                    source={this.props.icon} />
            </TouchableOpacity>
        );
    }
});

