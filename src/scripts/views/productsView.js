function ProductsView() {
    this.addBooksCategoryHandler = function(callback) {
        $("#book-listing").click(callback);    
    };

    this.addCDCategoryHandler = function(callback) {

    };

    this.addDVDCategoryHandler = function(callback) {

    };

    this.displayContentListing = function(pageDataToDisplay) {
        $("#centre").innerHTML(pageDataToDisplay);
        
    }
}