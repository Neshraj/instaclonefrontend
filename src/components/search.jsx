import { useEffect } from "react";

function Search(){

    useEffect(()=>{
        document.getElementById('mainhomebar').style.backgroundColor='';
        document.getElementById('mainsearchbar').style.backgroundColor='#dbdbdb';
        document.getElementById('mainexplorebar').style.backgroundColor='';
        document.getElementById('mainreelsbar').style.backgroundColor='';
        document.getElementById('mainaddbar').style.backgroundColor='';
        document.getElementById('mainnotificationbar').style.backgroundColor='';
        document.getElementById('mainprofilebar').style.backgroundColor='';
    })

    return (
        <div>
            <h1>Search
            
            </h1>
        </div>
    )
}

export default Search;