import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "./loader"
import { useNavigate } from "react-router-dom"

const NoteDetails = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isApiCall, setIsApiCall] = useState(true)
    const [noteData, setNoteData] = useState({
        title: '',
        description: ''
    })
    const navigation = useNavigate()
    const currentRoute = window.location.pathname.split('/')
    const id = currentRoute[currentRoute.length - 1]

    useEffect(() => {
        if (isApiCall) {
            setIsApiCall(false)
            getNotes()
        }
    }, [isApiCall])

    const getNotes = async () => {
        try {
            const noteResult = await axios.get(`http://localhost:4000/notes/${id}`)
            console.log('noteResult?.data?', noteResult?.data)
            if (noteResult?.data?.success) {
                setNoteData(noteResult.data.data)
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }
    if (isLoading) {
        return <Loader />
    }
    return <div className="container">
        <div className="noteDetail">
            <div className="detailTop">
                <div className="noteSumbitBtn">
                    <button onClick={() => { navigation('/') }}>Back</button>
                </div>
                {noteData &&
                    <h1>{noteData.title}</h1>
                }
            </div>
            {noteData ?
                <h3>{noteData.description}</h3>
                : <h3> No Data Found.</h3>
            }
        </div>
    </div>
}

export default NoteDetails