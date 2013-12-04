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
    
    
    namesArr.sort(function(a, b){ return a.localeCompare(b)});
    names = namesArr.join(", ");
    
    
    
    var result = {
        "minAge" : minAge,
        "maxAge" : maxAge,
        "averageAge" : averageAge,
        "names" : names
    };
    
    
    
    return result;
};
