"use strict";

var makePerson = function(persArr){
    
	// Din kod här...
	var averageAge;
	var namesArr = [];
	var names;
    var minAge = Number.POSITIVE_INFINITY;
    var maxAge = Number.NEGATIVE_INFINITY;
    var tmp;
    var avg;
    for (var i = persArr.length-1; i >= 0; i--) {
        tmp = persArr[i].age;
        if (tmp < minAge) minAge = tmp;
        if (tmp > maxAge) maxAge = tmp;
        if (tmp < maxAge && tmp > minAge) avg = tmp;
    }
    
    
    averageAge = Math.ceil((avg + maxAge + minAge)/persArr.length);
    
    for (var j = persArr.length-1; j >= 0; j--) {
        namesArr[j] = persArr[j].name;
    }
    
    namesArr.sort();
    names = namesArr.join(", ");
    
    
    
    var result = {
        "minAge" : minAge,
        "maxAge" : maxAge,
        "averageAge" : averageAge,
        "names" : names
    };
    
    
    
    return result;
};

var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];

var result = makePerson(data);

console.log(result);
