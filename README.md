# lb.react
React Native La Bataille Assistant app

#### Idea for fire combat ux
(I know, previous efforts to support this kind of interface were dismal failures; but maybe a touch interface will be better? worth a try???)

##### attacker:
1. keep the spin input (as the total) and quick values buttons
2. expand to include a "quick add" feature:
	- nationality	(french,austrian,etc)
	- unit type		(infantry,jaeger,arty,etc)
	- formation		(column,line,etc)
	- size			(# increments)
	- modifiers		(dg,carre,2hex,etc)
	- value			(read only?)
	- add			(button to add value to the total)

##### defender:
1. keep the spin input (as the total) and quick values buttons
2. expand to include a "quick select" feature:
	- nationality	(french,austrian,etc)
	- terrain		(clear,forest,etc)
	- formation		(column,line,etc)
	- density		(# increments > 9)
	- modifiers		(flank,arty w/infantry,etc)
	- value			(read only?)
	- select		(button to set value to the total)


##### Layout

			Attack									Defend

		<	total	>							<	total	>
	[	quick values	]					[	quick values	]
	[	modifiers		]						<	density	>

	-- attack quick add --
	nationality			unit type			formation		size			modifiers			value	add
	[select list]		[select list]		[select list]	[spin input]	[multi-select list]	[text]	[button]
	(load unit types)	(load formations)	(set max size)

	-- defend quick select --
	nationality			terrain				formation		density			modifiers			value	select
	[select list]		[select list]		[select list]	[spin input]	[multi-select list]	[text]	[button]


	[	odds	]							[	results	]
	[					dice							]
	[					dice modifiers					]
