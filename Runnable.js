/*****************************************************************
 * Copyright (C) 2016 Guillaume Dua guillaume.dua@gmail.com
 * 
 * This file is part of GCL_NodeJS,
 * available on github https://github.com/GuillaumeDua/GCL_NodeJs
 * 
 * License informations available at :
 * https://github.com/GuillaumeDua/GCL_NodeJs/blob/master/LICENSE
 *****************************************************************/

var Class		= require('./Inheritance.js').Class;

var Runnable		= Class.extend(
    {
	_bIsRunning 		: false,
	_cbCallBack 		: null,
	_timeInterval 		: null,
	_intervalObject		: null,
	
	StartOnce 		:	function()
	{
	    if (this._bIsRunning === true ||
			this._cbCallBack === null) return false;
	    
	    this._bIsRunning = true;
	    this._cbCallBack();
	    this._bIsRunning = false;
	    return true;
	},
	Start			:	function()
	{
		console.log("[+] Runnable::Start");
	    if (this._bIsRunning === true ||
			this._cbCallBack === null)
	    {
			console.log("[ERROR] : Runnable::Start : is already running or no callback set ! _bIsRunning : " + this._bIsRunning);
			return false;
	    }
	    
	    this._bIsRunning = true;
	    while (this._bIsRunning)
			this._cbCallBack();
	    return true;
	},
	// [WARNING] : `this` wont define the current `Runnable` instance anymore.
	//             It will define the _timeInterval instance instead
	StartTimedCall		: 	function(delay)
	{
		console.log("[+] Runnable::StartTimedCall");
	    this._timeInterval = delay;
	    if (this._intervalObject !== null)
	    {
			console.log("[ERROR] : Runnable::StartTimedCall : Is already running !");
			return;
	    }
	    this._intervalObject = setInterval(this._cbCallBack, this._timeInterval);
	},
	Stop			: 	function()
	{
		console.log("[+] Runnable::Stop");
	    this._bIsRunning = false;
	    if (this._intervalObject !== null)
		{
			clearInterval(this._intervalObject);
			this._intervalObject = null;
		}
	}
    });

exports.Base = Runnable;
