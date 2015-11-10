'use strict'

var range = require('../core/range');
var images = {};
/*
var dielow = 1, diehigh = 6;
var colors = ['blue', 'blackw', 'blue', 'green', 'red', 'white', 'yellow'];
colors.forEach((color) => {
    range(dielow,diehigh+1).forEach((i) => {
        let image = 'image!' + color + i.toString();
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
images['blackr1'] = require('image!blackr1');
images['blackr2'] = require('image!blackr2');
images['blackr3'] = require('image!blackr3');
images['blackr4'] = require('image!blackr4');
images['blackr5'] = require('image!blackr5');
images['blackr6'] = require('image!blackr6');

images['blackw1'] = require('image!blackw1');
images['blackw2'] = require('image!blackw2');
images['blackw3'] = require('image!blackw3');
images['blackw4'] = require('image!blackw4');
images['blackw5'] = require('image!blackw5');
images['blackw6'] = require('image!blackw6');

images['blue1'] = require('image!blue1');
images['blue2'] = require('image!blue2');
images['blue3'] = require('image!blue3');
images['blue4'] = require('image!blue4');
images['blue5'] = require('image!blue5');
images['blue6'] = require('image!blue6');

images['green1'] = require('image!green1');
images['green2'] = require('image!green2');
images['green3'] = require('image!green3');
images['green4'] = require('image!green4');
images['green5'] = require('image!green5');
images['green6'] = require('image!green6');

images['red1'] = require('image!red1');
images['red2'] = require('image!red2');
images['red3'] = require('image!red3');
images['red4'] = require('image!red4');
images['red5'] = require('image!red5');
images['red6'] = require('image!red6');

images['white1'] = require('image!white1');
images['white2'] = require('image!white2');
images['white3'] = require('image!white3');
images['white4'] = require('image!white4');
images['white5'] = require('image!white5');
images['white6'] = require('image!white6');

images['yellow1'] = require('image!yellow1');
images['yellow2'] = require('image!yellow2');
images['yellow3'] = require('image!yellow3');
images['yellow4'] = require('image!yellow4');
images['yellow5'] = require('image!yellow5');
images['yellow6'] = require('image!yellow6');

module.exports = function(image) {
    if (images.hasOwnProperty(image)) {
        return images[image];
    }
    return null;
}
