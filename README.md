# lb.react
React Native La Bataille Assistant app

#### Reintroduce the Charge view?
Yes, this was a drag before, but maybe we know better than our past self?

redesign melee view to be a set of tabs:

Assault		Charge		Resolution

##### assault:
odds selection		(pre-melee morale check modifiers)
attack morale		(multiple?)
defend morale		(multiple?)
modifiers selection (infantry pre-melee morale modifiers)
dice
results

###### Layout

odds [multi select list]		
		Attack							Defend
attack [multi numeric/image list]	defend [multi numeric/image list]
	try this...
	[multi morale/result list]
	< morale >  [image]
	[	quick value buttons	]

modifiers [multi select list]		modifiers [multi select list]
					[dice]					
				[dice modifiers]


##### charge:
1. carre realization
nationality
formation
distance
modifiers (from carre realization table)
dice
results

2. stand
modifiers	(cavalry charge modifiers)
dice
results

###### Layout

				radio (stand/carre)

		Stand									Carre
	< unit morale >						nationality [select list]
	< leader >							formation [select list]
	modifiers [multi select list]			< distance >
										modifiers [multi select list]
				[results]			[dice]									
					[dice modifiers]


##### resolution:
what is now the melee view, unchanged(?)

?try to incorporate melee value modifiers list into the melee calc view?


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
	- terrain		(clear,forest,etc)
	- formation		(column,line,etc)
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
