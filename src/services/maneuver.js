let standard = [
    {image: 'regroup', count: 1},
    {image: 'reinforcements', count: 1},
    {image: 'leader', count: 1},
    {image: 'artillery', count: 1}
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
        return {
            cup: [...standard],
            items: shuffle([...standard])
        };
    },
    add(image, cup, items) {
        var item = cup.find((i) => i.image == image);
        if (item) {
            item.count++;
        } else {
            item = {image: image, count: 1};
            cup = [
                item,
                ...cup
            ];
        }
        items.push(item);
        
        return {
            cup: cup,
            items: shuffle(items)
        };
    },
    remove(image, cup, items) {
        var idx = cup.findIndex((i) => i.image == image);
        if (idx > -1) {
            var item = cup[idx];    
            if (--item.count < 1) {
                cup.splice(idx,1);
            }                
        } 
        var sameitems = items.filter((i) => i.image == image).sort((l,r) => {
            if (l.player < r.player) {return -1;}
            if (l.player > r.player) {return 1;}
            if (l.count < r.count) {return 1;}
            if (l.count > r.count) {return -1;}
            return 0;
        });
        if (sameitems && sameitems.length > 0) {
            idx = items.findIndex(sameitems[0]);
            if (idx > -1) {
                items.splice(idx,1);
            }
        }            

        return {
            cup: cup,
            items: shuffle(items)
        };        
    },
    draw(cup,items) {
        var item = items.shift();
        var idx = cup.findIndex((i) => i.image == image);
        if (idx > -1) {
            if (--(cup[idx]).count < 1) {
                cup.splice(idx,1);
            }                
        } 
        return {
            current: item,
            items: shuffle(items),
            cup: cup
        };
    }
}