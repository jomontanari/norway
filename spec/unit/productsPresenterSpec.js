describe "Products Presenter"
    before_each
        mockControl = new MockControl();

        tableBuilder = new TableBuilder(["Cover", "Name", "Price"]);
        contentListingData = [
                              { imageUrl: "http://localhost/image1.jpeg", name: "Book1", price: "£22.99" },
                              { imageUrl: "http://localhost/image2.jpeg", name: "Book2", price: "£8.99" }
                             ];
        hrefClickSimulator = null;
        searchSuccessResultSimulator = null;
        sortClickedSimulator = null;
    end

    after_each
        mockControl.verify();
    end

    it 'Should display the category page listing when a category listing link is clicked'
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
    end

    it 'Should sort the products by ascending price when the the ascending option is selected and sort is clicked'
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
    end
end