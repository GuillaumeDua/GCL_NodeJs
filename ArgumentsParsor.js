var colors 			= require('colors');
var Logger			= require('./Logger.js').Logger;

function Dump()
{
	process.argv.forEach(function (val, index, array) {
	  Logger.writeFor("ArgumentsParsor", '[' + index + '] => [' + val.green + ']');
	});
}

// [Todo] : Move to GCL
function 	CreateDelegate(func, target)
{
    return function() { 
        return func.apply(target, arguments);
    };
}


var		ArgumentsLoader = function()
{
	this.args = [];
	
	this.Add			= function(index, default_value)
	{
		this.args[index] = default_value;
	}
	this.GetValue		= function(index)
	{
		return this.args[index];
	}
	
	this.LoadArguments	= function()
	{
		for (var index in process.argv)
			this.args[index] = process.argv[index];
	}
	this.Dump			= function()
	{
		Logger.writeFor('ArgumentsLoader::Dump', 'Dumping loaded arguments');
		for (var element in this.args)
		    Logger.write(" |- " + element + " => " + this.args[element]);
	}
};

exports.Dump 		= Dump;
exports.ArgumentsLoader	= new ArgumentsLoader();
