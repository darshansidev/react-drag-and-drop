import React, { useEffect, useState } from 'react';
import { Done, Pending, Progress, Review } from '../commons/statusTypes';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdOutlineReviews } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import axios from 'axios';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MdOutlinePendingActions } from "react-icons/md";

const TodoDashboard = () => {
    // ----------------define State -----------------------
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // ----------------------State Initilize -------------------
    const initialValues = {
        title: '',
        description: '',
        status: '',
    };

    // ---------------yup validation ----------------------
    const validationSchema = Yup.object({
        title: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        status: Yup.string().required('Required'),
    });

    // ----------------------useEffect Use For fetchData() call for data in enter page --------------------
    useEffect(() => {
        fetchData();
    }, []);

    // -----------------------------handle open and Close modal -----------------------------------------
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    // -------------------------------------Handle Add Event -------------------------------------------
    const onHandleSubmit = async (values) => {
        await axios.post('http://localhost:3000/todo/add', values)
            .then(response => {
                fetchData();
                handleClose();
                alert("Data Added Successfully");
            })
            .catch(error => console.error(error));
    };

    // -------------------------------------Handle Fetch Event -------------------------------------------
    const fetchData = async () => {
        await axios.get('http://localhost:3000/todo/get')
            .then((res) => {
                if (res.status === 200) {
                    setData(res.data.data);
                }
            }).catch((error) => {
                alert(error.message, "Something Went Wrong");
                console.error(error);
            });
    };

    // -------------------------------------Handle Update Event after Drag And Drop-------------------------------------------
    const handleDrop = async (item, status) => {
        const updatedItem = { ...item, status };
        delete updatedItem._id
        await axios.put(`http://localhost:3000/todo/update/${item._id}`, updatedItem)
            .then(response => {
                if (response.status === 200) {
                    fetchData();
                }
            }).catch((error) => {
                alert(error.message, "Something Went Wrong");
                console.error(error);
            });
    };

    // -------------------------------------Handle Delete Event ------------------------------------------------------
    const deleteData = async (id) => {
        await axios.delete(`http://localhost:3000/todo/delete/${id}`)
            .then(response => {
                if (response.status === 200) {
                    fetchData();
                }
            }).catch((error) => {
                alert(error.message, "Something Went Wrong");
                console.error(error);
            });
    }

    // -------------------------------------Make Card for manage Drag  state-------------------------------------------

    const TaskCard = ({ item }) => {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: 'TASK',
            item,
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }));

        return (
            <div ref={drag} className={`border border-2 rounded-4 ${isDragging ? 'opacity-50' : ''} my-3  `}>
                <div className='row'>
                    <div className="col-3 align-content-center fs-3">
                        {item.status === Pending && <MdOutlinePendingActions className='text-primary' />}
                        {item.status === Progress && <GrInProgress className='text-info' />}
                        {item.status === Review && <MdOutlineReviews className='text-warning' />}
                        {item.status === Done && <IoCheckmarkDoneSharp className='text-success' />}
                    </div>
                    <div className="col-9 p-3">
                        <p>Title: {item.title}</p>
                        <span>Description: {item.description}</span>

                        <div className='mt-3 mb-2 '>
                            <button className='border border-0 rounded-1 border-black  text-bg-danger' onClick={() => { deleteData(item._id) }}> Remove </button>
                        </div>
                    </div>
                </div>

            </div>
        );
    };

    // -------------------------------------Set Status column for card drag move -------------------------------------------

    const StatusColumn = ({ status, children }) => {
        const [, drop] = useDrop(() => ({
            accept: 'TASK',
            drop: (item) => handleDrop(item, status),
        }));

        return (
            <div ref={drop} className="col-md-3 col-sm-6 col-12">
                <h5 className='my-4 text-bg-secondary py-2 mx-4 rounded-3'>{status.toUpperCase()}</h5>
                {children}
            </div>
        );
    };

    // ---------------------------Return User Interface For Opration-------------------------------
    return (
        <DndProvider backend={HTML5Backend}>
            <div className='container '>
                <div className='d-flex align-baseline w-100 justify-content-between  my-5'>
                    <h3>TASK MANAGEMENT BOARD</h3>
                    <div>
                        <button type="button" className="btn btn-outline-primary" onClick={handleShow}>
                            + Add Todo
                        </button>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {['Pending', 'Progress', 'Review', 'Done'].map(status => (
                            <StatusColumn key={status} status={status}>
                                {data && data.filter(item => item.status === status).map((item, index) => (
                                    <TaskCard key={index} item={item} />
                                ))}
                            </StatusColumn>
                        ))}
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Task</h5>
                                <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onHandleSubmit}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div className="mb-3 px-3">
                                                <label htmlFor="title" className="form-label d-flex justify-content-start">Title</label>
                                                <Field name="title" type="text" className="form-control" />
                                                <ErrorMessage name="title" component="div" className="invalid-feedback d-block" />
                                            </div>
                                            <div className="mb-3 px-3">
                                                <label htmlFor="description" className="form-label d-flex justify-content-start">Description</label>
                                                <Field name="description" type="text" className="form-control" />
                                                <ErrorMessage name="description" component="div" className="invalid-feedback d-block" />
                                            </div>
                                            <div className="mb-3 px-3">
                                                <label htmlFor="status" className="form-label d-flex justify-content-start">Status</label>
                                                <Field name="status" as="select" className="form-select" >
                                                    <option value="Pending" >Pending</option>
                                                    <option value="Progress">Progress</option>
                                                    <option value="Review">Review</option>
                                                    <option value="Done">Done</option>
                                                </Field>
                                                <ErrorMessage name="status" component="div" className="invalid-feedback d-block" />
                                            </div>
                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                                Add Task
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DndProvider>
    );
};

export default TodoDashboard;