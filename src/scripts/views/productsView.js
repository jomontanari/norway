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

    this.getContentListing = function(pageDataToDisplay) {
        $(ProductsView.Ids.ContentArea).html(pageDataToDisplay);
    }
}

ProductsView.Ids = {
    ContentArea : ".centre",
    CategoryListingAnchors : "a.category-listing",
    SortButton : "#sort-button",
    SortOptions : "#sort-criteria"
};