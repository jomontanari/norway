function ProductsView() {
    this.addCategoryListingHandlers = function(callback) {
        Browser.Dom.addClickHandler(ProductsView.Ids.CategoryListingAnchors, callback);
    };

    this.addSortHandler = function(callback) {
        Browser.Dom.addClickHandler(ProductsView.Ids.SortButton, callback);
    };

    this.getSelectedSortOption = function() {
        return Browser.Dom.getValue(ProductsView.Ids.SortOptions);
    };

    this.setContentListing = function(pageDataToDisplay) {
        Browser.Dom.setHtml(ProductsView.Ids.ContentArea, pageDataToDisplay);
    };

    this.enableSortOptions = function() {
        Browser.Dom.enable(ProductsView.Ids.SortButton);
        Browser.Dom.enable(ProductsView.Ids.SortOptions);
    };
}

ProductsView.Ids = {
    ContentArea : ".content",
    CategoryListingAnchors : "a.category-listing",
    SortButton : "#sort-button",
    SortOptions : "#sort-criteria"
};