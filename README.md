# lb.react
React Native La Bataille Assistant app

## Objective
Get charts off the game table and streamline play.

### La Bataille
I credit the [Premier Rules] (http://www.labataille.me/Rules_and_Charts.html) from Marshal Enterprises with pulling me back to these games, and this assistant reflects that perspective. However, it should "work" with any of the rule sets from [Clash of Arms] (http://clashofarms.com/) as well.

### The App
#### What the app Isn't
It is not a game! La Bataille is a series of board games, each depicting a battle from the Era of Napoleon I. Get some and play.

#### What the app Is
It is an Assistant for the board games. It's purpose is to streamline game play on the table. It has no maps, no counters: just interfaces to reduce the need for dice or charts on the table. (Yes some will dearly miss the dice and not trust the psuedo-random die generator, but can't have an assistant without letting go a little).

#### A note on the UI design
The goal was to have each "activity" represented entirely in it's own view; no pop ups (aside from the numeric keypad) or tedious navigation necessary to complete a game function. 

There is an "advanced" UI that relies on the special rules and charts for a game. That is a lot of boring data entry, so this assistant includes only the fundamental systems that are common (mostly) across all rule sets: Fire combat, Melee resolution, and Morale checks.

Now, on with the show...

#### Navigation
To get started, a game and scenario must be selected. The "hamburger" icon pulls out the navigation menu, listing the games available (nearly all of those published) and their scenarios.

![Battles](https://github.com/jcapuano328/lb.react/raw/basic-ux/doc/Navigation.png "Battle Navigation")

(There is a quirk with the component I'm using that can cause the scenario list to scroll out of view; will probably fix that one day...)

Selecting a scenario will load the details and display the main view.

#### Main View
The main view displays the title, scenario, and a tab of the activity views.

![Main](https://github.com/jcapuano328/lb.react/raw/basic-ux/doc/Main.png "Main")

The lowercase "i" on the right displays an About view, while the "recycle" button will reset the current game to the first turn.

Scroll between the activity views by swiping left or right or touching the tab title.

#### Turn
![Turn](https://github.com/jcapuano328/lb.react/raw/basic-ux/doc/Turn.png "Turn, Phase, Player")

The Turn widget is on the top of the main view. The left and right arrows will navigate to the previous or next Turn or Phase. Navigating "past" the final phase of a player turn will move to the first phase and the next player. The "Player" icon on the right will display the battle flag for the current player. Touch the icon to switch to the other player. Navigating "past" the final phase of a turn will move to the first phase of the next turn and the first player. (you get the idea).

#### Dice
![Dice](https://github.com/jcapuano328/lb.react/raw/basic-ux/doc/Dice.png "Dice")

Each view includes a panel of dice at the top, the number of which varies based on the requirements of the activity. The "Roll" button will generate psuedo-random results for each die. Tap a die to increment it's value by 1. The big blue buttons will adjust the 2 left-most dice as base-6: +6 on the dice 3 and 6 (36) will yield dice 4 and 6 (46). Most of the dice-related activities in La Bataille are base-6, and the modifiers behave accordingly. As the dice values are changed, the associated activity will adjust the results accordingly.

Psuedo-random sometimes doesn't seem very random at all. Occasionally a dice roll will produce the same results twice in a row. I've tried a fair number of approaches over the years without any better results, so I decided to settle on this. Done.

#### Fire
![Fire](https://github.com/jcapuano328/lb.react/raw/basic-ux/doc/Fire.png "Fire")

Fire combat resolution in LB can be time consuming. Experienced players tend to "know" the fire table and can guess when a loss might be pending. A typical approach is to throw the dice and if the number "seems" high enough, calculate the odds and consult the table. The assistant takes a similar approach. The results are listed under the dice, consisting of the a list of odds and results the current dice would yield. If the player guesses a combat might fall in the range of the results, they can then enter the specific fire and defense values and the actual result (if any) will be highlighted in the list.

The object is to quickly proceed down a line of fires, rolling dice and applying results while keeping attention on the game, not the app.

##### Dice
The red and white dice are the fire combat dice used to consult the table. The blue die in the leader casualty die, while the 2 black dice are the leader casualty duration dice. The purple and yellow dice are for any morale check that might result from the fire.

##### Combat Results
A listing of results possible for the current dice is displayed on the left of the result area. The odds and outcome (increment loss and morale check) are included. As the dice or odds are changed, the list updates to reflect the corresponding outcomes. If the current odds are included, the list scrolls to present them highlighted in gold.

##### Leader loss
In the event of a leader casualty, the outcome will be presented with icons and appropriate text in center of the result area.

##### Morale
A list of morale check outcomes is presented and can be consulted in the event a fire combat yields a morale check. The table presents the morale value that would pass/fail for the given morale dice, along with a few modified results.

##### Attack/Defend values
The attacker fire value can be entered directly into the numeric input; use the left/right buttons to increment/decrement the value by 1. A set of quick value buttons (4,6,9,etc) can be used to get a close value that can be adjusted. 

The defender value can also be entered directly into the numeric input and also includes a set of quick value buttons.

#### Melee
![Melee](https://github.com/jcapuano328/lb.react/raw/basic-ux/doc/Melee.png "Melee")

If Fire Combat is time consuming, Melee is more so. This view is very similar to the Fire view in that it presents a set of results corresponding to the dice roll, allowing the player to guess-timate the combat odds and decide if an outcome is likely. The actual odds can either be selected or calculated by entering the attacker and defender melee values. Since melee values are proportional to losses, a simplistic "calculator" is included at the bottom of the view, complete with modifiers, to lessen the math burden.

The combat results, leader casualty, and morale results function the same as on the Fire view.

##### Dice
The red and white dice are the melee combat dice used to consult the table. The blue die in the leader casualty die, while the 2 black dice are the leader casualty duration dice. The purple and yellow dice are for any morale check that might result from the melee.

#### Morale
![Morale](https://github.com/jcapuano328/lb.react/raw/basic-ux/doc/Morale.png "Morale")

The Morale View is for ad hoc morale checks (opportunity charge, overstacking, etc) and rally checks.

The numeric entry and modifier selection should be familiar by now. A listing of results is presented based on the dice to allow the player to quickly determine the outcome of the roll. When in doubt, enter the correct morale and modifiers. The result is displayed as a pass/fail icon.

#### General
![General](https://github.com/jcapuano328/lb.react/raw/basic-ux/doc/General.png "General Dice")

The General view is just a place to stick some dice for miscellaneous rolls: reinforcements, command, and other systems the assistant does not include.



## Get some games!
- [Marshal Enterprises] (http://www.labataille.me/Home_Page.php)
  - Both free print and play as well as "professionally" published games
- [Clash of Arms] (http://clashofarms.com/)
  - Several excellent titles currently in print
- [La Bataille US] (http://labataille.us/)
  - A "fan" site with plenty of extras for published games as well as a couple of print and play games