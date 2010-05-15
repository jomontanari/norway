describe "Products View"
    before_each
        mockControl = new MockControl();

        domMock = mockControl.createDynamicMock(Browser.Dom);
    end

    after_each
        mockControl.verify();
    end

    it "Should add category listing listeners"
        var callback = function() {};

        domMock.expects().addClickHandler(ProductsView.Ids.CategoryListingAnchors, callback);
                                     
        var productsView = new ProductsView();
        productsView.addCategoryListingHandlers(callback);
    end

    it "Should add the sort listeners"
        var callback = function() {};

        domMock.expects().addClickHandler(ProductsView.Ids.SortButton, callback);

        var productsView = new ProductsView();
        productsView.addSortHandler(callback);
    end

    it "Should return the selected sort option"
        domMock.expects().getValue(ProductsView.Ids.SortOptions).toReturn("1");

        var productsView = new ProductsView();
        productsView.getSelectedSortOption().should.eql "1"
    end

    it "Should display the passed content listing in the centre of the page"
        domMock.expects().setHtml(ProductsView.Ids.ContentArea,"Hello");

        var productsView = new ProductsView();
        productsView.setContentListing("Hello");
    end
end