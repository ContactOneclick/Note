import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'
import Loader from "./loader"

const AddNote = () => {
    const navigation = useNavigate()
    const currentRoute = window.location.pathname.split('/')
    const id = currentRoute[currentRoute.length - 1]
    const [isLoading, setIsLoading] = useState(true)
    const [isApiCall, setIsApiCall] = useState(true)
    const [note, setNote] = useState({
        title: '',
        description: ''
    })
    const [isFormSubmit, setIsFormSubmit] = useState(false)
    const [error, setError] = useState({
        title: '',
        description: ''
    })

    const getNotes = async () => {
        try {
            const noteResult = await axios.get(`http://localhost:4000/notes/${id}`)
            console.log('noteResult?.data?', noteResult?.data)
            if (noteResult?.data?.success) {
                setNote({
                    title: noteResult.data.data.title,
                    description: noteResult.data.data.description
                })
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (isApiCall) {
            setIsApiCall(false)
            if (currentRoute[currentRoute.length - 2] === 'edit-note') {
                getNotes()
            } else {
                setIsLoading(false)
            }
        }
    }, [isApiCall])

    const SubmitDetail = async () => {
        try {
            let error = false
            if (note.title === '') {
                setError({
                    ...error,
                    title: 'Note Title is required.'
                })
                error = true
            }
            if (note.title.length < 3) {
                setError({
                    ...error,
                    title: 'Should have more than 2 characters.'
                })
                error = true
            }
            if (note.title.length > 20) {
                setError({
                    ...error,
                    title: 'Should have less than or equal 20 characters.'
                })
                error = true
            }
            if (note.description === '') {
                setError({
                    ...error,
                    description: 'Note Title is required.'
                })
                error = true
            }
            if (note.description.length < 3) {
                setError({
                    ...error,
                    description: 'Should have more than 2 characters.'
                })
                error = true
            }
            if (note.description.length > 100) {
                setError({
                    ...error,
                    description: 'Should have less than or equal 100 characters.'
                })
                error = true
            }

            if (error) {
                return
            }
            setIsFormSubmit(true)
            let result
            if (currentRoute[currentRoute.length - 2] === 'edit-note') {
                result = await axios.put(`http://localhost:4000/notes/${id}`, note)
            } else {
                result = await axios.post('http://localhost:4000/notes', note)
            }
            if (result?.data?.status === 200) {
                setIsFormSubmit(false)
                toast.success(result?.message)
                navigation('/')
                return
            }
            setIsFormSubmit(false)
            toast.success(result?.data?.message)
        } catch (error) {
            toast.error(error?.message)
            setIsFormSubmit(false)
        }
    }

    if (isLoading) {
        return <Loader />
    }
    return <div className="addNote">
        <div className="container">
            <div className="row">
                <div className="noteInner">
                    <h1>Add New Note</h1>
                    <div className="addNoteField">
                        <div className="fieldWrapper">
                            <label>
                                Title :
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Note Title"
                                className="col-md-2"
                                value={note.title}
                                onChange={(e) => {
                                    setError({
                                        ...error,
                                        title: ''
                                    })
                                    if (/^[a-z\d\-_\s]+$/.test(e.target.value) || e.target.value === '') {
                                        setNote({
                                            ...note,
                                            title: e.target.value
                                        })
                                    }
                                }}
                            />
                        </div>
                        <span className=" error">{error.title}</span>
                    </div>
                    <div className="addNoteField">
                        <div className="fieldWrapper">
                            <label className="col-md-1">
                                Description :
                            </label>
                            <input
                                type="text"
                                name="description"
                                placeholder="Note Description"
                                className="col-md-2"
                                value={note.description}
                                onChange={(e) => {
                                    setError({
                                        ...error,
                                        description: ''
                                    })
                                    if (/^[a-z\d\-_\s]+$/.test(e.target.value) || e.target.value === '') {
                                        setNote({
                                            ...note,
                                            description: e.target.value
                                        })
                                    }
                                }}
                            />
                        </div>
                        <span className=" error">{error.description}</span>
                    </div>
                    <div className="noteSumbitBtn">
                        <button onClick={() => { navigation('/') }}>Cancel</button>
                        <button onClick={() => SubmitDetail()}
                            disabled={isFormSubmit}
                        >
                            Submit {isFormSubmit && <Loader />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AddNote