class Node {
  prev: undefined,
  next: undefined,
  value: undefined,
}

class LinkedList {
    constructor() {
      this.head = new Node();
      this.tail = new Node();
      this.head.next = this.tail;
      this.tail.prev = this.head;
    }
    append = (node) => {
      const newNode = new Node();
      if (!node || node === this.tail) {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      } else {
        newNode.prev = node;
        newNode.next = node.next;
        node.next = newNode;
      }
    }
    prepend = (node) => {
      const newNode = new Node();
      if (!node) {
        this.head.prev = newNode;
        newNode.next = this.head;
        this.head = newNode;
      } else {
        newNode.next = node;
        newNode.prev = node.prev;
        node.prev = newNode;
      }
    }
}


