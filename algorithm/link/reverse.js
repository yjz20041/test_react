const reverse2Side = (head) => {
    let prevNode = null;
    let currentNode = head;
    while(currentNode) {
        const next = currentNode.next;
        currentNode.next = prevNode;
        if (prevNode) {
            prevNode.prev = currentNode;
        }
        if (!next) {
            currentNode.prev = null;
        }
        prevNode = currentNode;
        currentNode = next;
    }
    return prevNode;
}

const reverse = (head) => {
    let prev = null;
    let currentNode = head;
    while(currentNode) {
        const nextNode = currentNode.next;
        currentNode.next = prev;
        prev = currentNode;
        currentNode = nextNode;
    }
    return prev;
}