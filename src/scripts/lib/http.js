Browser.HTTP = {
    get : function(url, callback) {
        return $.get(url, {}, callback, 'GET');
    }
};