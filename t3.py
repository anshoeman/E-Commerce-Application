from tkinter import Tk, Label, StringVar, Button, Entry,Text
window = Tk()
window.title("Matrix")
window.geometry("1001x1000")
window.configure(bg='bisque2')
window.resizable(False, False)

# empty arrays for your Entrys and StringVars
text_var = []
entries = []
matrix = []

# callback function to get your StringVars
def get_mat():
    
    for i in range(rows):
        matrix.append([])
        for j in range(cols):
            matrix[i].append(text_var[i][j].get())

    print(matrix)
    for n, i in enumerate(matrix):
        for k, j in enumerate(i):
            matrix[n][k] = int(j)

    print(matrix)

Label(window, text="Enter matrix :", font=('arial', 10, 'bold'), 
      bg="bisque2").place(x=20, y=20)


x2 = 0
y2 = 0
rows, cols = (3,3)
for i in range(rows):
    # append an empty list to your two arrays
    # so you can append to those later
    text_var.append([])
    entries.append([])
    for j in range(cols):
        # append your StringVar and Entry
        text_var[i].append(StringVar())
        entries[i].append(Entry(window, textvariable=text_var[i][j],width=3))
        entries[i][j].place(x=60 + x2, y=50 + y2)
        x2 += 30

    y2 += 30
    x2 = 0
button= Button(window,text="Submit", bg='bisque3', width=15, command=get_mat)
button.place(x=160,y=140)
def show_program():
    text = Text(window)

    # insert the program text into the Text widget
    with open("program.txt", "r") as f:
        program_text = f.read()
        # label6 = Label(window, text="Program", font=(
        #     "Arial Bold", 15)).grid(row=8, column=15)
        program_text = Label(window, text=program_text,
                                justify='left').place(x=50, y=250)



start =0
def bfs(graph=matrix, start=start):
    # Implement the BFS algorithm here
    n=3
    q=[] #A queue which stores the parent node
    s=[] #A list of visited nodes
    x=''
    for _ in range(n): #Initialize the visited node with '0'
        s.append(0)
    q.append(int(start)) #Add the source node to the queue
    s[int(start)]=1 #Mark source node as visited
    while len(q)>0: #to traverse through the graph
        u=q.pop(0)
        
        x=x+str(u)+"->"
        for i in range(1, n):
            if graph[u][i]==1 and s[i]==0: #to include those nodes which are not yet visited and their parent node is visited
                s[i]=1
                q.append(i)
    print(x)
    return x
def show_result():
        result = bfs()
        result = Label(window, text=result, justify='left').place(x=150, y=600)

button7 = Button(window, text="Show result", command=show_result)
button7.place(x=50, y=600)
button8 = Button(window, text="Show program", command=show_program)
button8.place(x=50, y=220)


window.mainloop()