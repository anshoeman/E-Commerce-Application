import tkinter as tk

class BFSInputWindow:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("BFS Input")

        # Create a label and text entry field for the starting vertex
        start_label = tk.Label(self.root, text="Enter the starting vertex:")
        start_label.pack()
        self.start_entry = tk.Entry(self.root)
        self.start_entry.pack()

        # Create a label and text entry field for the ending vertex
        # end_label = tk.Label(self.root, text="Enter the ending vertex:")
        # end_label.pack()
        # self.end_entry = tk.Entry(self.root)
        # self.end_entry.pack()

        # Create a label and text area widget for the graph
        graph_label = tk.Label(self.root, text="Enter the graph as a list of edges (one per line):")
        graph_label.pack()
        self.graph_text = tk.Text(self.root)
        self.graph_text.pack()

        # Create a submit button
        submit_button = tk.Button(self.root, text="Submit", command=self.submit)
        submit_button.pack()

        # Create a label to display the result
        self.result_label = tk.Label(self.root, text="")
        self.result_label.pack()

        self.root.mainloop()

    def submit(self):
        # Get the user input
        start = self.start_entry.get()
        graph_str = self.graph_text.get("1.0", "end-1c")
        graph = []
        for line in graph_str.split("\n"):
            # Split each line on the comma and add the resulting edge tuple to the graph list
            edge = tuple(line.split("["))
            graph.append(edge)

        print(graph)

        # Run the BFS algorithm using the user input as the start and end vertices and the graph
        path = bfs(graph, start)

        # Set the result label to display the result
        self.result_label.configure(text="{}".format(path))

def bfs(graph, start):
    # Implement the BFS algorithm here
    n=3
    q=[] #A queue which stores the parent node
    s=[] #A list of visited nodes
    for _ in range(n): #Initialize the visited node with '0'
        s.append(0)
    q.append(int(start)) #Add the source node to the queue
    s[int(start)]=1 #Mark source node as visited
    while len(q)>0: #to traverse through the graph
        u=q.pop(0)
        print(u,"->")
        for i in range(1, n):
            if graph[u][i]==1 and s[i]==0: #to include those nodes which are not yet visited and their parent node is visited
                s[i]=1
                q.append(i)
    return s

window = BFSInputWindow()


