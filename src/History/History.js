import React, { Component } from 'react';
import './History.css'
import moment from 'moment';
import axios from 'axios';
import api from '../api';
import {SectionBox} from "./SectionBox";

class History extends Component {

    constructor () {
        super();
        this.state = {
            priceToday: {},
            priceYesterday: {},
            priceTwoDays: {},
            priceThreeDays: {},
            priceFourDays: {}
        };
    }

    getPriceForDay = (daysCount = 0, key) => {
        const time = moment().subtract(daysCount, 'days').unix();
        axios.all([this.getETHPrices(time), this.getBTCPrices(time), this.getLTCPrices(time)])
			.then(axios.spread((eth, btc, ltc) => {
			    /** Have clear names for your variables, what is f supposed to be? **/
				let f = {
					date: moment.unix(time).format("MMMM Do YYYY"),
					eth: eth.data.ETH.USD,
					btc: btc.data.BTC.USD,
					ltc: ltc.data.LTC.USD
				};
				this.setState({
                    [key]: f
                }, this.saveStateToLocalStorage);
			})).catch(error => {
                console.log(error);
            });
    };

    getCurrencyPrice = (date, currency) =>  api.get(`/data/pricehistorical?fsym=${currency}&tsyms=USD&ts=${date}`);

    getETHPrices = (date) => this.getCurrencyPrice(date, 'ETH');
    getBTCPrices = (date) => this.getCurrencyPrice(date, 'BTC');
    getLTCPrices = (date) => this.getCurrencyPrice(date, 'LTC');

    componentDidMount () {
        const days = ['Today', 'Yesterday', 'TwoDays', 'ThreeDays', 'FourDays'];

        /* days.map(day => {
            return this.getPriceForDay(day, `price${days[day]}`);
        }); */

        for(const day in days){
            this.getPriceForDay(day, `price${days[day]}`);
        }
    }

    render() {
        const {priceToday, priceYesterday, priceTwoDays, priceThreeDays, priceFourDays} = this.state;
		console.log(this.state);
    	return (
            <div className="history--section container">
                <h2>History (Past 5 days)</h2>
                <div className="history--section__box">
					<SectionBox price={priceToday}/>
					<SectionBox price={priceYesterday}/>
					<SectionBox price={priceTwoDays}/>
					<SectionBox price={priceThreeDays}/>
					<SectionBox price={priceFourDays}/>
                </div>
            </div>
        )
    }
}

export default History;
