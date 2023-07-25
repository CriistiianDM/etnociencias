import React from "react";

//filterSelect
const Filter = ({
    capacitadores,
    municipios,
    onChangeSelect,
    typeSearch,
    dataTotal,
    dataProyect,
    isSearch
}) => {

    return (
        <>
          {
            (dataProyect?.proyectos?.length > 0 || isSearch !== undefined ) &&
            <main className='_container_filtros_logica'>
                <section className='_conatainer_filtro'>
                    <div className='_container_total'>
                        <div>
                             <span>Total Niñas: </span>
                             <strong>{dataTotal?.ninas}</strong>
                        </div>
                        <div className="_teachers">
                             <div>
                                 <span>Total Profesores Lideres:</span>
                                 <strong>{dataTotal?.lideresP}</strong>
                             </div>
                             <div>
                                <span>Total Profesores Acompañante:</span>
                                <strong>{dataTotal?.acomP}</strong>
                             </div>
                        </div>
                        <div>
                             <span>Total Proyectos:</span>
                             <strong>{dataTotal?.proyectos}</strong>
                        </div>
                    </div>
                    {
                    (typeSearch !== 1) &&
                    <div className='_container_select'>
                        <label>
                            Filtrar por Capacitador
                        </label>
                        <select id='select_capacitador' onChange={(e) => {onChangeSelect(e,'capacitador')}}>
                            <option defaultChecked value="todos">todos</option>
                            {
                                capacitadores.map((proyecto, index) => {
                                    if (proyecto.capacitador !== undefined) {
                                    return (<option key={index} 
                                            value={proyecto.capacitador}
                                            filter='capacitador'
                                            >{proyecto.capacitador}</option>
                                    )}
                                })
                            }
                        </select>
                    </div>
                    }
                    <div className='_container_select'>
                        <label>
                            Filtrar por Municipio
                        </label>
                        <select id='select_municipio' onChange={(e) => {onChangeSelect(e,'municipio')}}>
                            <option defaultChecked value="todos">todos</option>
                            {
                                municipios.map((proyecto, index) => {
                                    if (proyecto.municipio !== undefined) {
                                        return (<option key={index} value={proyecto.municipio}>{proyecto.municipio}</option>
                                    )}
                                })
                            }
                        </select>
                    </div>
                </section>
            </main>
          }
        </>
    )

}

export default Filter;