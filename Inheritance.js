/*****************************************************************
 * Copyright (C) 2016 Guillaume Dua guillaume.dua@gmail.com
 * 
 * This file is part of GCL_NodeJS,
 * available on github https://github.com/GuillaumeDua/GCL_NodeJs
 * 
 * License informations available at :
 * https://github.com/GuillaumeDua/GCL_NodeJs/blob/master/LICENSE
 *****************************************************************/

var Class = function()
{
    this.initialize && this.initialize.apply(this, arguments);
};

Class.extend = function(childPrototype)
{
    var parent 		= this;
    
    var child 		= function()
    {
        return parent.apply(this, arguments);
    };
	
    child.extend 		= parent.extend;
    var Surrogate 		= function() {};
    Surrogate.prototype = parent.prototype;
    child.prototype		= new Surrogate;
    for (var key in childPrototype)
        child.prototype[key] = childPrototype[key];

    return child;
};

exports.Class = Class;
