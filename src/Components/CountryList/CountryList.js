import React, {Component} from 'react';
import './CountryList.css'
import CountryView from "./CountryView/СountryView";

class CountryList extends Component{
    constructor(props){
        super(props);
        this.state = {
            countryList: [],
            error: false,
            country: null
        };
    }

    componentDidMount() {
        fetch('https://restcountries.eu/rest/v2/all?fields=name;alpha3Code')
            .then(response =>{
                if(response.ok){
                    return  response.json();
                }
                throw new Error('Что то случилось с сетевым запросом')
            }).then(result => {
              this.setState({countryList: result});
        })
            .catch(error=>this.setState({error: error.message}))
    }

    Click = (id) => {
        fetch(`https://restcountries.eu/rest/v2/alpha/${this.state.countryList[id].alpha3Code}`)
            .then(response =>{
                if(response.ok){
                    return  response.json();
                }
                throw new Error('Что то случилось с сетевым запросом')
            }).then(result => {
            if(result.borders){
                let all = result.borders.map((alpha3Code) => {
                    return new Promise((resolve) => {
                        fetch(`https://restcountries.eu/rest/v2/alpha/${alpha3Code}?fields=name`)
                            .then(response =>{
                                if(response.ok){
                                    return  response.json();
                                }
                                throw new Error('Что то случилось с сетевым запросом')
                            }).then(result => {
                            resolve(result);
                        })
                            .catch(error=>this.setState({error: error.message}))
                    });
                });
                Promise.all(all).then(values => {
                    result.borders = values;
                    this.setState({country: result});
                });
            }else{
                this.setState({country: result});
            }

        })
            .catch(error=>this.setState({error: error.message}))
         };

    render() {
        const renderCountry = this.state.countryList.map((country,id)=>(
            <li key={id} onClick={() => this.Click(id)}>{country.name}</li>
        ));
        return(
            <div>
                <div className="CountryList">
                    <ol>
                        {renderCountry}
                    </ol>
                </div>
                <div className="Country">
                    {this.state.country ?  <CountryView country={this.state.country}/> : "Выберите страну"}
                </div>
            </div>
        )
    }
}
export default CountryList;