function ProductsPresenter(productsView, productsService, productsSorter) {
    var contentListingData = null;
    var tableBuilder = new TableBuilder(["Cover", "Name", "Price"]);


    this.init = function() {
        productsView.addCategoryListingHandlers(retrieveCategoryListing);
        productsView.addSortHandler(sortCategory);
    };

    function retrieveCategoryListing(e) {
        e.preventDefault();

        productsService.getCategoryListing(e.currentTarget.href, displayContentListing);
    }

    function displayContentListing(contentListing) {
        contentListingData = JSON.parse(contentListing);
        
        productsView.setContentListing(tableBuilder.buildTable(contentListingData));
        productsView.enableSortOptions();
    }

    function sortCategory() {
        var sortedData = productsSorter.sort(contentListingData, productsView.getSelectedSortOption());

        productsView.setContentListing(tableBuilder.buildTable(sortedData));
    
    }
}