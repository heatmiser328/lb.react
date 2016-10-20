# lb.react
React Native La Bataille Assistant app

#### another fire view idea

The flow would be to roll the dice to see the possible results, then input the attack/defend/odds to see which you might get.
The idea being, you will intuit if it is worth the bother to figure the odds...

                                attacker                                                                               defender

                                < value >                                                                              < value >
                =             < value > +                                                                          < incr >
                [              modifiers ]
                [quick values ]

attacker quick add (lose the listing of fire effects)                              defender quick add (unchanged)

                matrix/list of possible results (based on current dice value)
                                Odds - Result
                                (IF you had odds of "blah" you would have results of "blah")

                (highlight the result that would be in effect for the current odds, based on attack/defend values)

#### Testing...

https://github.com/airbnb/enzyme/blob/master/docs/guides/react-native.md
https://github.com/lelandrichardson/react-native-mock

http://valuemotive.com/2016/08/01/unit-testing-react-native-components-with-mocha-and-enzyme/


npm run test-dev -- tests/unit/widgets/checkbox-spec.js


####### Shapes

http://browniefed.com/blog/the-shapes-of-react-native/
