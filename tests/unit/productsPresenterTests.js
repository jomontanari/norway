TestCase("ProductsPresenter", {
    setUp :function() {
        mockControl = new MockControl();

        tableBuilder = new TableBuilder(["Cover", "Name", "Price"]);
        contentListingData = [
                              { imageUrl: "http://localhost/image1.jpeg", name: "Book1", price: "£22.99" },
                              { imageUrl: "http://localhost/image2.jpeg", name: "Book2", price: "£8.99" }
                             ];
        hrefClickSimulator = null;
        searchSuccessResultSimulator = null;
        sortClickedSimulator = null;
    },

    tearDown : function() {
        mockControl.verify();
    },

    test_should_display_the_category_page_listing_when_a_category_listing_link_is_clicked : function() {
        var productsViewMock = mockControl.createDynamicMock(ProductsView);
        var productsServiceMock = mockControl.createStrictMock(ProductsService);
        var eventMock = mockControl.createStrictMock(new Event("/books/list"));

        productsViewMock.expects().enableSortOptions();
        productsViewMock.expects().setContentListing(tableBuilder.buildTable(contentListingData));
        productsViewMock.expects().addCategoryListingHandlers(Arg.isA(Function)).toExecute(function(callback) {
            hrefClickSimulator = callback;
        });

        productsServiceMock.expects().getCategoryListing("/books/list", Arg.isA(Function)).toExecute(function(){
            searchSuccessResultSimulator = arguments[1];
        });

        eventMock.expects().preventDefault();

        var productsPresenter = new ProductsPresenter(productsViewMock, productsServiceMock);
        productsPresenter.init();

        hrefClickSimulator(eventMock);
        searchSuccessResultSimulator(JSON.stringify(contentListingData));
    },

    test_should_sort_the_products_by_ascending_price_when_the_the_ascending_option_is_selected_and_sort_is_clicked : function() {
        var sortedContentListingData = [
                                  { imageUrl: "http://localhost/image2.jpeg", name: "Book2", price: "£8.99" },
                                  { imageUrl: "http://localhost/image1.jpeg", name: "Book1", price: "£22.99" }
                                 ];
        var sortedCategoryListingTable = tableBuilder.buildTable(sortedContentListingData);

        var productsViewMock = mockControl.createDynamicMock(ProductsView);
        var productsServiceMock = mockControl.createDynamicMock(ProductsService);
        var productsSorterMock = mockControl.createStrictMock(ProductsSorter);

        productsViewMock.expects().addSortHandler(Arg.isA(Function)).toExecute(function(callback) {
            sortClickedSimulator = callback;
        });

        productsViewMock.tells().addCategoryListingHandlers(Arg.isA(Function)).toExecute(function(callback) {
            hrefClickSimulator = callback;
        });

        productsServiceMock.tells().getCategoryListing("/books/list", Arg.isA(Function)).toExecute(function(){
            searchSuccessResultSimulator = arguments[1];
        });

        productsViewMock.expects().getSelectedSortOption().toReturn("1");
        productsViewMock.expects().setContentListing(sortedCategoryListingTable);

        productsSorterMock.expects().sort(Arg.sameAs(contentListingData), "1").toReturn(sortedContentListingData);

        var productsPresenter = new ProductsPresenter(productsViewMock, productsServiceMock, productsSorterMock);
        productsPresenter.init();

        hrefClickSimulator(new Event("/books/list"));
        searchSuccessResultSimulator(JSON.stringify(contentListingData));
        sortClickedSimulator();
    }
});