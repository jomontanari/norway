function ProductsPresenter(productsView, productsService) {
    this.init = function() {
        productsView.addCategoryListingHandlers(retrieveCategoryListing);
    };

    function retrieveCategoryListing(e) {
        e.preventDefault();

        productsService.getCategoryListing(e.currentTarget.href, displayContentListing);
    }

    function displayContentListing(contentListing) {
        productsView.displayContentListing(contentListing);
    }
}