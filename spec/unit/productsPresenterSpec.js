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

        var productsViewMock = mockControl.createDynamicMock(ProductsView);
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

    it 'Should sort the products by ascending price when the the ascending option is selected and sort is clicked'
        var categoryListing = build.aTable().withRows([
                                                        ["http://localhost/image1.jpeg", "Book1", "£22.99"],
                                                        ["http://localhost/image2.jpeg", "Book2", "£8.99"],
                                                        ["http://localhost/image3.jpeg", "Book3", "£14.99"]
                                                      ]);
        var sortedCategoryListing = build.aTable().withRows([
                                                        ["http://localhost/image2.jpeg", "Book2", "£8.99"],
                                                        ["http://localhost/image3.jpeg", "Book3", "£14.99"],
                                                        ["http://localhost/image1.jpeg", "Book1", "£22.99"]
                                                      ]);

        var sortClickedSimulator = null;

        var productsViewMock = mockControl.createDynamicMock(ProductsView);
        var productsSorterMock = mockControl.createStrictMock(ProductsSorter);

        productsViewMock.expects().addSortHandler().toExecute(function(callback) {
            sortClickedSimulator = callback;
        });

        productsViewMock.expects().getSelectedSortOption().toReturn("1");
        productsViewMock.expects().getContentListing().toReturn(contentListingHtml);
        productsViewMock.expects().displayContentListing(sortedContentListing);

        productsSorterMock.expects().sort();

        var productsPresenter = new ProductsPresenter(productsViewMock, null, productsSorterMock);
        productsPresenter.init();

        sortClickedSimulator();    
    end

end