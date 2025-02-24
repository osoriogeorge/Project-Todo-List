import "./style.css";
import { format } from "date-fns";

const fechaActual = new Date();
const fechaFormateada = format(fechaActual, "yyyy-MM-dd");
console.log(fechaFormateada);

console.log("Webpack is working!");
