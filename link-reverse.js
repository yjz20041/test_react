const reverse = (head) => {
  if (!head.next) {
    return head;
  } else {
    const tail = reverse(head.next);
    tail.next = head;
    head.next = null;
    return head;
  }
}


let c = {
  name: 'c',
  next: null
}

let b = {
  name: 'b',
  next: c
}

let a = {
  name: 'a',
  next: b
}