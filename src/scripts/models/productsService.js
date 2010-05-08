function ProductsService() {
    this.getCategoryListing = function(url, callback) {
        $.get(url, {}, callback, 'GET');        
    }
}