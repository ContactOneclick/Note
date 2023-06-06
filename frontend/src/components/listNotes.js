import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const ListNotes = () => {
    const navigation = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [isApiCall, setIsApiCall] = useState(true)
    const [noteData, setNoteData] = useState([])
    const [isError, setIsError] = useState(false)
    const [reloadListUi, setReloadListUi] = useState(false)

    const getNotes = async () => {
        try {
            const noteResult = await axios.get('http://localhost:4000/notes')
            console.log('noteResult', noteResult.data.data)
            if (noteResult?.data?.success) {
                setNoteData(noteResult.data.data)
            }
            setIsLoading(false)
        } catch (error) {
            setIsError(true)
        }
    }

    const removeNote = async (id, index) => {
        try {
            const noteResult = await axios.delete(`http://localhost:4000/notes/${id}`)
            if (noteResult?.data?.success) {
                if (noteData.length === 1) {
                    setNoteData([])
                } else {
                    let array = noteData;
                    array.splice(index, 1);
                    setNoteData(array);
                }
                setReloadListUi(true)
            }
            setIsLoading(false)
        } catch (error) {
            setIsError(true)
        }
    }

    useEffect(() => {
        if (reloadListUi) {
            setReloadListUi(false)
            getListUi()
        }
    }, reloadListUi)

    useEffect(() => {
        if (isApiCall) {
            setIsApiCall(false)
            getNotes()
        }
    }, [isApiCall])

    if (isLoading) {
        return <>loading....</>
    }

    if (isError) {
        return <>Something went wrong</>
    }

    const getListUi = () => {
        return <>{noteData?.length > 0 && noteData.map((item, index) => {
            return <li>
                <div className="note_action">
                    <button>
                        <i class="fa fa-edit" onClick={(e) => {
                            e.preventDefault()
                            navigation(`/edit-note/${item._id}`)
                        }}></i>
                    </button>
                    <button onClick={(e) => {
                        e.preventDefault()
                        removeNote(item._id, index)
                    }}>
                        <i class="fa fa-trash-o"></i>
                    </button>
                </div>
                <div className="blockTop" onClick={(e) => {
                    e.preventDefault()
                    navigation(`/note/${item._id}`)
                }}>
                    <div className="note_title">{item.title}</div>

                </div>
                <div className="note_description">{item.description}</div>
            </li>
        })}
        </>
    }

    return <div className="container">
        <div className="row">
            <div className="noteBlockMain">
                <div className="add_block_btn">
                    <button onClick={() => { navigation('/add-note') }}>Add Note</button>
                </div>
                {noteData?.length == 0 &&
                    <div>No data found</div>
                }
                <ul>
                    {getListUi()}
                </ul>
            </div>
        </div>
    </div>
}

export default ListNotes