import React from 'react';
import { render } from 'react-dom';
import './index.css';



class News extends React.Component{
  state = {
    loading: false,
    apiKey: '2907946de4594cd38c927ad903fc5517',
    data: []
  }

  componentDidMount(){
    this.setState({loading:true})
    fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${this.state.apiKey}`)
      //.then(data => data.json())
      //.then(data => this.setState({data, loading: false}) )
      //.catch((error) => console.log(error));
      .then((response) => {
        // Add this check and throw an error if it fails
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          data: data.articles,
          loading: false
        })
      })
      .catch((error) => console.log(error));
  }
  
  render(){
    const { loading, data } = this.state;
    return(
      <div>
        {
        loading
          ? "Loading..."
          : <div>
              <h1>Latest News</h1>
              {data.map(article =>{
                return (
                  <div className="article">
                    <img src = {article.urlToImage} alt = {article.title}/>
                    <strong>{article.publishedAt}</strong><br/>
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                  </div>
                )
              })}
            </div>
        }
      </div>
    )
  }
}

render(
	<News/>, 
	document.getElementById('root')
)
