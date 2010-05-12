function ProductsPresenter(productsView, productsService) {
    this.init = function() {
        productsView.addCategoryListingHandlers(retrieveCategoryListing);
//        productsView.addSortHandler(sortCategory);
    };

    function retrieveCategoryListing(e) {
        e.preventDefault();

        productsService.getCategoryListing(e.currentTarget.href, displayContentListing);
    }

    function displayContentListing(contentListing) {
        productsView.displayContentListing(contentListing);
    }

    function sortCategory() {
        var sortOption = productsView.getSelectedSortOption();
        var categoryListing = productsView.getCategoryListing();

        sortProducts
    }
}