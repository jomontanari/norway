function TableBuilder(tableHeaders) {
    var headers = tableHeaders;
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

                returnString += "<tr>";
                returnString += "<td><img src=" + rowData.image + " alt=" + rowData.name + "/></td>";
                returnString += "<td><h5>" + rowData.name + "</h5></td>";
                returnString += "<td>" + rowData.price + "</td>";
                returnString += "</tr>";
            }

            returnString += "</tbody>";
        }

        return returnString;
    }
}