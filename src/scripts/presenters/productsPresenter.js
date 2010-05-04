function ProductsPresenter(productsView, productsService) {
    this.init = function() {
        productsView.addBooksCategoryHandler(retrieveBooks);
        productsView.addCDCategoryHandler(retrieveCDs);
        productsView.addDVDCategoryHandler(retrieveDVDs);
    };

    function retrieveBooks() {
        productsService.getBooksListing(displayContentListing);
    }

    function retrieveCDs() {

    }

    function retrieveDVDs() {

    }

    function displayContentListing(contentListing) {
        productsView.displayContentListing(contentListing);
    }
}