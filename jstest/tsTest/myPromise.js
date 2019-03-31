var MyPromise = /** @class */ (function () {
    // onResolve: () => {}
    function MyPromise(func) {
        this.then = function (callback) {
            this.promiseChain.push(callback);
            return this; // 每个then都会返回一个新的promise
        };
        this["catch"] = function (handleError) {
            this.handleError = handleError;
            return this;
        };
        this.onResolve = function (value) {
            var storedValue = value;
            try {
                this.promiseChain.forEach(function (execution) {
                    storedValue = execution(storedValue);
                });
            }
            catch (error) {
                this.promiseChain = [];
                this.onReject(error);
            }
        };
        this.onReject = function (error) {
            this.handleError(error);
        };
        this.promiseChain = [];
        this.onResolve = this.onResolve.bind(this);
        this.onReject = this.onReject.bind(this);
        this.handleError = function () { };
        func(this.onResolve, this.onReject);
    }
    return MyPromise;
}());
var fakeApiBackend = function () {
    var user = {
        username: 'treyhuffine',
        favoriteNumber: 42,
        profile: 'https://gitconnected.com/treyhuffine'
    };
    // Introduce a randomizer to simulate the
    // the probability of encountering an error
    if (Math.random() > .05) {
        return user;
    }
    else {
        var error = {
            statusCode: 404,
            message: 'Could not find user',
            error: 'Not Found'
        };
        return error;
    }
};
// Assume this is your AJAX library. Almost all newer
// ones return a Promise Object
var makeApiCall = function () {
    return new MyPromise(function (resolve, reject) {
        // Use a timeout to simulate the network delay waiting for the response.
        // This is THE reason you use a promise. It waits for the API to respond
        // and after received, it executes code in the `then()` blocks in order.
        // If it executed is immediately, there would be no data.
        setTimeout(function () {
            var apiResponse = fakeApiBackend();
            if (apiResponse instanceof Error) {
                reject(apiResponse);
            }
            else {
                resolve(apiResponse);
            }
        }, 5000);
    });
};
var p = makeApiCall()
    .then(function (user) {
    console.log('In the first .then()');
    return user;
});
p.then(function (user) {
    console.log("User " + user.username + "'s favorite number is " + user.favoriteNumber);
    return user;
})
    .then(function (user) {
    console.log('The previous .then() told you the favoriteNumber');
    return user.profile;
})
    .then(function (profile) {
    console.log("The profile URL is " + profile);
})
    .then(function () {
    console.log('This is the last then()');
})["catch"](function (error) {
    console.log(error.message);
});
