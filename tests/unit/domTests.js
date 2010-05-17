TestCase("DomTests", {
    setUp : function() {
        mockControl = new MockControl();

        jQueryMock = mockControl.createDynamicMock($.fn);
    },      

    tearDown : function() { 
        mockControl.verify();
    },
    
    test_should_register_the_passed_function_as_a_listener_to_the_click_event_of_the_element : function() {
        var selector = ".class-name";

        jQueryMock.expects().init(selector, null).toReturn(jQueryMock);
        jQueryMock.expects().click(Arg.isA(Function));

        Browser.Dom.addClickHandler(selector, function() {});
    },

    test_should_set_the_passed_html_on_the_element : function() {
        var selector = ".class-name";

        jQueryMock.expects().init(selector, null).toReturn(jQueryMock);
        jQueryMock.expects().html("html");

        Browser.Dom.setHtml(selector, "html");
    },

    test_should_return_the_value_of_the_element : function() {
        var selector = ".class-name";

        jQueryMock.expects().init(selector, null).toReturn(jQueryMock);
        jQueryMock.expects().val().toReturn("1");

        assertEquals("1", Browser.Dom.getValue(selector));
    },

    test_should_enable_the_passed_element : function() {
        var selector = ".class-name";

        jQueryMock.expects().init(selector, null).toReturn(jQueryMock);
        jQueryMock.expects().removeAttr("disabled");

        Browser.Dom.enable(selector);
    }
});