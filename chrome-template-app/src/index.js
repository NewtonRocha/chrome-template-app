import React from "react";
import ReactDOM from "react-dom";
import style from "./index.css"
import TemplateList from "./components/TemplateList";


const Index = () => {
  return <div>
    <TemplateList></TemplateList>
  </div>;
};

ReactDOM.render(<Index />, document.getElementById("index"));