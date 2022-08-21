class Member {
  constructor(name) {
    this.name = name;
    this.chatroom = null;
  }

  send(message, toMember) {
    this.chatroom.send(this.name, message, toMember);
  }

  receive(message, fromMember) {
    console.log(fromMember + "对" + this.name + " 说: " + message);
  }
}

class Chatroom {
  constructor() {
    this.members = [];
  }

  send(fromMember, message, toMember) {
    if (this.members.indexOf(fromMember) !== -1) {
      toMember.receive(message, fromMember);
    }
  }

  addMember(member) {
    this.members.push(member.name);
    member.chatroom = this;
  }
}

const chatroom = new Chatroom();
const member1 = new Member("li");
const member2 = new Member("qing");
chatroom.addMember(member1);
chatroom.addMember(member2);
member1.send("xixi", member2);