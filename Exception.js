/*****************************************************************
 * Copyright (C) 2016 Guillaume Dua guillaume.dua@gmail.com
 * 
 * This file is part of GCL_NodeJS,
 * available on github https://github.com/GuillaumeDua/GCL_NodeJs
 * 
 * License informations available at :
 * https://github.com/GuillaumeDua/GCL_NodeJs/blob/master/LICENSE
 *****************************************************************/

var Exception	= function(n, msg)
{
    this.name 		= n;
    this.level       	= "Show Stopper";
    this.message	= msg;
    this.htmlMessage	= "";
    this.toString	= function() { return this.name + ": " + this.message }
} 

exports.Base = new Exception();
