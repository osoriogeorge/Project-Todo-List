export function getProjectFromLocalStorage(projectName) {
  if (typeof projectName !== "string" || projectName.trim() === "") {
    console.error("El nombre del proyecto debe ser una cadena no vacía.");
    return null;
  }

  try {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    const project = projects.find((p) => p.name === projectName);

    if (project) {
      return {
        name: project.name,
        todos: project.todos,
      };
    } else {
      console.warn(`Proyecto "${projectName}" no encontrado.`);
      return null;
    }
  } catch (error) {
    console.error("Error al leer el localStorage:", error);
    return null;
  }
}

export function deleteProjectFromLocalStorage(projectName) {
  if (typeof projectName !== "string" || projectName.trim() === "") {
    console.error("El nombre del proyecto debe ser una cadena no vacía.");
    return;
  }

  try {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    projects = projects.filter((p) => p.name !== projectName);

    localStorage.setItem("projects", JSON.stringify(projects));
    console.log(`Proyecto "${projectName}" eliminado correctamente.`);
  } catch (error) {
    console.error("Error al eliminar el proyecto del localStorage:", error);
  }
}

export function updateProjectInLocalStorage(projectName, newTodos) {
  if (typeof projectName !== "string" || projectName.trim() === "") {
    console.error("El nombre del proyecto debe ser una cadena no vacía.");
    return;
  }

  if (!Array.isArray(newTodos)) {
    console.error("El parámetro newTodos debe ser un array.");
    return;
  }

  try {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    const projectIndex = projects.findIndex((p) => p.name === projectName);

    if (projectIndex !== -1) {
      projects[projectIndex].todos = newTodos;
      localStorage.setItem("projects", JSON.stringify(projects));
      console.log(`Proyecto "${projectName}" actualizado correctamente.`);
    } else {
      console.warn(`Proyecto "${projectName}" no encontrado.`);
    }
  } catch (error) {
    console.error("Error al actualizar el proyecto en el localStorage:", error);
  }
}
