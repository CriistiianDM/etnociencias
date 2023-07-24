import { Typography } from '@mui/material';
import React from 'react'

const listProyectsAll = ({
    dataProyect,
    filter
}) => {
   
    const uniqueProyectos = dataProyect.reduce((accumulator , current) => {
    // Verificar si el proyecto actual ya está en el objeto auxiliar
    const exists = accumulator.find((item) => item[filter] === current[filter]);

    // Si el proyecto actual no está en el objeto auxiliar, agregarlo
    if (!exists) {
        accumulator.push(current);
    }

    return accumulator;

    }, []);

    return uniqueProyectos;
}

const filterSelect = ({
    dataProyect,
    filter,
    value,
    type,
    otherSelect,
    otherValue
}) => {

    let filterProyects = [];
    if (type === 1) {
        filterProyects = dataProyect.filter((proyecto) => proyecto[filter] === value);
    }
    else {
        filterProyects = dataProyect.filter((proyecto) => {
            return proyecto[filter] !== value && proyecto[otherSelect] === otherValue
        });
    }
    console.log(filterProyects , 'filterProyects');
    return filterProyects;
}

const Proyectos = ({
    proyectos_data,
    type
}) => {

    const [isSearch , setIsSearch] = React.useState(true);
    const [ typeSearch , setTypeSearch ] = React.useState(1);
    const [municipios, setMunicipios] = React.useState([]);
    const [capacitadores, setCapacitadores] = React.useState([]);
    const [data, setData] = React.useState({
        proyectos: []
    });

    const onChangeSelect = (e,filter) => {
        const value = e.target.value;
        let type_ = 1

        const data = {
            capacitador: 'municipio',
            municipio: 'capacitador'
        }

        const select_other = document.getElementById(`select_${data[filter]}`);
        const select_other_ = select_other.value;

        // if (select_other_ !== 'todos') {
        //     type_ = 2;
        // }

        if (value !== 'todos') {
            setData({
                proyectos: filterSelect({
                    dataProyect: proyectos_data,
                    filter: filter,
                    value: value,
                    type: type_,
                    otherSelect: data[filter],
                    otherValue: select_other_
                })
            });
        }
        else {
            console.log('todos', proyectos_data);
            setData({
                proyectos: proyectos_data
            });
        }

    }


    React.useEffect(() => {

        if (proyectos_data?.length > 0) {

            setData({
                proyectos: proyectos_data
            });

            setMunicipios(listProyectsAll({
                dataProyect: (proyectos_data.map((proyecto) => ({ municipio: proyecto['municipio']  }))),
                filter: 'municipio'
            }));

            setCapacitadores(listProyectsAll({
                dataProyect: proyectos_data.map((proyecto) => ({ capacitador: proyecto['capacitador'] })),
                filter: 'capacitador'
            }));

        }
        else if (proyectos_data !== undefined) {
            setIsSearch(false);
        }

    }, [proyectos_data]);

    React.useEffect(() => {
        if (type !== undefined) {
            setTypeSearch(type);
        }
    }, [type]);

    return (
     <>
       <main className='_container_proyectos'>
          <section className='_conatiner_proyectos_ol'>
            { data.proyectos.length > 0 ?
               
                data.proyectos.map((proyecto, index) => (
                        <a className='_conatianer_a' key={index}>
                            <div className='_container_event'>
                                <p>Id proyecto: {proyecto?.id_proyecto}</p>
                                <p>Institución Educativa: {proyecto['nombre_de_la_institución_educativa']}</p>
                            </div>
                        </a>
                ))              
               :
               isSearch? 
               <Typography className='_loading_p' variant='h1'>
                     Cargando Proyectos
               </Typography> 
               :
                <Typography className='_loading_p' variant='h1'>
                        No Tienes Proyectos Asignados
                </Typography>
            }
            {
            (
                <section className='_conatainer_filtro'>
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
            )
            }
          </section>
       </main>
     </>
    )

}


export default Proyectos;