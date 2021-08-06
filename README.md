# todo-list
Vanilla JS Todo List (2021)

This Todo List is done by coding along through Dev Ed's project from the YouTube channel while learning JavaScript.

There were 3 gaps left in the original code which needs to be resolved:

- First one is corrected by changing the original filterOption from listening on 'click' to 'change' on selecting fields. In that way, it only thiggers filterTodo() when you change option.

- Second one is when we make new todo item while we are at the 'uncompleted' list, and we check it to be 'completed'. That todo item won't automatically disappear and move to 'completed' list. This is corrected by placing filterTodo() into the function deleteCheck() as the last line at the //CHECK MARK into the 'if' section; which means when item is checked, update the screen (remove it from 'uncompleted' list, and place it to 'completed' list).

- Third is when we store/save todos locally. At the moment, when we refresh, our app brings back all out todos as being 'uncompleted' (if they are not deleted). To refresh and get our todos to load by their status as 'completed' or 'uncompleted' - there is still work to do. Code is not yet finished.
