describe "Products Presenter"
    before_each
        mockControl = new MockControl();
    end

    after_each
        mockControl.verify();
    end

    it 'Should hook up listeners for the various product categories'
        var productsViewMock = mockControl.createStrictMock(ProductsView);

        productsViewMock.expects().addBooksCategoryHandler(Arg.isA(Function));
        productsViewMock.expects().addCDCategoryHandler(Arg.isA(Function));
        productsViewMock.expects().addDVDCategoryHandler(Arg.isA(Function));

        var productsPresenter = new ProductsPresenter(productsViewMock);
        productsPresenter.init();
    end

    it 'Should invoke the product service to load the books page listing when the books link is clicked'
        var bookHrefClickSimulator = null;
        var searchSuccessResultSimulator = null;

        var productsViewMock = mockControl.createDynamicMock(ProductsView);
        var productsServiceMock = mockControl.createStrictMock(ProductsService);
        var eventMock = mockControl.createStrictMock(new Event("test.html"));

        productsViewMock.expects().displayContentListing("Book search results");
        productsViewMock.tells().addBooksCategoryHandler(Arg.isA(Function)).toExecute(function(callback) {
            bookHrefClickSimulator = callback;
        });

        productsServiceMock.expects().getCategoryListing("test.html", Arg.isA(Function)).toExecute(function(){
            searchSuccessResultSimulator = arguments[1];
        });

        eventMock.expects().preventDefault();

        var productsPresenter = new ProductsPresenter(productsViewMock, productsServiceMock);
        productsPresenter.init();

        bookHrefClickSimulator(eventMock);
        searchSuccessResultSimulator("Book search results");
    end

    it 'Should invoke the product service to load the cd page listing when the books link is clicked'
        var cdHrefClickSimulator = null;
        var searchSuccessResultSimulator = null;

        var productsViewMock = mockControl.createDynamicMock(ProductsView);
        var productsServiceMock = mockControl.createStrictMock(ProductsService);
        var eventMock = mockControl.createStrictMock(new Event("test.html"));

        productsViewMock.expects().displayContentListing("CD search results");
        productsViewMock.tells().addCDCategoryHandler(Arg.isA(Function)).toExecute(function(callback) {
            cdHrefClickSimulator = callback;
        });

        productsServiceMock.expects().getCategoryListing("test.html", Arg.isA(Function)).toExecute(function(){
            searchSuccessResultSimulator = arguments[1];
        });

        eventMock.expects().preventDefault();

        var productsPresenter = new ProductsPresenter(productsViewMock, productsServiceMock);
        productsPresenter.init();

        cdHrefClickSimulator(eventMock);
        searchSuccessResultSimulator("CD search results");
    end
end