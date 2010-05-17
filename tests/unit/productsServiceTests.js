TestCase("ProductService", {
    setUp : function() {
        mockControl = new MockControl();

        httpMock = mockControl.createDynamicMock(Browser.HTTP);
    },

    tearDown : function() {
        mockControl.verify();
    },

    test_should_load_the_the_category_listing_for_the_passed_url : function() {
        var callback = function() {};

        httpMock.expects().get("/book/list", callback).toReturn("Book listing");

        var productsService = new ProductsService();
        productsService.getCategoryListing("/book/list", callback);
    }
});