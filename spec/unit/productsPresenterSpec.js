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
        var bookHrefClickHandler = null;

        var productsViewMock = mockControl.createDynamicMock(ProductsView);
        var productsServiceMock = mockControl.createStrictMock(ProductsService);

        productsViewMock.tells().addBooksCategoryHandler(Arg.isA(Function)).toExecute(function(callback) {
            bookHrefClickHandler = callback;
        });
        productsServiceMock.expects().getBooksListing().toReturn("Books content");

        var productsPresenter = new ProductsPresenter(productsViewMock, productsServiceMock);
        productsPresenter.init();

        bookHrefClickHandler();    
    end
end