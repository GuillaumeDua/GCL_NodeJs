var mongoDBClient		= require('mongodb').MongoClient;
var colors				= require('colors');

function	CB_DBWrapper_ONConnected(oThis, collectionNameArray)
{
    var cb = function(err, db)
    {
	{
	    if (err)
	    {
		console.log("[ERROR] : Cannot access the db : ".red + oThis._url + " : " + err);
		process.exit(0);
	    }
	    oThis._db = db;
	    oThis._collection = {};
	    for (var it in collectionNameArray)
	    {
		console.log("[+] Loading table : [".green + collectionNameArray[it] + "] ...".green);
		oThis._collection[collectionNameArray[it]] = db.collection(collectionNameArray[it]);
	    }
	    console.log("[+] Connected  to : [".yellow + oThis._url + "]".yellow);
	    console.log("    For tables :".yellow);
	    for (var table in oThis._collection)
		console.log("\t\t - [".yellow + table + "]".yellow);
	    console.log("\n\n");
	}
    };
    return cb;
};

// [TODO] : Replace CB by Closures
var DBWrapper		= function(url)
{
    this._db		= null;
    this._collection	= null;
    this._url		= url;

    this.ConnectTo	= function(collectionNameArray)
    {
	console.log("[+] Connecting to : [".green + this._url + "] ...".green);
	mongoDBClient.connect(this._url, CB_DBWrapper_ONConnected(this, collectionNameArray));
    }

    this.InsertDataInto	= function(data, collectionName) // Into a Callback
    {
	// dbWrapper

	if (this._collection === null)
	    throw Exception("Not initialized", "DataStocker::InsertData : ::_collection is not initialized".red);
	if (collectionName in this._collection)
	{
	    data.created_at = new Date();
	    this._collection[collectionName].insert(data, function(err, db)
						    {
							if(err) return console.dir(err);
						    });
	}
	else throw Exception("No found connection", "DataStocker::InsertData : ::_collection : not collection [" + collectionName  + "] found !");
    }
};

exports.Wrapper = DBWrapper;