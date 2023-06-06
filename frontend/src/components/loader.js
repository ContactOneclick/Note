import { Spinner } from "react-bootstrap"

const Loader = () => {
    return <Spinner animation="border" role="status" style={{ height: "1rem", width: "1rem"}}>
    <span className="visually-hidden">Loading...</span>
  </Spinner>
}

export default Loader