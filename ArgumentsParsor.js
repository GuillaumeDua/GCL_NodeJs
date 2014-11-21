var colors 			= require('colors');

function Dump()
{
	process.argv.forEach(function (val, index, array) {
	  Logger.writeFor("Arguments", '[' + index + '] => [' + val.green + ']');
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
		console.log("ArgumentsLoader::Dump");
		for (var element in this.args)
			console.log(element + " => " + this.args[element]);
	}
};

exports.Dump 			= Dump;
exports.ArgumentsLoader	= new ArgumentsLoader();