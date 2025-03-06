import "./style.css";
import { ProjectList } from "./modules/projectList.js";
import { dom } from "./modules/dom.js";

const projectList = new ProjectList();
dom.render(projectList);
