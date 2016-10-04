'use strict';

var React = require('react');
import { View, TouchableOpacity, Text/*, Image*/ } from 'react-native';
//var Icons = require('../res/icons');

let styles = {
    checked: {
        width: 18,
        height: 18,
        color: 'black',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5
    },
    unchecked: {
        width: 20,
        height: 20,
        borderRadius: 3,
        borderColor: 'black',
        borderWidth: 2,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5
    }
};

var Checkbox = React.createClass({
    onSelected() {
        return () => {
            this.props.onSelected && this.props.onSelected(!this.props.selected);
        }
    },
    render() {
        return (
            <TouchableOpacity onPress={this.onSelected()}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} >
                    {this.props.labelpos == 'left' ? this.renderLabel(this.props.label) : null}
                    {/*
                    <Image
                        style={{marginTop: 5, marginLeft: 5, marginRight: 5, width: 20, height: 20, resizeMode: 'contain'}}
                        source={Icons[this.props.selected ? 'checked' : 'unchecked']} />
                    */}
                    <View style={{
                        width: 20,
                        height: 20,
                        borderRadius: 3,
                        borderColor: 'black',
                        borderWidth: 2,
                        //marginTop: 5,
                        marginLeft: 5,
                        marginRight: 5,
                        //flex: 1,
                        //justifyContent: 'center',
                        //alignItems: 'center'
                    }}>
                        {this.props.selected
                            ? <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',marginTop:-2}}>
                                <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>X</Text>
                            </View>
                            : null
                        }
                    </View>
                    {this.props.labelpos != 'left' ? this.renderLabel(this.props.label) : null}
                </View>
            </TouchableOpacity>
        );
    },
    renderLabel(label) {
        return (<Text style={{fontSize: 18, textAlign: 'left'}}>{label}</Text>)
    }
});

module.exports = Checkbox;
