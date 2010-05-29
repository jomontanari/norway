function TableBuilder(tableHeaders) {
    var headers = [];

    this.buildTable = function(items) {
        var returnString = "<table>";

        if (headers.length > 0) {
            returnString += "<thead><tr>";

            $.each(headers, function(i, header) {
                returnString += "<th>" + header + "</th>";
            });

            returnString += "</tr></thead>";
        }


        if (items.length > 0) {
            returnString += "<tbody>";

            $.each(items, function(i , anItem) {
                returnString += '<tr class="' + (i % 2 === 0 ? 'even' : 'odd') + '">';
                returnString += '<td class="image"><img src="' + anItem.image + '" alt="' + anItem.name + '"/></td>';
                returnString += '<td class="name"><h5>' + anItem.name + '</h5></td>';
                returnString += '<td class="price">&pound;' + anItem.price + '</td>';
                returnString += '<td class="buy">' +
                        '   <form action="/item/add/' + anItem.id + '" method="POST" class="buy">' +
                        '<input type="hidden" name="description" value="' + anItem.name + '"/>' +
                        '<input type="hidden" name="price" value="' + anItem.price + '"/>' +
                        '<input type="submit" value="Add to cart">' +
                        '</form>' +
                        '</td>';
                returnString += "</tr>";
            });
            returnString += "</tbody>";
        }

        return returnString;
    };
}