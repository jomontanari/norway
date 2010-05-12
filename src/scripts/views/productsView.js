function ProductsView() {
    this.addCategoryListingHandlers = function(callback) {
        $(ProductsView.Ids.CategoryListingAnchors).click(callback);
    };

    this.displayContentListing = function(pageDataToDisplay) {
        $(ProductsView.Ids.ContentArea).html(pageDataToDisplay);
    }
}

ProductsView.Ids = {
    ContentArea : ".centre",
    CategoryListingAnchors : "a.category-listing"
};