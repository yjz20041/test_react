const treeToLink = (head) => {
    const node = {};
    if (head.left) {
        const leftListTail = treeToLink(head.left)[1];
        node.prev = leftListTail;
        leftListTail.next = node;
    }
    node.value = head.value;

    if (head.right) {
        const rightListHead = treeToLink(head.right)[0];
        node.next = rightListHead;
        rightListHead.prev = node;
    }
    let listHead = node;
    let listTail = node;
    while (listHead.prev) {
        listHead = listHead.prev;
    }
    while (listTail.next) {
        listTail = listTail.next;
    }

    return [listHead, listTail];
}

const tree = {
    value: 8,
    left: {
        value: 4,
        left: {
            value: 2
        },
        right: {
            value: 5
        }
    },
    right: {
        value: 10,
        left: {
            value: 9
        },
        right: {
            value: 11
        }
    }
}