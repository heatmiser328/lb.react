import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { shallow } from 'enzyme';
var chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon');
chai.use(require('sinon-chai'));

var Checkbox = require('../../../src/widgets/checkbox');

describe('Checkbox', () => {
	var env = {};

	beforeEach(() => {
		env.onSelected = sinon.stub();
	});

	describe('Render', () => {
		describe('checked', () => {
			beforeEach(() => {
				env.label = 'Item';
				env.selected = true;

				env.checkbox = shallow(
					<Checkbox label={env.label} selected={env.selected} onSelected={env.onSelected}/>
				);
			});

			it('should be touchable', () => {
				let touch = env.checkbox.find(TouchableOpacity);
				expect(touch).to.have.length(1);
				//expect(env.checkbox.contains(<TouchableOpacity/>)).to.be.true;
			});
			it('should have a label', () => {
				let text = env.checkbox.find(Text);
				expect(text).to.have.length(1);
				expect(text.children().text()).to.eql(env.label);
			});
			it('should have a checked image', () => {
				expect(env.checkbox.contains(<Image style={{marginTop: 5, marginLeft: 5, marginRight: 5, width: 20, height: 20, resizeMode: 'contain'}} source={{uri: './checked_checkbox.png'}}/>)).to.equal(true);
			});
			describe('when touched', () => {
				beforeEach(() => {
					env.checkbox.simulate('press');
				});

				it('should invoke the handler', () => {
					expect(env.onSelected).to.have.been.calledOnce;
					expect(env.onSelected).to.have.been.calledWith(!env.selected);
				});
				it('should have a checked image (not rerendered)', () => {
					expect(env.checkbox.contains(<Image style={{marginTop: 5, marginLeft: 5, marginRight: 5, width: 20, height: 20, resizeMode: 'contain'}} source={{uri: './checked_checkbox.png'}}/>)).to.equal(true);
				});
			})
		});

		describe('unchecked', () => {
			beforeEach(() => {
				env.label = 'Item';
				env.selected = false;

				env.checkbox = shallow(
					<Checkbox label={env.label} selected={env.selected} onSelected={env.onSelected}/>
				);
			});

			it('should be touchable', () => {
				let touch = env.checkbox.find(TouchableOpacity);
				expect(touch).to.have.length(1);
				//expect(env.checkbox.contains(<TouchableOpacity/>)).to.be.true;
			});
			it('should have a label', () => {
				let text = env.checkbox.find(Text);
				expect(text).to.have.length(1);
				expect(text.children().text()).to.eql(env.label);
			});
			it('should have a unchecked image', () => {
				expect(env.checkbox.contains(<Image style={{marginTop: 5, marginLeft: 5, marginRight: 5, width: 20, height: 20, resizeMode: 'contain'}} source={{uri: './unchecked_checkbox.png'}}/>)).to.equal(true);
			});

			describe('when touched', () => {
				beforeEach(() => {
					env.checkbox.simulate('press');
				});

				it('should invoke the handler', () => {
					expect(env.onSelected).to.have.been.calledOnce;
					expect(env.onSelected).to.have.been.calledWith(!env.selected);
				});
				it('should have a unchecked image (not rerendered)', () => {
					expect(env.checkbox.contains(<Image style={{marginTop: 5, marginLeft: 5, marginRight: 5, width: 20, height: 20, resizeMode: 'contain'}} source={{uri: './unchecked_checkbox.png'}}/>)).to.equal(true);
				});
			})
		});


	});
});
