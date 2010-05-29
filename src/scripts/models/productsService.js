function ProductsService() {
    this.getCategoryListing = function(url, callback) {
        Browser.HTTP.get(url, callback);
    };
}