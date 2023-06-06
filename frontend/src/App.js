import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom'
import ListBlogs from './components/listNotes';
import NoteDetails from './components/noteDetails';
import AddNote from './components/addNote';
import './App.css'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ListBlogs />,
    }, {
      path: "/note/:id",
      element: <NoteDetails />,
    }, {
      path: "/add-note",
      element: <AddNote />,
    }, {
      path: "/edit-note/:id",
      element: <AddNote />,
    }
  ]);

  return <RouterProvider router={router} />
}

export default App;
