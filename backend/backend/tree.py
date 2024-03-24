class TreeNode:
    def __init__(self, data, id):
        self.data = data
        self.children = []
        self.id = id

    def add_child(self, child):
        self.children.append(child)

def build_tree():
    # Creating nodes
    # q = question
    # r = request
    # o = outcome
    q1 = TreeNode("Hello, I am your personal AI assistant to help provide some analysis on your stock. How can I help you?", 0)
    r1 = TreeNode("Can you give me an analysis of [X] stock within the next [Y] time", 1)
    r2 = TreeNode("I would like to buy [X] stock in the next [Y] time", 2)
    r3 = TreeNode("I would like to sell [X] stock within [Y] days", 3)
    r4 = TreeNode("I would like an analysis on my portfolio within [Y] time", 4)
    o1 = TreeNode("If stock is expected to increase", 5)
    o2 = TreeNode("Outcome", 6)
    o3 = TreeNode("Outcome", 7)
    o4 = TreeNode("If stock is expected to increase", 8)
    o5 = TreeNode("Outcome", 9)
    o6 = TreeNode("Outcome", 10)
    o7 = TreeNode("If stock is expected to increase", 11)
    o8 = TreeNode("If stock is expected to decrease", 12)
    o9 = TreeNode("If stock is expected to stay the same", 13)
    o10 = TreeNode("If portfolio increase", 14)
    o11 = TreeNode("If portfolio is around the same", 15)
    o12 = TreeNode("If portfolio decreases", 16)
    q2 = TreeNode("[X] Stock is expected to increase by [A]% within [Y] time with a [Z]% accuracy model. This would indicate a good time to buy, but please contact a financial advisor before doing so.", 17)
    r5 = TreeNode("Can you give me an indicator why this stock would increase?", 18)
    o13 = TreeNode("Economy Indicator", 19)
    o14 = TreeNode("Index fund indicator", 20)
    o15 = TreeNode("Just stock history", 21)
    r6 = TreeNode("Can you show me a projected graph", 22)
    o16 = TreeNode("TEMP", 23)
    q3 = TreeNode("[X] stock is expected to increase by [A]% within [Y] time", 24)
    r7 = TreeNode("Could you give me an indicator why this stock increase", 25)
    o17 = TreeNode("Economy indicator", 26)
    o18 = TreeNode("Index fund indicator", 27)
    o19 = TreeNode("Just stock history", 28)
    q4 = TreeNode("Your portfolio is expected to increase by [X]% in [Y] time with a [Z]% accuracy model. Here is a list of the stocks responsible", 29)
    q5 = TreeNode("Your portfolio is expected to stay the same in [Y] time with a [Z]% accuracy model. Here is a list of the stocks responsible", 30)
    q6 = TreeNode("Your portfolio is expected to decrease by [X]% in [Y] time with a [Z]% accuracy model. Here is a list of the stocks responsible", 31)

    # Building the tree structure
    q1.add_child(r1)
    q1.add_child(r2)
    q1.add_child(r3)
    q1.add_child(r4)

    r1.add_child(o1)
    r1.add_child(o2)
    r1.add_child(o3)

    r2.add_child(o4)
    r2.add_child(o5)
    r2.add_child(o6)

    r3.add_child(o7)
    r3.add_child(o8)
    r3.add_child(o9)

    r4.add_child(o10)
    r4.add_child(o11)
    r4.add_child(o12)

    o4.add_child(q2)

    q2.add_child(r5)

    r5.add_child(o13)
    r5.add_child(o14)
    r5.add_child(o15)

    q2.add_child(r6)

    r6.add_child(o16)

    o7.add_child(q3)

    q3.add_child(r7)

    r7.add_child(o17)
    r7.add_child(o18)
    r7.add_child(o19)

    o10.add_child(q4)

    o11.add_child(q5)

    o12.add_child(q6)

    return q1

def print_tree(node, level=0):
    print("  " * level + node.data)
    for child in node.children:
        print_tree(child, level + 1)

# Build the tree
tree_root = build_tree()

# Print the tree
print_tree(tree_root)
