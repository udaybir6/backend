document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTask");
    const taskForm = document.getElementById("taskForm");

    
    addTaskBtn.addEventListener("click", (event) => {
        if (!taskInput.value.trim()) {
            event.preventDefault();
            alert("Please enter a task!");
        }
    });

   
    document.getElementById("taskList")?.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-task")) {
            const taskId = event.target.closest("li").dataset.id;
            fetch("/delete-task", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `id=${taskId}`
            }).then(() => location.reload());
        }
    });
});
