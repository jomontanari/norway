TestCase("DomTests", {
    test_should_register_the_passed_function_as_a_listener_to_the_click_event_of_the_element : function() {
        /*:DOC += <div><input type="button" class="class-name"/></div>*/
        var clicked = false;

        Browser.Dom.addClickHandler(".class-name", function() { clicked = true; });
        $(".class-name").click();

        assertTrue(clicked);
    },

    test_should_set_the_passed_html_on_the_element : function() {
        /*:DOC += <div class="class-name"></div>*/

        Browser.Dom.setHtml(".class-name", "html");

        assertEquals("html", $(".class-name").html());
    },

    test_should_return_the_value_of_the_element : function() {
        /*:DOC += <div><input type="text" class="class-name" value="1"/></div>*/

        assertEquals("1", Browser.Dom.getValue(".class-name"));
    },

    test_should_enable_the_passed_element : function() {
        /*:DOC += <div><input type="text" class="class-name" disabled="disabled"/></div>*/

        Browser.Dom.enable(".class-name");

        assertFalse("", $(".class-name").attr("disabled"));
    }
});