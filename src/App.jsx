import React, { useState } from 'react';
import { Footer } from './Footer';

export const App = () => {

    const [inputText, setInputText] = useState('');
    const [taskEditar, setTaskEditar] = useState({});
    const [lista, setLista] = useState([]);

    const handleChangeInput = (event) => {
        const value = event.target.value;
        setInputText(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputText.length == '') return;
        const existe = lista.some((task) => task.id == taskEditar.id)

        if (existe) {
            const tareaIndice = lista.findIndex((task) => task.id == taskEditar.id)
            lista[tareaIndice] = {...taskEditar, task: inputText}
            setLista((lista) => [...lista])
        } else {
            setLista((lista) => [{ id: new Date().getTime(), task: inputText }, ...lista]);
        }

        setTaskEditar({})
        setInputText('');
    }

    const handleEliminar = (id) => {
        const listaNueva = lista.filter((task) => task.id !== id)
        setLista(listaNueva);
    }

    const handleEditar = (id) => {
        const task = lista.filter((task) => task.id == id)
        setTaskEditar(task[0])
        setInputText(task[0].task)
    }

    return (
        <>
            <div className="row container mx-auto mt-4">
                <div className="col-6">
                    <h2 className='text-center text-primary'>To Do List</h2>

                    <form onSubmit={(event) => handleSubmit(event)}>
                        <input type="text" className='form-control mb-2' value={inputText} onChange={(event) => handleChangeInput(event)} />
                        <button className='btn btn-primary mt-2' type='submit'>Agregar</button>
                    </form>
                </div>

                <div className="col-6">
                    <h2 className='text-primary text-center'>Tasks</h2>

                    <div className='list-group'>
                        {
                            lista.length
                                ?
                                lista.map(({ id, task }) => (

                                    <div className='list-group-item d-flex justify-content-between' key={id}>
                                        <p>{task}</p>
                                        <button onClick={() => handleEliminar(id)} className='btn btn-danger'>Eliminar</button>
                                        <button onClick={() => handleEditar(id)} className='btn btn-success'>Editar</button>
                                    </div>
                                ))
                                : <p className='fw-bold text-center text-danger'>Aun no hay Tareas, Agrega algunas...</p>
                        }
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
