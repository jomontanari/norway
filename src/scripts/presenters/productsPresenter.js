function ProductsPresenter(productsView, productsService) {
    this.init = function() {
        productsView.addBooksCategoryHandler(retrieveBooks);
        productsView.addCDCategoryHandler(retrieveCDs);
        productsView.addDVDCategoryHandler(retrieveDVDs);
    };

    function retrieveBooks() {
        productsService.getBooksListing();
    }

    function retrieveCDs() {

    }

    function retrieveDVDs() {

    }
}