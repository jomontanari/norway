function ProductsService() {
    this.getBooksListing = function(url, callback) {
        $.get(url, {}, callback, 'GET');        
    }
}