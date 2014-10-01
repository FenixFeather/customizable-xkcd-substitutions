 var replacements = { };

function walk(node)
{
    // I stole this function from here:
    // http://is.gd/mwZp7E
    var child, next;
    switch ( node.nodeType )
    {
    case 1: // Element
    case 9: // Document
    case 11: // Document fragment
	child = node.firstChild;
	while ( child )
	{
	    next = child.nextSibling;
	    walk(child);
	    child = next;
	}
	break;
    case 3: // Text node
	handle_text(node);
	break;
    }
}

function get_replacements()
{
   
    console.log(JSON.stringify(replacements));
    return replacements;
}

self.port.on("replacements_update", function(json_string) {
    replacements = JSON.parse(["{", json_string.replace(/'/g, "\""), "}"].join(""));
    console.log(replacements);
    walk(document.body);
});

function handle_text(textNode)
{
    var v = textNode.nodeValue;

    // replacements = get_replacements();
    replacements_keys = Object.keys(replacements);
    
    for (ii = 0; ii < replacements_keys.length; ii++){
	console.log(["\\b", replacements[replacements_keys[ii]], "\\b"].join(""));
	v = v.replace(RegExp(["\\b", replacements_keys[ii], "\\b"].join(""),
			     "g"), replacements[replacements_keys[ii]]);
	textNode.nodeValue = v;
    }
}




