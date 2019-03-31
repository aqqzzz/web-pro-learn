interface PromiseInterface {
  promiseChain: Array<any>,
  // onResolve: Function,
  // onReject: Function,
  then: Function,
}

class MyPromise implements PromiseInterface {
  promiseChain: []
  private handleError: Function
  // onResolve: () => {}
  constructor(func: (resolve: Function, reject?: Function) => void) {
    this.promiseChain = []
    this.onResolve = this.onResolve.bind(this)
    this.onReject = this.onReject.bind(this)
    this.handleError = () => {}
    func(this.onResolve, this.onReject)
  }
  then: (callback: Function) => MyPromise = function(callback: Function) {
    this.promiseChain.push(callback)
    return this // 每个then都会返回一个新的promise
  }
  catch: (handleError: Function) => MyPromise = function(handleError: Function) {
    this.handleError = handleError
    return this
  }
  private onResolve: (value: any) => void = function(value: any) {
    let storedValue = value
    try {
      this.promiseChain.forEach((execution) => {
        storedValue = execution(storedValue)
      })
    } catch(error) {
      this.promiseChain = []
      this.onReject(error)
    }
  }
  private onReject: (error: any) => void = function(error: any) {
    this.handleError(error)
  }
}

const fakeApiBackend = () => {
  const user = {
    username: 'treyhuffine',
    favoriteNumber: 42,
    profile: 'https://gitconnected.com/treyhuffine'
  };

  // Introduce a randomizer to simulate the
  // the probability of encountering an error
  if (Math.random() > .05) {
    return user;
  } else {
    const error = {
      statusCode: 404,
      message: 'Could not find user',
      error: 'Not Found',
    };

    return error;
  }
};

// Assume this is your AJAX library. Almost all newer
// ones return a Promise Object
const makeApiCall = () => {
  return new MyPromise((resolve, reject) => {
    // Use a timeout to simulate the network delay waiting for the response.
    // This is THE reason you use a promise. It waits for the API to respond
    // and after received, it executes code in the `then()` blocks in order.
    // If it executed is immediately, there would be no data.
    setTimeout(() => {
      const apiResponse = fakeApiBackend();

      if (apiResponse instanceof  Error) {
        reject(apiResponse);
      } else {
        resolve(apiResponse);
      }
    }, 5000);
  });
};

const p = makeApiCall()
  .then((user) => {
    console.log('In the first .then()');

    return user;
  })
  p.then((user) => {
    console.log(`User ${user.username}'s favorite number is ${user.favoriteNumber}`);

    return user;
  })
  .then((user) => {
    console.log('The previous .then() told you the favoriteNumber')

    return user.profile;
  })
  .then((profile) => {
    console.log(`The profile URL is ${profile}`);
  })
  .then(() => {
    console.log('This is the last then()');
  })
  .catch((error) => {
    console.log(error.message);
  });