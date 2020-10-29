import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import '../../css/app.css'

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #F9A826;
  margin-top: 20%;
`;

const { SearchBar } = Search;
const products = [
    {'id': 1, 'date': '28/10/2020', 'country': 'france', 'totalconfirme': 10, 'totalmort': 20, 'totalretablie': 30},
    {'id': 2, 'date': '29/10/2020', 'country': 'réunion', 'totalconfirme': 40, 'totalmort': 50, 'totalretablie': 60},
];
const columns = [{
  dataField: 'id',
  text: 'ID'
}, {
  dataField: 'date',
  text: 'Date'
}, {
  dataField: 'country',
  text: 'Country'
}, {
    dataField: 'totalconfirme',
    text: 'Total confirme'
}, {
    dataField: 'totalmort',
    text: 'Total mort'
}, {
    dataField: 'totalretablie',
    text: 'Total rétablie'
}];

class Home extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            dataCovid: [],
            totalConfirme: 0,
            totalMort: 0,
            totalRetablie: 0,
            loading: true
        }

    }

    componentDidMount() {
        axios.get(`https://api.covid19api.com/summary`)
          .then(res => {
            const covidInfo = res.data.Countries;
            var tabTotalConfirmed = 0;
            var tabTotalMort = 0;
            var tabTotalRetablie = 0;
            console.log(res.data.Countries)

            covidInfo.map((element, index) => (

                this.state.dataCovid.push({
                    'id': index, 'date': element.Date, 'country': element.Country, 'totalconfirme': element.TotalConfirmed, 'totalmort': element.TotalDeaths, 'totalretablie': element.TotalRecovered
                }),

                tabTotalConfirmed = tabTotalConfirmed + element.TotalConfirmed,  
                tabTotalMort = tabTotalMort + element.TotalDeaths,  
                tabTotalRetablie = tabTotalRetablie + element.TotalRecovered
    
            ))

            this.setState({ loading: false, totalConfirme: tabTotalConfirmed, totalMort: tabTotalMort, totalRetablie: tabTotalRetablie });


          })


    }

    render() {


    return (
        <div>
            <div>
            <ClipLoader
                css={override}
                size={150}
                color={"#F9A826"}
                loading={this.state.loading}
            />
            </div>

            {
                !this.state.loading &&             
                <div className="row noPadding">

                    <div className="col-md-4 noPadding text-center">

                        <div className="card">
                            <div className="card-body">

                                <b>Total confirmé : {this.state.totalConfirme} </b>

                            </div>
                        </div>

                    </div>
                    <div className="col-md-4 noPadding text-center">

                        <div className="card">
                            <div className="card-body">

                                <b>Total mort : {this.state.totalMort} </b>

                            </div>
                        </div>
                                            
                    </div>
                    <div className="col-md-4 noPadding text-center">

                        <div className="card">
                            <div className="card-body">

                                <b>Total rétablie : {this.state.totalRetablie} </b>

                            </div>
                        </div>
                                            
                    </div>

                </div>
            }
            
            {
            !this.state.loading && 
            
            <ToolkitProvider
                keyField="id"
                data={ this.state.dataCovid }
                columns={ columns }
                search
                >
                {
                    props => (
                    <div>
                        <SearchBar { ...props.searchProps } />
                        <BootstrapTable
                        { ...props.baseProps }
                        />
                    </div>
                    )
                }
            </ToolkitProvider>
            /*<BootstrapTable keyField='id' data={ products } columns={ columns } />*/

            /*
            this.state.dataCovid.map((element, index) => (
                <div key={index} className="card">
    
                    <div className="card-body">
    
                            <b>ID : </b> {index} - <b>{element.Date}</b> - <b>{element.Country}</b> <br/>
                            <b>Nouveau cas : </b> {element.NewConfirmed} / <b>Nouveau cas confirmé : </b> {element.NewRecovered} / <b>Nouveau mort : </b> {element.NewDeaths} <br/>
                            <b>Total confirmé :</b> {element.TotalConfirmed}/ <b>Total mort : </b> {element.TotalDeaths} / <b>Total rétablie</b> {element.TotalRecovered}<br/>
    
                    </div>
    
                </div>  
            ))
            */

            }

        </div>
    );
    }

}

export default Home;
