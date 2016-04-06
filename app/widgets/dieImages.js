'use strict'

var images = {};
/*
var range = require('../core/range');
var dielow = 1, diehigh = 6;
var colors = ['blue', 'blackw', 'blue', 'green', 'red', 'white', 'yellow'];
colors.forEach((color) => {
    range(dielow,diehigh+1).forEach((i) => {
        let image = '../../resources/dice/' + color + i.toString();
        images[image] = require(image);
    });
});

module.exports = function(color, die) {
    let image = color + die.toString();
    if (images.hasOwnProperty(image)) {
        return images[image];
    }
    return null;
}
*/
images['blackr1'] = require('../../resources/dice/blackr1.png');
images['blackr2'] = require('../../resources/dice/blackr2.png');
images['blackr3'] = require('../../resources/dice/blackr3.png');
images['blackr4'] = require('../../resources/dice/blackr4.png');
images['blackr5'] = require('../../resources/dice/blackr5.png');
images['blackr6'] = require('../../resources/dice/blackr6.png');

images['blackw1'] = require('../../resources/dice/blackw1.png');
images['blackw2'] = require('../../resources/dice/blackw2.png');
images['blackw3'] = require('../../resources/dice/blackw3.png');
images['blackw4'] = require('../../resources/dice/blackw4.png');
images['blackw5'] = require('../../resources/dice/blackw5.png');
images['blackw6'] = require('../../resources/dice/blackw6.png');

images['blue1'] = require('../../resources/dice/blue1.png');
images['blue2'] = require('../../resources/dice/blue2.png');
images['blue3'] = require('../../resources/dice/blue3.png');
images['blue4'] = require('../../resources/dice/blue4.png');
images['blue5'] = require('../../resources/dice/blue5.png');
images['blue6'] = require('../../resources/dice/blue6.png');

images['green1'] = require('../../resources/dice/green1.png');
images['green2'] = require('../../resources/dice/green2.png');
images['green3'] = require('../../resources/dice/green3.png');
images['green4'] = require('../../resources/dice/green4.png');
images['green5'] = require('../../resources/dice/green5.png');
images['green6'] = require('../../resources/dice/green6.png');

images['red1'] = require('../../resources/dice/red1.png');
images['red2'] = require('../../resources/dice/red2.png');
images['red3'] = require('../../resources/dice/red3.png');
images['red4'] = require('../../resources/dice/red4.png');
images['red5'] = require('../../resources/dice/red5.png');
images['red6'] = require('../../resources/dice/red6.png');

images['white1'] = require('../../resources/dice/white1.png');
images['white2'] = require('../../resources/dice/white2.png');
images['white3'] = require('../../resources/dice/white3.png');
images['white4'] = require('../../resources/dice/white4.png');
images['white5'] = require('../../resources/dice/white5.png');
images['white6'] = require('../../resources/dice/white6.png');

images['yellow1'] = require('../../resources/dice/yellow1.png');
images['yellow2'] = require('../../resources/dice/yellow2.png');
images['yellow3'] = require('../../resources/dice/yellow3.png');
images['yellow4'] = require('../../resources/dice/yellow4.png');
images['yellow5'] = require('../../resources/dice/yellow5.png');
images['yellow6'] = require('../../resources/dice/yellow6.png');

module.exports = function(image) {
    if (images.hasOwnProperty(image)) {
        return images[image];
    }
    return null;
}
