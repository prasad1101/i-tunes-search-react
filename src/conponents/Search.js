import React from 'react'
import '../css/search.css'
import axios from 'axios'
import Loader from '../loader.gif'

class Search extends React.Component {
    
    constructor( props ){
        super( props );
        
        this.state = {
            query : '',
            results : {},
            loading : false,
            message : ''
        }
        this.cancel = '';
    }
 
    fetchSearchResults = ( query )=>{
        const searchUrl = `https://itunes.apple.com/search?term=${query}`;

        if(this.cancel){
            this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();
        axios.get( searchUrl, {cancelToken : this.cancel.token} ,{
            headers: {
              'Access-Control-Allow-Origin': '*',
            }})
        .then( res=>{
            this.setState({
                results : {}
              
            })
        const resultNotFoundMsg = ! res.data.results.length ? 'There are no more search results!' : '';
            console.log("search result : ",res.data);
            this.setState({
                results : res.data.results,
                message : resultNotFoundMsg,
                loading : false
            })
        } ).catch( error =>{
            if(axios.isCancel(error) || error){
                this.setState({
                    loading : false,
                    message : 'Failed to fetch the data!'
                })
            }
        })

    }

    handleOnInputChange = (event) =>{
const query = event.target.value;
console.warn(query);
if(! query){

    this.setState({query, results : {}, message : ''});

}else{
    this.setState({ query : query, loading : true, message : ''}, ()=>{
        this.fetchSearchResults(query);
    })

}

    }

    renderSearchResults = () =>{

        const { results } = this.state;

        if(Object.keys(results).length && results.length){
            return (
                <div className="results-container">
{results.map(result=>{
    return (
        <a key={result.artistId} href={result.trackViewUrl} target="_blank" className="result-item">
            <h6 className="image-username">{result.artistName}</h6>
            <div className="image-wrapper">
            <img className="image" src={result.artworkUrl100} alt={result.artistName} />
            </div>
            
        </a>
    )
})}
                </div>
            )
        }

    }

    render () {
        const {query, loading , message} = this.state;
        //console.warn("state",this.state)
        return (
            <div className = "container">
<h2 className="heading">iTunes Search: React app</h2>
<h3>Made with <i className="fa fa-heart"></i> by Prasad Pawar</h3>

<label className="search-label" htmlFor="search-input">
    <input type="text"
            value={query}
            name="query"
            id="search-input"
            placeholder="Search.."
            onChange={this.handleOnInputChange}    
    />
    <i className="fa fa-search search-icon" aria-hidden="true"/>
</label>

{/* Error message*/}

        {message && <p className="message">{ message }</p>}
{/* Loader */}

<img src={Loader} className={`search-loading ${loading ? 'show' : 'hide'}`} alt="loader-image" />

{ /* Displaying result */ }
{this.renderSearchResults() }
            </div>
        )
    }
}

export default Search