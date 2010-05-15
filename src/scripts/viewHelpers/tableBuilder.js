function TableBuilder(tableHeaders) {
    var headers = [];
    var rows = [];


    this.buildTable = function(rows) {
        var returnString = "<table>";

        if (headers.length > 0) {
            returnString += "<thead><tr>";

            for (var i = 0; i < headers.length; i++) {
                returnString += "<th>" + headers[i] + "</th>";
            }

            returnString += "</tr></thead>";
        }


        if (rows.length > 0) {
            returnString += "<tbody>";

            for (var i = 0; i < rows.length; i++) {
                var rowData = rows[i];

                returnString += '<tr class="' + (i % 2 == 0 ? 'even' : 'odd') + '">';
                returnString += '<td class="image"><img src="' + rowData.image + '" alt="' + rowData.name + '"/></td>';
                returnString += '<td class="name"><h5>' + rowData.name + '</h5></td>';
                returnString += '<td class="price">&pound;' + rowData.price + '</td>';
                returnString += '<td class="buy">' +
                                '   <form action="/item/add/' + rowData.id + '" method="POST" class="buy">' +
                                        '<input type="hidden" name="description" value="' + rowData.name + '"/>' +
                                        '<input type="hidden" name="price" value="' + rowData.price + '"/>' +
                                        '<input type="submit" value="Add to cart">' +
                                    '</form>' +
                                '</td>';
                returnString += "</tr>";
            }

            returnString += "</tbody>";
        }

        return returnString;
    }
}