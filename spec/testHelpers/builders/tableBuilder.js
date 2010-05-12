function TableBuilder() {
    var headers = [];
    var rows = [];

    this.withHeaders = function(values) {
        headers = values;

        return this;
    };

    this.withRows = function(values) {
        rows = values;

        return this;
    };

    this.now = function() {
        var returnString = "<table>";

        if (headers.length > 0) {
            returnString += "<thead><tr>";

            for (var i = 0; i < headers.length; i++) {
                returnString += "<th>" + headers[i] + "</th>";
            }

            returnString += "</tr></thead>";
        }


        if (rows.length > 0) {
            returnString += "<tbody><tr>";

            for (var i = 0; i < rows.length; i++) {
                var rowData = rows[i];

                for (var j = 0; j < rows.length; j++) {
                    returnString += "<td>" + rowData[j] + "</td>";
                }
            }

            returnString += "</tr></tbody>";
        }

        return returnString;
    }
}