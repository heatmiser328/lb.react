# lb.react
React Native La Bataille Assistant app

### Objective the first
To work with interesting technologies I'll probably never get to use professionally! Right now that means React Native.

- [React Native] (https://facebook.github.io/react-native/)
- [Redux] (https://github.com/reactjs/redux)
- [React Redux] (https://github.com/gaearon/react-redux)
- [Reselect] (https://github.com/reactjs/reselect)

And some other bits that help make this work:

- [React Native Drawer] (https://github.com/rt2zz/react-native-drawer)
- [React Native Router Flux] (https://github.com/aksonov/react-native-router-flux)
- [React Native File System] (https://github.com/johanneslumpe/react-native-fs)
- [React Native Audio Player] (https://github.com/andreaskeller/react-native-audioplayer)

#### While I do like testing... I just haven't bothered with it for this project. But, when I do test:

##### This is good for React components
- [Jest](https://facebook.github.io/jest/)

##### But I still prefer this set
- [Mocha] (https://mochajs.org/)
- [Chai] (http://chaijs.com/)
- [Sinon] (http://sinonjs.org/)
- [Sandboxed Module] (https://github.com/felixge/node-sandboxed-module)

### Objective the second
Get charts off the game table and streamline play.

#### La Bataille
I credit the [Premier Rules] (http://www.labataille.me/Rules_and_Charts.html) from Marshal Enterprises with pulling me back to these games, and 
this assistant reflects that perspective. However, it should "work" with any of the rule sets from [Clash of Arms] (http://clashofarms.com/) as well.

#### The App
##### What the app Isn't
It is not a game! La Bataille is a series of board games, each depicting a battle from the Era of Napoleon I. Get some and play.

##### What the app Is
It is an Assistant for the board games. It's purpose is to streamline game play on the table. It has no maps, no counters: just interfaces to nearly eliminate the need for dice or charts on the table.
(Yes some will dearly miss the dice and not trust the psuedo-random die generator, but can't have an assistant without letting go a little).

##### Navigation
To get started, a game and scenario must be selected. The "hamburger" icon pulls out navigation menu, listing the games available (nearly all of them) and the scenarios.
![Battles](https://github.com/jcapuano328/lb.react/raw/master/doc/Navigation.1.png "Battle Navigation")

![Scenarios](https://github.com/jcapuano328/lb.react/raw/master/doc/Navigation.2.png "Scenario Navigation")

(There is a quirk with the component I'm using that can cause the scenario list to scroll out of view; will probably fix that one day...)

Selecting a scenario will load the details and display the main view.

##### Main View
The main view displays the title, scenario, and a tab of the views.

![Main](https://github.com/jcapuano328/lb.react/raw/master/doc/Main.png "Main")

The lowercase "i" on the right displays an About view, while the "recycle" button will reset the current game to the first turn.

Scroll between the views by swiping left or right or touching the tab title.

##### Turn
![Turn](https://github.com/jcapuano328/lb.react/raw/master/doc/Turn.png "Turn, Phase, Player")

The Turn widget is on the top of the main view. The left and right arrows will navigate to the previous or next Turn or Phase. Navigating "past" the final phase of a player turn will move to the first phase and the next player. The "Player" icon on the right will display the battle flag for the phasing player. Touch the icon to switch to the other player. Navigating "past" the final phase of a turn will move to the first phase of the next turn and the first player. (you get the idea).

##### Charge

###### Stand
![Stand](https://github.com/jcapuano328/lb.react/raw/master/doc/Charge.Stand.png "Stand")
###### Form Square
![Form Square](https://github.com/jcapuano328/lb.react/raw/master/doc/Charge.FormSquare.png "Form Square")
###### Recall
![Recall](https://github.com/jcapuano328/lb.react/raw/master/doc/Charge.Recall.png "Recall")

##### Fire
![Fire](https://github.com/jcapuano328/lb.react/raw/master/doc/Fire.png "Fire")

##### Assault
![Assault](https://github.com/jcapuano328/lb.react/raw/master/doc/Assault.png "Assault")

##### Melee
![Melee](https://github.com/jcapuano328/lb.react/raw/master/doc/Melee.png "Melee")

##### Morale
![Morale](https://github.com/jcapuano328/lb.react/raw/master/doc/Morale.png "Morale")

##### General Stuff
![General](https://github.com/jcapuano328/lb.react/raw/master/doc/General.png "General Dice, Artillery Limber")

##### Victory
![Victory](https://github.com/jcapuano328/lb.react/raw/master/doc/Victory.png "Victory")



### Get some games!
- [Marshal Enterprises] (http://www.labataille.me/Home_Page.php)
  - Both free print and play as well as "professionally" published games
- [Clash of Arms] (http://clashofarms.com/)
  - Several excellent titles currently in print
- [La Bataille US] (http://labataille.us/)
  - A "fan" site with plenty of extras for published games as well as a couple of print and play games