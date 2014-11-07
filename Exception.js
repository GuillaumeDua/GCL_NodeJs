var Exception	= function(n, msg)
{
    this.name 		= n;
    this.level       	= "Show Stopper";
    this.message	= msg;
    this.htmlMessage	= "";
    this.toString	= function() { return this.name + ": " + this.message }
} 

exports.Base = new Exception();