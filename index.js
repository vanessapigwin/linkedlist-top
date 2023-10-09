const Node = (value) => {
  let nextNode = null;
  return { value, nextNode };
};

const LinkedList = () => {
  let headNode;
  let head = () => headNode;
  let size = () => {
    /*
    go through the whole list and increment size counter until
    the pointer of the current node is null
    */
    let size = 0;
    let current = head();
    while (current !== null) {
      size += 1;
      current = current.nextNode;
    }
    return size;
  };

  let tail = () => {
    let current = head();
    while (current.nextNode !== null) current = current.nextNode;
    return current;
  };

  const append = (value) => {
    /* 
    Create a new node. If there are existing nodes, the last
    node's reference is updated to point to the new node. 
    */
    console.log("Appending ", value);
    const node = Node(value);
    if (headNode === undefined) {
      headNode = node;
    } else {
      let current = head();
      while (current.nextNode !== null) current = current.nextNode;
      current.nextNode = node;
    }
    toString();
  };

  const prepend = (value) => {
    /*
    Creates a new node to insert at head, assign null pointer of new 
    node to the linked list then start of the list is updated.
    */
    console.log("Inserting at head ", value);
    const node = Node(value);
    if (headNode === undefined) {
      headNode = node;
    } else {
      node.nextNode = head();
      headNode = node;
    }
    toString();
  };

  const at = (index) => {
    /*
    takes an input and checks its data type, value. if the value
    is a positive integer, traverse the linked list while the number
    of nodes traversed is less than the input
    */
    if (!Number.isInteger(index) || index < 0)
      return "Index should be a positive integer";
    if (size() === 0) return "List is empty";
    let idx = 0;
    let current = head();
    while (current !== null && idx < index) {
      idx += 1;
      current = current.nextNode;
    }
    return current;
  };

  const pop = () => {
    /*
    traverse linked list until value before tail is encountered. Update
    pointer of the node before tail to null
    */
    console.log("Popping list");
    let current = head();
    while (current.nextNode.nextNode !== null) {
      current = current.nextNode;
    }
    current.nextNode = null;
    toString();
  };

  const contains = (value) => {
    let current = head();
    while (current !== null) {
      if (current.value === value) return true;
      current = current.nextNode;
    }
    return false;
  };

  const find = (value) => {
    let current = head();
    let indicesList = [];
    let idx = 0;
    while (current !== null) {
      if (current.value === value) {
        indicesList.push(idx);
      }
      current = current.nextNode;
      idx += 1;
    }
    if (indicesList.length > 0) return indicesList;
    return "Value not found";
  };

  const toString = () => {
    let output = "";
    let current = head();
    while (current !== null) {
      output += `( ${current.value} ) -> `;
      current = current.nextNode;
    }
    output += "null";
    console.log(output);
  };

  const insertAt = (value, index) => {
    const newNode = Node(value);
    if (!Number.isInteger(index) || index < 0)
      return "Index should be a positive integer";

    console.log(`Inserting ${value} at index`, index);
    if (index === 0) prepend(value);
    else {
      let idx = 0;
      let previous;
      let current = head();
      while (current !== null && idx < index) {
        previous = current;
        current = current.nextNode;
        idx += 1;
      }
      previous.nextNode = newNode;
      newNode.nextNode = current;
    }
    toString();
  };

  const RemoveAt = (index) => {
    /*
    handle when head is deleted, head becomes the next node
    and reference is removed. Otherwise, traverse list until
    target index is reached. update pointer from previous node to 
    next of current, and update pointer of current to null
    */
    let current = head();
    if (!Number.isInteger(index) || index < 0)
      return "Index should be a positive integer";

    console.log("Removing value at index ", index);
    if (index === 0) {
      headNode = current.nextNode;
      current.nextNode = null;
    } else {
      let idx = 0;
      let previous;
      while (idx < index && current.nextNode !== null) {
        previous = current;
        current = current.nextNode;
        idx += 1;
      }
      previous.nextNode = current.nextNode;
      current.nextNode = null;
    }
    toString();
  };

  return {
    size,
    head,
    tail,
    append,
    prepend,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    RemoveAt,
  };
};

// make the list
const myList = LinkedList();
myList.prepend(1);
myList.append(2);
myList.append(3);
myList.prepend(0);
console.log("The head node : ", myList.head());
console.log("The length of the list is: ", myList.size());
console.log("The tail: ", myList.tail());

// index lookup
const index = 3;
console.log(`The node at position is: ${index}`, myList.at(index));

// pop
myList.pop();

// contains
const notInList = 40;
const inList = 2;
console.log(notInList, myList.contains(notInList));
console.log(inList, myList.contains(inList));

// find numbers
myList.append(0);
console.log(myList.find(0));

// remove at index (head and tail)
myList.RemoveAt(0);
myList.RemoveAt(2);

// remove at middle index
myList.append(3);
myList.RemoveAt(1);

// insertion at middle
myList.insertAt(2, 1);
// insetion at head
myList.insertAt(0, 0);
// insetion at tail
myList.insertAt(4, 4);
