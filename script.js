class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        array.sort((a, b) => a - b);
        this.start = 0;
        this.end = array.length - 1;
        this.root = this.buildTree(array, this.start, this.end);
        this.preOrderData = [];
        this.inOrderData = [];
        this.postOrderData = [];
        prettyPrint(this.root);
    }

    buildTree(array, start, end) {
        if (start > end) {
            return null;
        }

        const mid = Math.floor((start + end) / 2);
        const root = new Node(array[mid]);

        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);
        return root;
    }


    insert(data) {
        this.root = this.insertNode(this.root, data);
        prettyPrint(this.root);
    }

    insertNode(node, data) {
        if (node === null) {
            return new Node(data);
        }

        if (data < node.data) {
            node.left = this.insertNode(node.left, data);
        } else {
            node.right = this.insertNode(node.right, data);
        }
        return node;
    }


    deleteItem(data) {
        this.root = this.deleteNode(this.root, data);
        prettyPrint(this.root);
    }

    deleteNode(node, data) {
        if (node === null) {
            return null;
        }

        if (data === node.data) {
            if (node.left === null & node.right === null) {
                return null;
            }
            if (node.left === null) {
                return node.right;
            }
            if (node.right === null) {
                return node.left;
            }

            let tempNode = node.right;
            while (tempNode.left !== null) {
                tempNode = tempNode.left;
            }

            node.data = tempNode.data;
            node.right = this.deleteNode(node.right, tempNode.data);
            return node;
        } else if (data < node.data) {
            node.left = this.deleteNode(node.left, data);
            return node;
        } else {
            node.right = this.deleteNode(node.right, data);
            return node;
        }

    }


    find(data) {
        let current = this.root;
        console.log(current);

        while (current.data !== data) {
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
            if (current === null) {
                return null;
            }
        }
        prettyPrint(current);
        return current;
    }


    levelOrder(root = this.root) {
        const queue = [];
        const result = [];
        if (root === null) return;

        queue.push(this.root);

        while (queue.length > 0) {
            let current = queue.shift();
            result.push(current.data);
            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);
        }
        console.log("Level Order: ", result);
        return result;
    }


    inOrder(root = this.root) {
        if (root === null) return;

        if (root.left !== null) {
            this.inOrder(root.left);
        }
        if (root.data !== null) {
            this.inOrderData.push(root.data);
        }
        if (root.right !== null) {
            this.inOrder(root.right);
        }
        console.log("In Order: ", this.inOrderData);
    }


    preOrder(root = this.root) {
        if (root === this.root) return;

        if (root.data !== null) {
            this.preOrderData.push(root.data);
        }
        if (root.left !== null) {
            this.preOrder(root.left);
        }
        if (root.right !== null) {
            this.preOrder(root.right);
        }
        console.log("Pre-order:", this.preOrderData);
    }

    postOrder(root = this.root) {
        if (root === null) return;

        if (root.data !== null) {
            this.postOrderData.push(root.data);
        }
        if (root.left !== null) {
            this.postOrder(root.left);
        }
        if (root.right !== null) {
            this.postOrder(root.right);
        }
        console.log("Post-order:", this.postOrderData);
    }

    height(root = this.root) {
        if (root === null) {
            return - 1;
        } else {
            let left = this.height(root.left);
            let right = this.height(root.right);
            return Math.max(left, right) + 1;
        }
    }

    depth(value, root = this.root, count = 0) {
        if (root === null) return;
        if (root.data === value) return count;

        if (root.data < value) {
            return this.depth(value, root.left, count + 1);
        } else {
            return this.depth(value, root.right, count + 1);
        }
    }

    isBalanced(root = this.root) {
        if (root === null) {
            return true;
        }

        let left = this.height(root.left);
        let right = this.height(root.right);

        if (Math.abs(left - right) <= 1 && this.isBalanced(root.left) && this.isBalanced(root.right)) {
            return true;
        } else {
            return false;
        }
    }

    reBalance(root = this.root) {
        let sortedArray = [];
        this.inOrder(root);
        sortedArray = this.inOrderData.sort((a, b) => a - b);
        this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
        prettyPrint(this.root);
        return this.root;
    }

}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
    return;
    }
    if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(tree);
console.log(tree.find(1));
console.log(tree.isBalanced(tree));
console.log(tree.levelOrder(tree));
console.log(tree.inOrder(tree));
console.log(tree.preOrder(tree));
console.log(tree.postOrder(tree));
console.log(tree.insert(16));
console.log(tree.insert(75));
console.log(tree.isBalanced(tree));
console.log(tree.reBalance(tree));
console.log(tree.isBalanced(tree));