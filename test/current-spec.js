var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sandbox = require('sandboxed-module');
chai.use(require('sinon-chai'));
var moment = require('moment');
var promise = require('./mocks/promise.js');

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
    
	describe('load', function() {
    	describe('not previously saved', function() {
	    	beforeEach(function(done) {
            	env.RNFS.readFile.returns(promise.accept(null));
                env.Current.load()
                .then((exists) => {
		        	env.exists = exists;
                    done();
                })
                .catch(done);
	        });
            it('should retrieve from local storage', function() {
            	expect(env.RNFS.readFile).to.have.been.calledOnce;
            	expect(env.RNFS.readFile).to.have.been.calledWith(env.filePath);
            });
            
            it('should retrieve the object', function() {
            	expect(env.exists).to.be.false;
            });
        });
        
    	describe('previously saved', function() {
	    	beforeEach(function(done) {
            	env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
                env.Current.load()
                .then((exists) => {
		        	env.exists = exists;
                    done();
                })
                .catch(done);
	        });
            it('should retrieve from local storage', function() {
            	expect(env.RNFS.readFile).to.have.been.calledOnce;
            	expect(env.RNFS.readFile).to.have.been.calledWith(env.filePath);
            });
            
            it('should retrieve the object', function() {
            	expect(env.exists).to.be.true;
            });
        });
    });
    
	describe('save', function() {
    	beforeEach(function(done) {
        	env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
            env.RNFS.writeFile.returns(promise.accept(true));
            env.Current.load()
            .then(() => {
	            return env.Current.save();
            })
            .then(() => {
                done();
            })
            .catch(done);
        });
        it('should save to local storage', function() {
        	expect(env.RNFS.writeFile).to.have.been.calledWith(env.filePath, JSON.stringify(env.saved));
        });
    });
    
	describe('remove', function() {
    	beforeEach(function(done) {
        	env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
            env.RNFS.unlink.returns(promise.accept(true));
            env.Current.load()
            .then(() => {
	            return env.Current.remove();
            })
            .then(() => {
                done();
            })
            .catch(done);
        });
        it('should remove from local storage', function() {
        	expect(env.RNFS.unlink).to.have.been.calledWith(env.filePath);
        });
    });
    
	describe('reset', function() {
    	beforeEach(function(done) {
        	env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
            env.RNFS.writeFile.returns(promise.accept(env.saved));
            env.Current.load()
            .then(() => {
	            return env.Current.reset(env.data);
            })
            .then(() => {
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
    });
    
	describe('turn', function() {
    	describe('current', function() {
        	describe('1', function() {
		    	beforeEach(function(done) {
                    env.saved.turn = 1;
                    env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
                    
		            env.Current.load()
		            .then(() => {
			        	env.turn = env.Current.turn();
		                done();
		            })
		            .catch(done);
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
                    env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
		            env.Current.load()
		            .then(() => {
			        	env.turn = env.Current.turn();
		                done();
		            })
		            .catch(done);
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
        
    	describe('previous', function() {
        	describe('no save', function() {
	        	describe('1', function() {
			    	beforeEach(function(done) {
	                    env.saved.turn = 1;
		        		env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
	                    env.RNFS.writeFile.returns(promise.accept(env.saved));
			            env.Current.load()
			            .then(() => {
	                        return env.Current.prevTurn();
			            })
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
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
		        		env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
	                    env.RNFS.writeFile.returns(promise.accept(env.saved));
			            env.Current.load()
			            .then(() => {
	                        return env.Current.prevTurn();
			            })
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
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
            
        	describe('save', function() {
	        	describe('1', function() {
			    	beforeEach(function(done) {
	                    env.saved.turn = 1;
		        		env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
	                    env.RNFS.writeFile.returns(promise.accept(env.saved));
			            env.Current.load()
			            .then(() => {
	                        return env.Current.prevTurn(true);
			            })
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
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
	                	expect(env.RNFS.writeFile).to.have.been.calledWith(env.filePath, JSON.stringify(env.saved));
			        });
	            });
	            
	        	describe('5', function() {
			    	beforeEach(function(done) {
	                    env.saved.turn = 5;
		        		env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
	                    env.RNFS.writeFile.returns(promise.accept(env.saved));
			            env.Current.load()
			            .then(() => {
	                        return env.Current.prevTurn(true);
			            })
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
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
	    });
        
    	describe('next', function() {
        	describe('no save', function() {
	        	describe('1', function() {
			    	beforeEach(function(done) {
	                    env.saved.turn = 1;
		        		env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
			            env.Current.load()
			            .then(() => {
                            return env.Current.nextTurn();
			            })
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
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
		        		env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
	                    env.RNFS.writeFile.returns(promise.accept(env.saved));
			            env.Current.load()
			            .then(() => {
                            return env.Current.nextTurn();
			            })
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
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
        	describe('save', function() {
            	beforeEach(function() {
                	env.RNFS.writeFile.returns(promise.accept(env.saved));
                });
                
	        	describe('1', function() {
			    	beforeEach(function(done) {
	                    env.saved.turn = 1;
		        		env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
			            env.Current.load()
			            .then(() => {
                            return env.Current.nextTurn(true);
			            })
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
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
		        		env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
			            env.Current.load()
			            .then(() => {
                            return env.Current.nextTurn(true);
			            })
			            .then((turn) => {
				        	env.turn = turn;
			                done();
			            })
			            .catch(done);
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
	    });
    });
    
    /*
    phase: function(current) {
    prevPhase: function(current) {
    nextPhase: function(current) {
    */
    
	describe('phase', function() {
    	describe('current', function() {
        	describe('1', function() {
		    	beforeEach(function(done) {
                    env.saved.phase = 1;
	        		env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
		            env.Current.load()
		            .then(() => {
                        return env.Current.phase();
		            })
		            .then((phase) => {
			        	env.phase = phase;
		                done();
		            })
		            .catch(done);
		        });
	            
	            it('should retrieve the phase', function() {
                	expect(env.phase).to.be.a.string;
	            	expect(env.phase).to.equal('Imperial: Charge a Cheval');
	            });
            });
            
        	describe('5', function() {
		    	beforeEach(function(done) {
                    env.saved.phase = 5;
	        		env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
		            env.Current.load()
		            .then(() => {
                        return env.Current.phase();
		            })
		            .then((phase) => {
			        	env.phase = phase;
		                done();
		            })
		            .catch(done);
		        });
	            
	            it('should retrieve the phase', function() {
                	expect(env.phase).to.be.a.string;
	            	expect(env.phase).to.equal('Imperial: Melee Assault');
	            });
	        });
	    });
        
    	describe('previous', function() {
        	beforeEach(function() {
            	env.RNFS.writeFile.returns(promise.accept(env.saved));
            });
        
        	describe('1', function() {
		    	beforeEach(function(done) {
                    env.saved.phase = 1;
	        		env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
		            env.Current.load()
		            .then(() => {
                        return env.Current.prevPhase();
		            })
		            .then((phase) => {
			        	env.phase = phase;
		                done();
		            })
		            .catch(done);
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
	        		env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
		            env.Current.load()
		            .then(() => {
                        return env.Current.prevPhase();
		            })
		            .then((phase) => {
			        	env.phase = phase;
		                done();
		            })
		            .catch(done);
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
                    env.saved.turn = 5;
                    env.saved.phase = 0;
	        		env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
		            env.Current.load()
		            .then(() => {
                        return env.Current.prevPhase();
		            })
		            .then((phase) => {
			        	env.phase = phase;
                        env.turn = env.Current.turn();
		                done();
		            })
		            .catch(done);
		        });
	            
	            it('should retrieve the phase', function() {
                	expect(env.phase).to.be.a.string;
	            	expect(env.phase).to.equal('Sovereign: Readiness Recovery');
	            });
                
	            it('should move to previous turn', function() {
                	expect(env.turn).to.be.a.string;
                    expect(env.turn).to.equal('Nov 15, 1806 08:20 AM');
	            });
                
		        it('should save to local storage', function() {
		        	expect(env.RNFS.writeFile).to.have.been.called;
		        });
            });
	    });
        
        describe('next', function() {
        	beforeEach(function() {
            	env.RNFS.writeFile.returns(promise.accept(env.saved));
            });
        
        	describe('1', function() {
		    	beforeEach(function(done) {
                    env.saved.phase = 1;
	        		env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
		            env.Current.load()
		            .then(() => {
                        return env.Current.nextPhase();
		            })
		            .then((phase) => {
			        	env.phase = phase;
		                done();
		            })
		            .catch(done);
		        });
	            
	            it('should retrieve the phase', function() {
                	expect(env.phase).to.be.a.string;
	            	expect(env.phase).to.equal('Imperial: Movement');
	            });
                
		        it('should save to local storage', function() {
		        	expect(env.RNFS.writeFile).to.have.been.called;
		        });
            });
            
        	describe('12', function() {
		    	beforeEach(function(done) {
                    env.saved.phase = 12;
	        		env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
		            env.Current.load()
		            .then(() => {
                        return env.Current.nextPhase();
		            })
		            .then((phase) => {
			        	env.phase = phase;
		                done();
		            })
		            .catch(done);
		        });
	            
	            it('should retrieve the phase', function() {
                	expect(env.phase).to.be.a.string;
	            	expect(env.phase).to.equal('Sovereign: Melee Assault');
	            });
                
		        it('should save to local storage', function() {
		        	expect(env.RNFS.writeFile).to.have.been.called;
		        });
            });
            
        	describe('16', function() {
		    	beforeEach(function(done) {
                	env.saved.turn = 5;
                    env.saved.phase = 16;
	        		env.RNFS.readFile.returns(promise.accept(JSON.stringify(env.saved)));
		            env.Current.load()
		            .then(() => {
                        return env.Current.nextPhase();
		            })
		            .then((phase) => {
			        	env.phase = phase;
                        env.turn = env.Current.turn();
		                done();
		            })
		            .catch(done);
		        });
	            
	            it('should retrieve the phase', function() {
                	expect(env.phase).to.be.a.string;
	            	expect(env.phase).to.equal('Command');
	            });
                
	            it('should move to next turn', function() {
                	expect(env.turn).to.be.a.string;
                    expect(env.turn).to.equal('Nov 15, 1806 09:00 AM');
	            });
                
		        it('should save to local storage', function() {
		        	expect(env.RNFS.writeFile).to.have.been.called;
		        });
            });
	    });
    });
});