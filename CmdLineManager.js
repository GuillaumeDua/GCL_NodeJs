var	Logger			= require('./Logger.js').Logger;
var colors 			= require('colors');

function			CB_OnProcessSTDINReadable(CmdManagerInstance)
{
	var cb = function()
	{
		var chunk = process.stdin.read();
		if (chunk !== null)
		{
			if (chunk.length < 3) return;
			chunk = chunk.substr(0, chunk.length - 2);	// On retire le "\r\n"
			
			CmdManagerInstance.ManageCmd(chunk);
		}
	}
	return cb;
}

var CmdLineManager = function()
{
	this._cmds 					= {};
	
	this.ManageCmd				= function(chunk)
	{
		var split 	= chunk.split(" ");
		var cmd 	= split[0];
		var args 	= split;
		args.splice(0,1);
		
		Logger.writeFor("CmdLineManager", "Input cmd : [" + cmd.green + "] with args : [" + args.toString() + "]");
		var cb = this.Get(cmd);
		if (cb === null)
			Logger.writeFor("CmdLineManager", "Unknown cmd");
		else
		{
			if (split.length === 0)
				cb();
			else
				cb(args);
		}
		
	}
	this.Insert					= function(key, value)
	{
		this._cmds[key] = value;
	}
	this.Remove					= function(key)
	{
		// [Todo] : splice ?
	}
	this.Get					= function(key)
	{
		if (key in this._cmds)
			return this._cmds[key];
		return null;
	}
	this.StartRecordingInputs	= function()
	{
		// Initialize commande line input :
		process.stdin.setEncoding('utf8');
		process.stdin.on('readable', CB_OnProcessSTDINReadable(this));
	}
};

exports.CmdLineManager = new CmdLineManager();