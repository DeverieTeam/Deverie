import { Link } from "react-router-dom";

function HomePage(){
    return(
        <>
            <h1>Deverie</h1>
            <Link to="/forums">Lien vers les forums</Link>
        </>
    )
}
export default HomePage;