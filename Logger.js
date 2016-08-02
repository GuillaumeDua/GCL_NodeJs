/*****************************************************************
 * Copyright (C) 2016 Guillaume Dua guillaume.dua@gmail.com
 * 
 * This file is part of GCL_NodeJS,
 * available on github https://github.com/GuillaumeDua/GCL_NodeJs
 * 
 * License informations available at :
 * https://github.com/GuillaumeDua/GCL_NodeJs/blob/master/LICENSE
 *****************************************************************/

var colors 			= require('colors');

var Logger = function(token_width)
{
    this.write		= undefined;
    this.writeFor	= undefined;
    this._tokenWidth	= (token_width == undefined ? 30 : token_width);

    this.start = function()
    {
	this.write	= function(log)
	{
	    console.log("[" + "+".bold.yellow + "]" + " : " + log);
	}
	this.writeFor	= function(token, log)
	{
	    var widthTokenSpaces = (token.length < this._tokenWidth)
		? new Array(this._tokenWidth - token.length).join(' ')
		: ''
	    ;
	    console.log("[" + "+".bold.yellow + "]" + "::[" + token.green + widthTokenSpaces + "] : " + log);
	}
	this.writeFor('Logger', 'Started');
    }
    this.stop = function()
    {
	this.writeFor('Logger', 'Stopping');
	this.write	= function(log)
	{}
	this.writeFor	= function(token, log)
	{}
    }

    this.start(); // started by default
};

exports.Logger = new Logger();
