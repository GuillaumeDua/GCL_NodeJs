var HttpOption = function() {
    hostname	= '';
    port	= undefined;
    path	= '';
    method	= undefined;
};

function UrlToHTTPOption(url)
{
    var httpOption = new HttpOption();

    var pos;
    if (url.substring(0, 8) === "https://") pos = 8;
    else if (url.substring(0, 7) === "http://") pos = 7;
    else pos = 0;

    var dot_pos = url.substring(pos, url.length).indexOf(":");
    if (dot_pos !== -1) dot_pos += pos;

    var slash_pos = url.substring(pos, url.length).indexOf("/");
    if (slash_pos === -1)
	httpOption.hostname = url.substring(pos, (dot_pos === -1 ? url.length : dot_pos));
    else
    {
	slash_pos += pos;
	httpOption.hostname = url.substring(pos, (dot_pos === -1 ? slash_pos : dot_pos));
	httpOption.path = url.substring(slash_pos, url.length);
    }

    if (dot_pos !== -1)
	httpOption.port = url.substring(dot_pos + 1, (slash_pos === -1 ? url.length : slash_pos));

    return httpOption;
};

exports.UrlToHTTPOption	= UrlToHTTPOption;
exports.HttpOption	= HttpOption;

