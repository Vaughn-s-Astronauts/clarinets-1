//Reverse a linked list in groups of given size k
//Given a linked list reverse the nodes of a linked list k at a time and return modified list
//k is a positive integer and is less than or equal to the linked list
//if the number of nodes is a not a multiple of k they should be left as is instead of being reversed

class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
    addToEnd(value){
        if(this.next){
            this.next.addToEnd(value);
        }else{
            this.next = new Node(value);
        }
    }
}

function reverse(node, k){
    //counter to track size of 'block'
    //while/recursion to 'iterate' through the linked list
    //  if using a while loop you'll need a temp storage variable for current node
    if(!node || !node.next || k === 1){
        return node;
    }

    let counter = 0;
    let current = node;

    while(current && counter < k){
        current = current.next;
        counter++;
    }

    if(counter < k){
        return node;
    }
    //reverse head of the node
    current = reverse(current, k);
    
    let previous = null;
    let next = null;
    while(counter > 0){
        next = node.next;
        node.next = previous;
        previous = node;
        node = next;
        counter--;
    }
    node = previous;
    while(previous.next){
        previous = previous.next;
    }
    previous.next = current;
    return node;
   
    
}



let test = new Node(1);
test.addToEnd(5);
test.addToEnd(1);
test.addToEnd(2);
test.addToEnd(6);

test.addToEnd(3);
test.addToEnd(4);
test.addToEnd(8);
test.addToEnd(1);
test.addToEnd(3);

test.addToEnd(11);
test.addToEnd(5);
test.addToEnd(4);
test.addToEnd(2);
test.addToEnd(8);

test.addToEnd(41);
test.addToEnd(25);
test.addToEnd(14);
test.addToEnd(25);
test.addToEnd(844);

let k = 6;
let testing = reverse(test, k);
let temp = testing;
let count = 0;
while(temp){
    if(count >= k){
        console.log('~~~~~~~~~~~~~~~~~~~');
        count = 0;
    }
    console.log(temp.value);
    temp = temp.next;
    count++;
}
