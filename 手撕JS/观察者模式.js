class Subject {
  constructor() {
    this.observers = [];
    this.state = 0;
  }

  getState() {
    return this.state;
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  setState(value) {
    if (value !== this.state) {
      this.state = value;
      this.notifyObservers();
    }
  }

  notifyObservers() {
    this.observers.forEach(observer => {
      observer.update();
    })
  }

  unsubscribe(observerToMove) {
    this.observers = this.observers.filter(observer => {
      return observer !== observerToMove
    })
  }

}

class Observer {
  constructor(name, subject) {
    this.name = name;
    this.subject = subject;
    this.subject.addObserver(this);
  }

  update() {
    console.log(this.name);
  }
}

const subject = new Subject();
const observer1 = new Observer("1", subject);
const observer2 = new Observer("2", subject);

subject.setState(123)
subject.unsubscribe(observer1);
subject.setState(12);


