function ProductsView() {
    this.addBooksCategoryHandler = function(callback) {
        $(ProductsView.Ids.BookListingAnchor).click(callback);
    };

    this.addCDCategoryHandler = function(callback) {
        $(ProductsView.Ids.CDListingAnchor).click(callback);
    };

    this.addDVDCategoryHandler = function(callback) {
        $(ProductsView.Ids.DVDListingAnchor).click(callback);
    };

    this.displayContentListing = function(pageDataToDisplay) {
        $(ProductsView.Ids.ContentArea).html(pageDataToDisplay);
    }
}

ProductsView.Ids = {
    ContentArea : "#content",
    BookListingAnchor : "#book-listing",
    CDListingAnchor : "#cd-listing",
    DVDListingAnchor : "#dvd-listing"
};