function Arg(){}

function TypeArg(type) {
    this.expectedType = type;
}

function FunctionArg(predicate) {
    this.predicate = predicate;
}

Arg.isA = function(type) {
    return new TypeArg(type);
};

Arg.satisfies = function(predicate) {
    return new FunctionArg(predicate);
};

function ArgumentMatcher() {
    var typeMatchers = {};

    initMatchers();

    this.areEqual = function(expected, actual) {
        if (expected.length != actual.length) {
            return false;
            
        }
        return checkArguments(expected, actual);
    };

    function initMatchers() {
        typeMatchers[Array] = matchArrays;
        typeMatchers[TypeArg] = matchType;
        typeMatchers[FunctionArg] = matchPredicate;
    }

    function checkArguments(expected, actual) {
        if (expected == null) {
            return actual == null;    
        }

        var typeMatcher = typeMatchers[expected.constructor] || matchObjects;

        return typeMatcher(expected, actual);
    }

    function matchArrays(expected, actual) {
        if ((expected && !actual) || (!expected && actual)) {
            return false;
        }

        if (expected.length != actual.length) {
            return false;
        }

        for (var i = 0; i < expected.length; i++) {
            if (!checkArguments(expected[i], actual[i])) {
                return false;
            }
        }

        return true;
    }

    function matchObjects(expected, actual) {
        return expected == actual;
    }

    function matchType(expected, actual) {
        return expected.expectedType === actual.constructor;
    }

    function matchPredicate(expected, actual) {
        return expected.predicate(actual);
    }
}
function Discrepancy(message) {
    this.getMessage = function() {
        return message;
    }
}
function DynamicExpectationMatcher() {
    var expectedCalls = [];
    var actualCalls = [];

    this.addExpectedMethodCall = function(invocationBehaviour) {
        expectedCalls.push(invocationBehaviour);
    };

    this.addActualMethodCall = function(invocationBehaviour) {
        actualCalls.push(invocationBehaviour);
    };

    this.verify = function() {
        return checkExpectations();
    };

    function checkExpectations() {
        var discrepancy = null;

        for (var i = 0; i < expectedCalls.length; i++) {
            var expectedCall = expectedCalls[i];

            var matchingCalls = MockHelper.findAll(actualCalls, function(actualCall) {
                return expectedCall.equals(actualCall);
            });

            if (matchingCalls.length === 0) {
                discrepancy = new Discrepancy("Expected call '" + expectedCall.toString() + "' not executed");
                break;
            } else if (matchingCalls.length !== expectedCall.getRepeats()) {
                discrepancy = new Discrepancy("Expected " + expectedCall.getRepeats() + " call(s) to '" + expectedCall.toString() + "', found " + matchingCalls.length);
                break;
            }
        }

        return discrepancy;
    }
}
function FrameworkIntegration() {
    this.fail = function(discrepancy) {
        fail(discrepancy.getMessage());
    };

    this.pass = function(discrepancy) {
        if (JSpec != undefined) {
            JSpec.pass();
        }
    }
}
function InvocationBehaviour(caller, method, args) {
    var repeatCount = 1;

    this.getCaller = function() { return caller };
    this.getMethod = function() { return method };
    this.getArgs = function() { return args; };

    this.setRepeats = function(count) {
        repeatCount = count;
    };

    this.getRepeats = function() {
        return repeatCount;
    };

    this.equals = function(other) {
        var argumentMatcher = new ArgumentMatcher();

        return caller == other.getCaller() &&
               method === other.getMethod() &&
               argumentMatcher.areEqual(MockHelper.convertToArray(args), MockHelper.convertToArray(other.getArgs()));
    };

    this.toString = function() {
        var toStr = caller + "." + method;

        if (args.length !== 0) {
            toStr = toStr + '(' + formatArgs() + ')';
        }else {
            toStr = toStr + "()";
        }

        return toStr;
    };

    function formatArgs() {
        var toStr = "";

        for (var i = 0; i < args.length; i++) {
            toStr += args[i] + ",";
        }

        return toStr.substring(0, toStr.lastIndexOf(","));
    }
}
function MockControl(frameworkIntegration) {
    var framework = frameworkIntegration || new FrameworkIntegration();
    var mockInitialiser = new MockInitialiser();
    var mocks = [];

    this.createDynamicMock = function(thingToMock) {
        var mock = null;

        if (typeof(thingToMock) == 'object') {
            mock = mockInitialiser.initDynamicMock(thingToMock, thingToMock);
        } else {
            mock = mockInitialiser.initDynamicMock({}, thingToMock);
        }

        mocks.push(mock);

        return mock;
    };

    this.createStrictMock = function(thingToMock) {
        var mock = null;

        if (typeof(thingToMock) == 'object') {
            mock = mockInitialiser.initStrictMock(thingToMock, thingToMock);
        } else {
            mock = mockInitialiser.initStrictMock({}, thingToMock);
        }

        mocks.push(mock);

        return mock;
    };

    this.verify = function() {
        for (var i = 0; i < mocks.length; i++) {
            var mock = mocks[i];
            var discrepancy = mock.verify();

            if (discrepancy != null) {
                framework.fail(discrepancy);
            }
        }

        framework.pass();
    };
}
function MockHelper() {}

MockHelper.isPublicMethod = function(object, method) {
    return typeof object[method] === 'function';
};

MockHelper.findAll = function(array, predicate) {
    var returnValues = [];

    for (var i = 0; i < array.length; i++) {
        var currentItem = array[i];

        if (predicate(currentItem)) {
            returnValues.push(currentItem);
        }
    }

    return returnValues;
};

MockHelper.convertToArray = function(arguments) {
    var convertedArguments = [];

    for (var i = 0; i < arguments.length; i++) {
        convertedArguments[i] = arguments[i];
    }

    return convertedArguments;
};

MockHelper.nextOrLast = function(values) {
    if (values.length === 1) {
        return values[0];
    }

    return values.shift();
};
function MockInitialiser() {
    this.initStrictMock = function(mock, thingToMock) {
        return initMock(mock, thingToMock, new StrictExpectationMatcher());
    };

    this.initDynamicMock = function(mock, thingToMock) {
        return initMock(mock, thingToMock, new DynamicExpectationMatcher());
    };

    function initMock(mock, thingToMock, expectationMatcher) {
        addStateVariables(mock, expectationMatcher);
        backupOriginalFunctions(mock, thingToMock);
        replaceFunctions(mock, thingToMock);
        addApiFunctions(mock, thingToMock);

        return mock;
    }

    function addStateVariables(mock, expectationMatcher) {
        mock.recording = false;
        mock.beingTold = false;
        mock.lastCalledMethodName = null;
        mock.lastExpectedBehaviour = null;
        mock.calls = [];
        mock.originalFunctions = {};
        mock.expectationMatcher = expectationMatcher;
    }

    function backupOriginalFunctions(mock, thingToMock) {
        for (var method in thingToMock) {
            mock.originalFunctions[method] = thingToMock[method];
        }
    }

    function replaceFunctions(mock, thingToMock) {
        if (typeof(thingToMock) == 'function') {
            createMethods(thingToMock, mock);
            createMethods(new thingToMock(), mock);
        }else if (typeof(thingToMock) == 'object') {
            createMethods(thingToMock, mock);
        }else {
            throw new Error("Cannot mock out a " + typeof(thingToMock));
        }
    }
    
    function addApiFunctions(mock, thingToMock) {
        mock.expects = expects;
        mock.tells = tells;
        mock.toReturn = toReturn;
        mock.toReturnNext = toReturnNext;
        mock.toThrow = toThrow;
        mock.toExecute = toExecute;
        mock.verify = verify;
        mock.once = once;
        mock.twice = twice;
        mock.threeTimes = threeTimes;
        mock.verify = verify;
        mock.restoreOriginalFunctions = restoreOriginalFunctions;
        
        mock.toString = function toString() {
            return thingToMock.name;
        }
    }

    function createMethods(object, mock) {
        for (var property in object) {
            if (MockHelper.isPublicMethod(object, property, mock)) {
                createMethod(property, mock);
            }
        }
    }

    function createMethod(method, mock) {
        var mockedFunction = function() {
            if (mock.recording) {
                mock.recording = false;
                mock.lastCalledMethodName = method;
                mock.lastExpectedBehaviour = new InvocationBehaviour(mock, method, arguments);

                mock.expectationMatcher.addExpectedMethodCall(mock.lastExpectedBehaviour);

                return this;
            } else if (mock.beingTold) {
                mock.beingTold = false;
                mock.lastCalledMethodName = method;

                return this;
            } else {
                mock.expectationMatcher.addActualMethodCall(new InvocationBehaviour(mock, method, arguments));

                if (mock.calls[method] !== undefined) {
                    var returnFunction = MockHelper.nextOrLast(mock.calls[method]);

                    if (typeof(returnFunction) == 'function') {
                        return returnFunction.apply(this, arguments);
                    }
                }
            }
        };

        mockedFunction.name = method;
        mock[method] = mockedFunction;
    }

    function initialiseCallArray() {
        if (this.lastCalledMethodName == undefined) {
            throw new Error("Expect not called on mock. Usage is mock.expects().expectedFunctionName()");
        }

        if (this.calls[this.lastCalledMethodName] === undefined) {
            this.calls[this.lastCalledMethodName] = [];
        }
    }

    function expects() {
        this.recording = true;
        return this;
    }

    function tells() {
        this.beingTold = true;

        return this;
    }

    function toReturn(valueToReturn) {
        this.toExecute(function() { return valueToReturn; });
    }

    function toReturnNext(valuesToReturn) {
        this.toExecute(function() {
            if (valuesToReturn.length == 1) {
                return valuesToReturn[0];
            }
            return valuesToReturn.shift();
        });
    }

    function toThrow(error) {
        this.toExecute(function() { throw error; });
    }

    function toExecute(closure) {
        if (typeof closure !== 'function') {
            throw Error("Value passed to stub call needs to be a function");
        }

        initialiseCallArray.apply(this, arguments);

        this.calls[this.lastCalledMethodName].push(function() { return closure.apply(this, arguments); });
    }

    function verify(){
        this.restoreOriginalFunctions();
        return this.expectationMatcher.verify();
    }

    function once() {
        this.lastExpectedBehaviour.setRepeats(1);

        return this;
    }

    function twice() {
        this.lastExpectedBehaviour.setRepeats(2);

        return this;
    }

    function threeTimes() {
        this.lastExpectedBehaviour.setRepeats(3);

        return this;
    }

    function restoreOriginalFunctions() {
        for (var method in this.originalFunctions) {
            this[method] = this.originalFunctions[method];
        }
    }
}
function StrictExpectationMatcher() {
    var expectedCalls = [];
    var actualCalls = [];
    var dynamicExpectationMatcher = new DynamicExpectationMatcher();

    this.addExpectedMethodCall = function(invocationBehaviour) {
        expectedCalls.push(invocationBehaviour);

        dynamicExpectationMatcher.addExpectedMethodCall(invocationBehaviour);
    };

    this.addActualMethodCall = function(invocationBehaviour) {
        actualCalls.push(invocationBehaviour);

        dynamicExpectationMatcher.addActualMethodCall(invocationBehaviour);
    };


    this.verify = function() {
        var discrepancy = checkForUnexpectedCalls();

        if (!discrepancy) {
            discrepancy = dynamicExpectationMatcher.verify();
        }

        return discrepancy;
    };

    function checkForUnexpectedCalls() {
        var discrepancy = null;

        for (var i = 0; i < actualCalls.length; i++) {
            var actualCall = actualCalls[i];

            var matchingCalls = MockHelper.findAll(expectedCalls, function(expectedCall) {
                return expectedCall.equals(actualCall);
            });

            if (matchingCalls.length === 0) {
                discrepancy = new Discrepancy("Unexpected call '" + actualCall.toString() + "' found");
                break;
            }
        }

        return discrepancy;
    } 
}
