'use strict'

var React = require('react');
import { View, Text, TouchableOpacity } from 'react-native';
var range = require('../services/range');

let dotmatrix = {
    upperleft: {row: 0, col: 0},
    middleleft: {row: 1, col: 0},
    lowerleft: {row: 2, col: 0},
    middle: {row: 1, col: 1},
    upperright: {row: 0, col: 2},
    middleright: {row: 1, col: 2},
    lowerright: {row: 2, col: 2}
};
let dots = {
    1: [dotmatrix.middle],
    2: [dotmatrix.upperleft,dotmatrix.lowerright],
    3: [dotmatrix.upperleft,dotmatrix.middle,dotmatrix.lowerright],
    4: [dotmatrix.upperleft,dotmatrix.lowerleft,dotmatrix.upperright,dotmatrix.lowerright],
    5: [dotmatrix.upperleft,dotmatrix.lowerleft,dotmatrix.middle,dotmatrix.upperright,dotmatrix.lowerright],
    6: [dotmatrix.upperleft,dotmatrix.middleleft,dotmatrix.lowerleft,dotmatrix.upperright,dotmatrix.middleright,dotmatrix.lowerright]
};

var Dot = React.createClass({
    render() {
        let dotsize = this.props.size * 0.66;
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{
                    width: dotsize,
                    height: dotsize,
                    borderRadius: dotsize/2,
                    backgroundColor: this.props.color
                }}/>
            </View>
        );
    }
});

var Die = React.createClass({
    onPress() {
        this.props.onPress && this.props.onPress(this.props.die);
    },
    render() {
        let size = this.props.size || 64;
        let cell = size / 3;
        let diecolor = this.props.dieColor || this.props.color.die;
        let dotcolor = this.props.dotColor || this.props.color.dot;
        return (
            <TouchableOpacity onPress={this.onPress} style={{
                width: size,
                height: size,
                backgroundColor: diecolor,
                borderRadius: 2,
                borderColor: dotcolor,
                borderWidth: 1,
                //marginTop: 5,
                marginLeft: 5,
                marginRight: 5
            }}>
                <View style={{flex: 1}}>
                    {range(3).map((r,ri) =>
                        <View key={ri} style={{flex: 1, flexDirection: 'row'}}>
                            {range(3).map((c,ci) => this.renderDot(ri,ci)
                                ? <Dot key={ri+ci} color={dotcolor} size={cell}/>
                                : <View key={ri+ci} style={{flex:1}}><Text>{' '}</Text></View>
                            )}
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    },
    renderDot(row,col) {
        return (dots[this.props.value] || []).some((d) => d.row == row && d.col == col);
    },
});

module.exports = Die;
