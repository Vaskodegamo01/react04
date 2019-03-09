import React, {Component} from 'react';
import './CountryList.css'

class CountryList extends Component{
    constructor(props){
        super(props);
        this.state = {
            Country: this.props.author,
            title: this.props.title
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts/')
            .then(response =>{
                if(response.ok){
                    return  response.json();
                }
                throw new Error('Что то случилось с сетевым запросом')
            }).then(result => {
            console.log(result);
            this.setState({posts: result})
        })
            .catch(error=>this.setState({error: error.message}))
    }
    render() {
        console.log('Метод Рендер был вызван');
        return(
            <article className='Posts'>
                <h1>{this.props.title}</h1>
                <div className='Info'>
                    <div className='Author'>{this.props.author}</div>
                </div>
            </article>
        )
    }
}
export default CountryList;