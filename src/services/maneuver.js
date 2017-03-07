let standard = [
    {image: 'regroup'},
    {image: 'reinforcements'},
    {image: 'leader'},
    {image: 'artillery'}
];

let shuffle = (a) => {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
	return a;
}


module.exports = {
    reset() {
        return shuffle([...standard]);
    },
    add(image, cup) {        
        var items = cup.filter((i) => i.image == image) || [];
        cup = [
            {image: image, number: items.length + 1},
            ...cup
        ];
               
        return shuffle(cup);        
    },
    remove(item, cup) {
        var idx = cup.findIndex((i) => i == item);
        if (idx > -1) {
            cup.splice(idx,1);            
        } 
        return shuffle(cup)        
    },
    draw(cup,all) {
        var item = shuffle(cup).shift();
        if (all && item) {
            // all = remove all of the same type
            cup = cup.filter((i) => i.image != item.image);
            delete item['number'];  // whack the number
        }
        return {
            mu: item,
            cup: cup
        };
    }
}