TestCase("Products View", {
    setUp : function() {
        mockControl = new MockControl();

        domMock = mockControl.createDynamicMock(Browser.Dom);
    }, 

    tearDown : function() {
        mockControl.verify();
    }, 

    test_should_add_category_listing_listeners : function() {
        var callback = function() {};

        domMock.expects().addClickHandler(ProductsView.Ids.CategoryListingAnchors, callback);
                                     
        var productsView = new ProductsView();
        productsView.addCategoryListingHandlers(callback);
    },

    test_should_add_the_sort_listeners : function() {
        var callback = function() {};

        domMock.expects().addClickHandler(ProductsView.Ids.SortButton, callback);

        var productsView = new ProductsView();
        productsView.addSortHandler(callback);
    },

    test_should_return_the_selected_sort_option : function() {
        domMock.expects().getValue(ProductsView.Ids.SortOptions).toReturn("1");

        var productsView = new ProductsView();
        assertEquals("1", productsView.getSelectedSortOption());
    },

    test_should_display_the_passed_content_listing_in_the_centre_of_the_page : function() {
        domMock.expects().setHtml(ProductsView.Ids.ContentArea,"Hello");

        var productsView = new ProductsView();
        productsView.setContentListing("Hello");
    }
});