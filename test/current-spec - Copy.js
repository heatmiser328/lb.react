var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sandbox = require('sandboxed-module');
chai.use(require('sinon-chai'));
var moment = require('moment');

function accept(value) {
	return new Promise((resolve, reject) => {
    	return resolve(value);
    });
}
function reject(err) {
	return new Promise((resolve, reject) => {
        return reject(err);
    });
}

describe('Current', function() {
	var env = {};
    beforeEach(function() {
    	env = {};
        env.log = require('./mocks/log.js')();
        
        env.data = {
        	id: 1,
            scenario: {
            	id: 2,
            	start: {
                	year: 1806,
                    month: 11,
                    day: 15,
                    hour: 7,
                    minute: 20
                },
            	end: {
                	year: 1806,
                    month: 11,
                    day: 15,
                    hour: 11,
                    minute: 00
                }
            }
        };
        
        env.Battles = {
        	scenario: sinon.stub().returns(env.data)
        };
        
        env.RNFS = {
        	DocumentDirectoryPath: '/path/to/files',
            readFile: sinon.stub(),
            writeFile: sinon.stub(),
            unlink: sinon.stub()
        };
        
        env.filePath = env.RNFS.DocumentDirectoryPath + '/lb.app.current';
        
        env.saved = {
        	battle: env.data.id,
        	scenario: env.data.scenario.id,
            turn: 1,
            phase: 0
        };
        
		env.Current = sandbox.require('../app/core/current.js', {
        	requires: {
            	'./battles.js': env.Battles,
            	'./log.js': env.log,
                'react-native-fs': env.RNFS,
                'moment': moment
            }
        });
    });
    
	describe('get', function() {
    	describe('not previously saved', function() {
	    	beforeEach(function(done) {
            	env.RNFS.readFile.returns(accept(null));
                env.RNFS.writeFile.returns(accept(env.saved));
                env.Current.get(env.data)
                .then((current) => {
		        	env.current = current;
                    done();
                })
                .catch(done);
	        });
            it('should retrieve from local storage', function() {
            	expect(env.RNFS.readFile).to.have.been.calledOnce;
            	expect(env.RNFS.readFile).to.have.been.calledWith(env.filePath);
            });
            
            it('should save new to local storage', function() {
            	expect(env.RNFS.writeFile).to.have.been.calledOnce;
            	expect(env.RNFS.writeFile).to.have.been.calledWith(env.filePath, JSON.stringify({
                	battle: env.data.id,
                	scenario: env.data.scenario.id,
                    turn: 1,
                    phase: 0
                }));
            });
            
            it('should retrieve the object', function() {
            	expect(env.current).to.deep.equal({
                	battle: env.data.id,
                	scenario: env.data.scenario.id,
                    turn: 1,
                    phase: 0
                });
            });
        });
        
    	describe('previously saved', function() {
	    	beforeEach(function(done) {
            	env.RNFS.readFile.returns(accept(JSON.stringify(env.saved)));
                env.Current.get(env.data)
                .then((current) => {
		        	env.current = current;
                    done();
                })
                .catch(done);
	        });
            it('should retrieve from local storage', function() {
            	expect(env.RNFS.readFile).to.have.been.calledOnce;
            	expect(env.RNFS.readFile).to.have.been.calledWith(env.filePath);
            });
            
            it('should not save new to local storage', function() {
            	expect(env.RNFS.writeFile).to.not.have.been.called;
            });
            
            it('should retrieve the object', function() {
            	expect(env.current).to.deep.equal(env.saved);
            });
        });
    });
    
	describe('reset', function() {
    	beforeEach(function(done) {
        	env.RNFS.readFile.returns(accept(JSON.stringify(env.saved)));
            env.RNFS.writeFile.returns(accept(env.saved));
            env.Current.reset(env.data)
            .then((current) => {
	        	env.current = current;
                done();
            })
            .catch(done);
        });
        it('should save new to local storage', function() {
        	expect(env.RNFS.writeFile).to.have.been.calledOnce;
        	expect(env.RNFS.writeFile).to.have.been.calledWith(env.filePath, JSON.stringify({
            	battle: env.data.id,
            	scenario: env.data.scenario.id,
                turn: 1,
                phase: 0
            }));
        });
        
        it('should retrieve from local storage', function() {
        	expect(env.RNFS.readFile).to.have.been.calledOnce;
        	expect(env.RNFS.readFile).to.have.been.calledWith(env.filePath);
        });
        
        it('should retrieve the object', function() {
        	expect(env.current).to.deep.equal({
            	battle: env.data.id,
            	scenario: env.data.scenario.id,
                turn: 1,
                phase: 0
            });
        });
    });
    
	describe('turn', function() {
    	describe('current', function() {
	    	describe('use saved', function() {
	        	describe('1', function() {
			    	beforeEach(function(done) {
	                    env.saved.turn = 1;
		        		env.RNFS.readFile.returns(accept(JSON.stringify(env.saved)));
			            env.Current.turn()
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.have.been.calledOnce;
		            	expect(env.RNFS.readFile).to.have.been.calledWith(env.filePath);
		            });
		            
		            it('should retrieve the scenario', function() {
		            	expect(env.Battles.scenario).to.have.been.calledOnce;
		            	expect(env.Battles.scenario).to.have.been.calledWith(env.saved.scenario);
		            });
		            
		            it('should retrieve the turn', function() {
	                	expect(env.turn).to.be.a.string;
		            	expect(env.turn).to.equal('Nov 15, 1806 07:20 AM');
		            });
	            });
	            
	        	describe('5', function() {
			    	beforeEach(function(done) {
	                    env.saved.turn = 5;
		        		env.RNFS.readFile.returns(accept(JSON.stringify(env.saved)));
			            env.Current.turn()
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.have.been.calledOnce;
		            	expect(env.RNFS.readFile).to.have.been.calledWith(env.filePath);
		            });
		            
		            it('should retrieve the scenario', function() {
		            	expect(env.Battles.scenario).to.have.been.calledOnce;
		            	expect(env.Battles.scenario).to.have.been.calledWith(env.saved.scenario);
		            });
		            
		            it('should retrieve the turn', function() {
	                	expect(env.turn).to.be.a.string;
		            	expect(env.turn).to.equal('Nov 15, 1806 08:40 AM');
		            });
	            });
	        });
	        
	        
	    	describe('use local', function() {
	        	describe('1', function() {
			    	beforeEach(function(done) {
	                    env.saved.turn = 1;
			            env.Current.turn(env.saved)
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should not retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.not.have.been.calledOnce;
		            });
		            
		            it('should retrieve the scenario', function() {
		            	expect(env.Battles.scenario).to.have.been.calledOnce;
		            	expect(env.Battles.scenario).to.have.been.calledWith(env.saved.scenario);
		            });
		            
		            it('should retrieve the turn', function() {
	                	expect(env.turn).to.be.a.string;
		            	expect(env.turn).to.equal('Nov 15, 1806 07:20 AM');
		            });
	            });
	            
	        	describe('5', function() {
			    	beforeEach(function(done) {
	                    env.saved.turn = 5;
			            env.Current.turn(env.saved)
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
                        
			        });
		            
		            it('should not retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.not.have.been.calledOnce;
		            });
		            
		            it('should retrieve the scenario', function() {
		            	expect(env.Battles.scenario).to.have.been.calledOnce;
		            	expect(env.Battles.scenario).to.have.been.calledWith(env.saved.scenario);
		            });
		            
		            it('should retrieve the turn', function() {
	                	expect(env.turn).to.be.a.string;
		            	expect(env.turn).to.equal('Nov 15, 1806 08:40 AM');
		            });
	            });
	        });
	    });
        
    	describe('previous', function() {
	    	describe('use saved', function() {
	        	describe('1', function() {
			    	beforeEach(function(done) {
	                    env.saved.turn = 1;
		        		env.RNFS.readFile.returns(accept(JSON.stringify(env.saved)));
                        env.RNFS.writeFile.returns(accept(env.saved));
			            env.Current.prevTurn()
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.have.been.calledOnce;
		            	expect(env.RNFS.readFile).to.have.been.calledWith(env.filePath);
		            });
		            
		            it('should retrieve the scenario', function() {
		            	expect(env.Battles.scenario).to.have.been.calledOnce;
		            	expect(env.Battles.scenario).to.have.been.calledWith(env.saved.scenario);
		            });
		            
		            it('should retrieve the turn', function() {
	                	expect(env.turn).to.be.a.string;
		            	expect(env.turn).to.equal('Nov 15, 1806 07:20 AM');
		            });
                    
			        it('should save to local storage', function() {
			        	expect(env.RNFS.writeFile).to.have.been.called;
			        });
	            });
                
	        	describe('5', function() {
			    	beforeEach(function(done) {
	                    env.saved.turn = 5;
		        		env.RNFS.readFile.returns(accept(JSON.stringify(env.saved)));
                        env.RNFS.writeFile.returns(accept(env.saved));
			            env.Current.prevTurn()
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.have.been.calledOnce;
		            	expect(env.RNFS.readFile).to.have.been.calledWith(env.filePath);
		            });
		            
		            it('should retrieve the scenario', function() {
		            	expect(env.Battles.scenario).to.have.been.calledOnce;
		            	expect(env.Battles.scenario).to.have.been.calledWith(env.saved.scenario);
		            });
		            
		            it('should retrieve the turn', function() {
	                	expect(env.turn).to.be.a.string;
		            	expect(env.turn).to.equal('Nov 15, 1806 08:20 AM');
		            });
                    
			        it('should save to local storage', function() {
			        	expect(env.RNFS.writeFile).to.have.been.called;
			        });
	            });
		    });
            
	    	describe('use local', function() {
	        	describe('1', function() {
			    	beforeEach(function(done) {
	                    env.saved.turn = 1;
			            env.Current.prevTurn(env.saved)
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should not retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.not.have.been.calledOnce;
		            });
		            
		            it('should retrieve the scenario', function() {
		            	expect(env.Battles.scenario).to.have.been.calledOnce;
		            	expect(env.Battles.scenario).to.have.been.calledWith(env.saved.scenario);
		            });
		            
		            it('should retrieve the turn', function() {
	                	expect(env.turn).to.be.a.string;
		            	expect(env.turn).to.equal('Nov 15, 1806 07:20 AM');
		            });
                    
			        it('should not save to local storage', function() {
			        	expect(env.RNFS.writeFile).to.not.have.been.called;
			        });
	            });
                
	        	describe('5', function() {
			    	beforeEach(function(done) {
	                    env.saved.turn = 5;
			            env.Current.prevTurn(env.saved)
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should not retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.not.have.been.calledOnce;
		            });
		            
		            it('should retrieve the scenario', function() {
		            	expect(env.Battles.scenario).to.have.been.calledOnce;
		            	expect(env.Battles.scenario).to.have.been.calledWith(env.saved.scenario);
		            });
		            
		            it('should retrieve the turn', function() {
	                	expect(env.turn).to.be.a.string;
		            	expect(env.turn).to.equal('Nov 15, 1806 08:20 AM');
		            });
                    
			        it('should not save to local storage', function() {
			        	expect(env.RNFS.writeFile).to.not.have.been.called;
			        });
	            });
		    });
            
	    });
        
    	describe('next', function() {
	    	describe('use saved', function() {
	        	describe('1', function() {
			    	beforeEach(function(done) {
	                    env.saved.turn = 1;
		        		env.RNFS.readFile.returns(accept(JSON.stringify(env.saved)));
                        env.RNFS.writeFile.returns(accept(env.saved));
			            env.Current.nextTurn()
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.have.been.calledOnce;
		            	expect(env.RNFS.readFile).to.have.been.calledWith(env.filePath);
		            });
		            
		            it('should retrieve the scenario', function() {
		            	expect(env.Battles.scenario).to.have.been.calledTwice;
		            	expect(env.Battles.scenario).to.have.been.calledWith(env.saved.scenario);
		            });
		            
		            it('should retrieve the turn', function() {
	                	expect(env.turn).to.be.a.string;
		            	expect(env.turn).to.equal('Nov 15, 1806 07:40 AM');
		            });
                    
			        it('should save to local storage', function() {
			        	expect(env.RNFS.writeFile).to.have.been.called;
			        });
	            });
                
	        	describe('12', function() {
			    	beforeEach(function(done) {
	                    env.saved.turn = 12;
		        		env.RNFS.readFile.returns(accept(JSON.stringify(env.saved)));
                        env.RNFS.writeFile.returns(accept(env.saved));
			            env.Current.nextTurn()
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.have.been.calledOnce;
		            	expect(env.RNFS.readFile).to.have.been.calledWith(env.filePath);
		            });
		            
		            it('should retrieve the scenario', function() {
		            	expect(env.Battles.scenario).to.have.been.calledTwice;
		            	expect(env.Battles.scenario).to.have.been.calledWith(env.saved.scenario);
		            });
		            
		            it('should retrieve the turn', function() {
	                	expect(env.turn).to.be.a.string;
		            	expect(env.turn).to.equal('Nov 15, 1806 11:00 AM');
		            });
                    
			        it('should save to local storage', function() {
			        	expect(env.RNFS.writeFile).to.have.been.called;
			        });
	            });
		    });
            
            
	    	describe('use local', function() {
	        	describe('1', function() {
			    	beforeEach(function(done) {
	                    env.saved.turn = 1;
			            env.Current.nextTurn(env.saved)
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should not retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.not.have.been.called;
		            });
		            
		            it('should retrieve the scenario', function() {
		            	expect(env.Battles.scenario).to.have.been.calledTwice;
		            	expect(env.Battles.scenario).to.have.been.calledWith(env.saved.scenario);
		            });
		            
		            it('should retrieve the turn', function() {
	                	expect(env.turn).to.be.a.string;
		            	expect(env.turn).to.equal('Nov 15, 1806 07:40 AM');
		            });
                    
			        it('should not save to local storage', function() {
			        	expect(env.RNFS.writeFile).to.not.have.been.called;
			        });
	            });
                
	        	describe('12', function() {
			    	beforeEach(function(done) {
	                    env.saved.turn = 12;
			            env.Current.nextTurn(env.saved)
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should not retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.not.have.been.calledOnce;
		            });
		            
		            it('should retrieve the scenario', function() {
		            	expect(env.Battles.scenario).to.have.been.calledTwice;
		            	expect(env.Battles.scenario).to.have.been.calledWith(env.saved.scenario);
		            });
		            
		            it('should retrieve the turn', function() {
	                	expect(env.turn).to.be.a.string;
		            	expect(env.turn).to.equal('Nov 15, 1806 11:00 AM');
		            });
                    
			        it('should not save to local storage', function() {
			        	expect(env.RNFS.writeFile).to.not.have.been.called;
			        });
	            });
		    });
	    });
    });
    /*
    phase: function(current) {
    prevPhase: function(current) {
    nextPhase: function(current) {
    */
    
	describe('phase ', function() {
    	describe('current', function() {
	    	describe('use saved', function() {
	        	describe('1', function() {
			    	beforeEach(function(done) {
	                    env.saved.phase = 1;
		        		env.RNFS.readFile.returns(accept(JSON.stringify(env.saved)));
			            env.Current.phase()
			            .then((phase) => {
				        	env.phase = phase;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.have.been.calledOnce;
		            	expect(env.RNFS.readFile).to.have.been.calledWith(env.filePath);
		            });
		            
		            it('should retrieve the phase', function() {
	                	expect(env.phase).to.be.a.string;
		            	expect(env.phase).to.equal('Imperial: Charge a Cheval');
		            });
	            });
	            
	        	describe('5', function() {
			    	beforeEach(function(done) {
	                    env.saved.phase = 5;
		        		env.RNFS.readFile.returns(accept(JSON.stringify(env.saved)));
			            env.Current.phase()
			            .then((phase) => {
				        	env.phase = phase;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.have.been.calledOnce;
		            	expect(env.RNFS.readFile).to.have.been.calledWith(env.filePath);
		            });
		            
		            it('should retrieve the phase', function() {
	                	expect(env.phase).to.be.a.string;
		            	expect(env.phase).to.equal('Imperial: Melee Assault');
		            });
	            });
	        });
	        
	    	describe('use local', function() {
	        	describe('1', function() {
			    	beforeEach(function(done) {
	                    env.saved.phase = 1;
			            env.Current.phase(env.saved)
			            .then((phase) => {
				        	env.phase = phase;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should not retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.not.have.been.calledOnce;
		            });
		            
		            it('should retrieve the phase', function() {
	                	expect(env.phase).to.be.a.string;
		            	expect(env.phase).to.equal('Imperial: Charge a Cheval');
		            });
	            });
	            
	        	describe('5', function() {
			    	beforeEach(function(done) {
	                    env.saved.phase = 5;
			            env.Current.phase(env.saved)
			            .then((phase) => {
				        	env.phase = phase;
			                done();
			            })
			            .catch(done);
                        
			        });
		            
		            it('should not retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.not.have.been.calledOnce;
		            });
		            
		            it('should retrieve the phase', function() {
	                	expect(env.phase).to.be.a.string;
		            	expect(env.phase).to.equal('Imperial: Melee Assault');
		            });
	            });
	        });
	    });
        
    	describe('previous', function() {
	    	describe('use saved', function() {
	        	describe('1', function() {
			    	beforeEach(function(done) {
	                    env.saved.phase = 1;
		        		env.RNFS.readFile.returns(accept(JSON.stringify(env.saved)));
                        env.RNFS.writeFile.returns(accept(env.saved));
			            env.Current.prevPhase()
			            .then((phase) => {
				        	env.phase = phase;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.have.been.calledOnce;
		            	expect(env.RNFS.readFile).to.have.been.calledWith(env.filePath);
		            });
		            
		            it('should retrieve the phase', function() {
	                	expect(env.phase).to.be.a.string;
		            	expect(env.phase).to.equal('Command');
		            });
                    
			        it('should save to local storage', function() {
			        	expect(env.RNFS.writeFile).to.have.been.called;
			        });
	            });
                
	        	describe('5', function() {
			    	beforeEach(function(done) {
	                    env.saved.phase = 5;
		        		env.RNFS.readFile.returns(accept(JSON.stringify(env.saved)));
                        env.RNFS.writeFile.returns(accept(env.saved));
			            env.Current.prevPhase()
			            .then((phase) => {
				        	env.phase = phase;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.have.been.calledOnce;
		            	expect(env.RNFS.readFile).to.have.been.calledWith(env.filePath);
		            });
		            
		            it('should retrieve the phase', function() {
	                	expect(env.phase).to.be.a.string;
		            	expect(env.phase).to.equal('Imperial: Offensive Fire');
		            });
                    
			        it('should save to local storage', function() {
			        	expect(env.RNFS.writeFile).to.have.been.called;
			        });
	            });
                
                
	        	describe('0', function() {
			    	beforeEach(function(done) {
	                    env.saved.phase = 0;
		        		env.RNFS.readFile.returns(accept(JSON.stringify(env.saved)));
                        env.RNFS.writeFile.returns(accept(env.saved));
			            env.Current.prevPhase()
			            .then((phase) => {
				        	env.phase = phase;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.have.been.calledOnce;
		            	expect(env.RNFS.readFile).to.have.been.calledWith(env.filePath);
		            });
		            
		            it('should retrieve the phase', function() {
	                	expect(env.phase).to.be.a.string;
		            	expect(env.phase).to.equal('Sovereign: Readiness Recovery');
		            });
                    
			        it('should save to local storage', function() {
			        	expect(env.RNFS.writeFile).to.have.been.called;
			        });
	            });
                
		    });
            
	    	describe('use local', function() {
            	beforeEach(function() {
                	env.RNFS.writeFile.returns(accept(env.saved));
                });
	        	describe('1', function() {
			    	beforeEach(function(done) {
	                    env.saved.phase = 1;
			            env.Current.prevPhase(env.saved)
			            .then((phase) => {
				        	env.phase = phase;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should not retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.not.have.been.calledOnce;
		            });
		            
		            it('should retrieve the phase', function() {
	                	expect(env.phase).to.be.a.string;
		            	expect(env.phase).to.equal('Command');
		            });
                    
			        it('should save to local storage', function() {
			        	expect(env.RNFS.writeFile).to.have.been.called;
			        });
	            });
                
	        	describe('5', function() {
			    	beforeEach(function(done) {
	                    env.saved.phase = 5;
			            env.Current.prevPhase(env.saved)
			            .then((phase) => {
				        	env.phase = phase;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should not retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.not.have.been.calledOnce;
		            });
		            
		            it('should retrieve the phase', function() {
	                	expect(env.phase).to.be.a.string;
		            	expect(env.phase).to.equal('Imperial: Offensive Fire');
		            });
                    
			        it('should save to local storage', function() {
			        	expect(env.RNFS.writeFile).to.have.been.called;
			        });
	            });
		    });
	    });
        
        /*
        describe('next', function() {
	    	describe('use saved', function() {
	        	describe('1', function() {
			    	beforeEach(function(done) {
	                    env.saved.phase = 1;
		        		env.RNFS.readFile.returns(accept(JSON.stringify(env.saved)));
                        env.RNFS.writeFile.returns(accept(env.saved));
			            env.Current.nextPhase()
			            .then((phase) => {
				        	env.phase = phase;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.have.been.calledOnce;
		            	expect(env.RNFS.readFile).to.have.been.calledWith(env.filePath);
		            });
		            
		            it('should retrieve the scenario', function() {
		            	expect(env.Battles.scenario).to.have.been.calledTwice;
		            	expect(env.Battles.scenario).to.have.been.calledWith(env.saved.scenario);
		            });
		            
		            it('should retrieve the phase', function() {
	                	expect(env.phase).to.be.a.string;
		            	expect(env.phase).to.equal('Nov 15, 1806 07:40 AM');
		            });
                    
			        it('should save to local storage', function() {
			        	expect(env.RNFS.writeFile).to.have.been.called;
			        });
	            });
                
	        	describe('12', function() {
			    	beforeEach(function(done) {
	                    env.saved.phase = 12;
		        		env.RNFS.readFile.returns(accept(JSON.stringify(env.saved)));
                        env.RNFS.writeFile.returns(accept(env.saved));
			            env.Current.nextPhase()
			            .then((phase) => {
				        	env.phase = phase;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.have.been.calledOnce;
		            	expect(env.RNFS.readFile).to.have.been.calledWith(env.filePath);
		            });
		            
		            it('should retrieve the scenario', function() {
		            	expect(env.Battles.scenario).to.have.been.calledTwice;
		            	expect(env.Battles.scenario).to.have.been.calledWith(env.saved.scenario);
		            });
		            
		            it('should retrieve the phase', function() {
	                	expect(env.phase).to.be.a.string;
		            	expect(env.phase).to.equal('Nov 15, 1806 11:00 AM');
		            });
                    
			        it('should save to local storage', function() {
			        	expect(env.RNFS.writeFile).to.have.been.called;
			        });
	            });
		    });
            
            
	    	describe('use local', function() {
	        	describe('1', function() {
			    	beforeEach(function(done) {
	                    env.saved.phase = 1;
			            env.Current.nextPhase(env.saved)
			            .then((phase) => {
				        	env.phase = phase;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should not retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.not.have.been.called;
		            });
		            
		            it('should retrieve the scenario', function() {
		            	expect(env.Battles.scenario).to.have.been.calledTwice;
		            	expect(env.Battles.scenario).to.have.been.calledWith(env.saved.scenario);
		            });
		            
		            it('should retrieve the phase', function() {
	                	expect(env.phase).to.be.a.string;
		            	expect(env.phase).to.equal('Nov 15, 1806 07:40 AM');
		            });
                    
			        it('should not save to local storage', function() {
			        	expect(env.RNFS.writeFile).to.not.have.been.called;
			        });
	            });
                
	        	describe('12', function() {
			    	beforeEach(function(done) {
	                    env.saved.phase = 12;
			            env.Current.nextPhase(env.saved)
			            .then((phase) => {
				        	env.phase = phase;
			                done();
			            })
			            .catch(done);
			        });
		            
		            it('should not retrieve from local storage', function() {
		            	expect(env.RNFS.readFile).to.not.have.been.calledOnce;
		            });
		            
		            it('should retrieve the scenario', function() {
		            	expect(env.Battles.scenario).to.have.been.calledTwice;
		            	expect(env.Battles.scenario).to.have.been.calledWith(env.saved.scenario);
		            });
		            
		            it('should retrieve the phase', function() {
	                	expect(env.phase).to.be.a.string;
		            	expect(env.phase).to.equal('Nov 15, 1806 11:00 AM');
		            });
                    
			        it('should not save to local storage', function() {
			        	expect(env.RNFS.writeFile).to.not.have.been.called;
			        });
	            });
		    });
	    });
        */
    });
});