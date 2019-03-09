import React from 'react';
import './CountryView.css'

const CountryView =(props) => (
   <div>
       {console.log((props.country.borders))}
       <div className="NameFlag">
           <div className="Name">
               <h3>{props.country.name}</h3>
               <p><b>Capital:</b>{props.country.capital}</p>
               <p><b>Population:</b>{props.country.population}</p>
           </div>
           <div className="Flag">
               <img src={props.country.flag}  width="200"  alt=""/>
           </div>
       </div>
       <div className="Borders">
           <p>Borders with:</p>
           <ul>
           {props.country.borders.length ? props.country.borders.map((country,id)=>(
               <li key={id}>{country.name}</li>
           )) : <p>didn't have anybody border</p>}
           </ul>
       </div>
   </div>
);
export default CountryView;