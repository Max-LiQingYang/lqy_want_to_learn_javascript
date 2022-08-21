class Promise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;

    let resolve = (value) => {
      if (this.state === "pending") {
        this.state = "resolved";
        this.value = value;
      }
    };

    let reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onResolved, onRejected) {
    if (this.state === "resolved") {
      onResolved && onResolved(this.result);
    } else if (this.state === "rejected") {
      onRejected && onRejected(this.reason);
    }
  }
}