describe "Products Presenter"
    before_each
        mockControl = new MockControl();
    end

    after_each
        mockControl.verify();
    end

    it 'Should display the category page listing when a category listing link is clicked'
        var hrefClickSimulator = null;
        var searchSuccessResultSimulator = null;

        var productsViewMock = mockControl.createStrictMock(ProductsView);
        var productsServiceMock = mockControl.createStrictMock(ProductsService);
        var eventMock = mockControl.createStrictMock(new Event("test.html"));

        productsViewMock.expects().displayContentListing("Book search results");
        productsViewMock.expects().addCategoryListingHandlers(Arg.isA(Function)).toExecute(function(callback) {
            hrefClickSimulator = callback;
        });

        productsServiceMock.expects().getCategoryListing("test.html", Arg.isA(Function)).toExecute(function(){
            searchSuccessResultSimulator = arguments[1];
        });

        eventMock.expects().preventDefault();

        var productsPresenter = new ProductsPresenter(productsViewMock, productsServiceMock);
        productsPresenter.init();

        hrefClickSimulator(eventMock);
        searchSuccessResultSimulator("Book search results");
    end
end