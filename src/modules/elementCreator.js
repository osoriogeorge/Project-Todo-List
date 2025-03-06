// elementCreator.js
export const elementCreator = {
  createInput(type, placeholder) {
    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    return input;
  },

  createButton(text, className) {
    const button = document.createElement("button");
    button.textContent = text;
    if (className) {
      button.classList.add(className);
    }
    return button;
  },

  createPrioritySelect() {
    const select = document.createElement("select");
    const priorities = ["Low", "Medium", "Hight"];
    priorities.forEach((priority) => {
      const option = document.createElement("option");
      option.value = priority;
      option.textContent = priority;
      select.appendChild(option);
    });
    return select;
  },

  createDiv(className) {
    const div = document.createElement("div");
    if (className) {
      div.classList.add(className);
    }
    return div;
  },
};
