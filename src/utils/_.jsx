import React from "react";

//verfica si es un string y si no esta vacio
const verficateString = (string) => {

    return (
         typeof string === "string" &&
         string !== undefined &&
         string !== null &&
         string !== ""
     )
 
};


export default verficateString;