function ProductsView() {
    this.addCategoryListingHandlers = function(callback) {
        $(ProductsView.Ids.CategoryListingAnchors).click(callback);
    };

    this.addSortHandler = function(callback) {
        $(ProductsView.Ids.SortButton).click(callback);
    };

    this.getSelectedSortOption = function() {
        return $(ProductsView.Ids.SortOptions).val();
    };

    this.setContentListing = function(pageDataToDisplay) {
        $(ProductsView.Ids.ContentArea).html(pageDataToDisplay);
    };

    this.enableSortOptions = function() {
        $(ProductsView.Ids.SortOptions).removeAttr("disabled");
        $(ProductsView.Ids.SortButton).removeAttr("disabled");
    }
}

ProductsView.Ids = {
    ContentArea : ".content",
    CategoryListingAnchors : "a.category-listing",
    SortButton : "#sort-button",
    SortOptions : "#sort-criteria"
};