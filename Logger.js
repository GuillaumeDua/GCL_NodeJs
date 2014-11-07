var colors 			= require('colors');

var Logger = function()
{
	this.write		= function(log)
	{
		console.log("[+]".bold.grey.inverse + " : " + log);
	}
	this.writeFor	= function(token, log)
	{
		console.log("[+]".bold.grey.inverse + "::[" + token.green + "] : " + log);
	}
};

exports.Logger = new Logger();