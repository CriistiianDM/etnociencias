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

//verifica si es un array y si no esta vacio
const verificateArray = (array) => {

    return (
        Array.isArray(array) &&
        array !== undefined &&
        array !== null &&
        array.length > 0
    )

}

const verificateObject = (object) => {

    return (
        typeof object === "object" &&
        object !== undefined &&
        object !== null &&
        Object.keys(object).length > 0
    )

}

//setea un setData de un useState
const setDataState = (_set, info) => {
    _set(info)
}


//filtro
const filter_ = ({
    array1,
    filter1,
    array2,
    filter2
}) => {

    return array1.filter((maestro) => {
        return maestro[filter1] === array2[filter2]
    })

}

/**
 * 
 * @param {array} sourceArray que se va a filtrar
 * @param {object} filterField object que se usa un atributo para filtrar
 * @param {string} targetArray atributo del array que se va a filtrar
 * @param {string} targetFilterField atributo del arrayFilter que se va a filtrar 
 */
const setDataWithFilter = ({
    sourceArray, 
    filterField, 
    targetArray, 
    targetFilterField, 
    setDataFunc
}) => {

    if (verificateArray(sourceArray) && verificateObject(targetArray)) {
            
        setDataState(setDataFunc,filter_({
            array1: sourceArray,
            filter1: filterField,
            array2: targetArray,
            filter2: targetFilterField
        }))

    }
}


export default verficateString;
export {
    filter_,
    verificateArray,
    setDataState,
    setDataWithFilter,
    verificateObject
}