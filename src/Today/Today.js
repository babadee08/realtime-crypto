import React, {useState, useEffect} from 'react';
import api from '../api';
import './Today.css';

function Today() {

    const [btcPrice, setBtcPrice] = useState('');
    const [ltcPrice, setLtcPrice] = useState('');
    const [ethPrice, setEthPrice] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await api.get(`/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD`);
                setBtcPrice(result.data.BTC.USD);
                setLtcPrice(result.data.LTC.USD);
                setEthPrice(result.data.ETH.USD);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="today--section container">
            <h2>Current Price</h2>
            <div className="columns today--section__box">
                <div className="column btc--section">
                    <h5>${btcPrice}</h5>
                    <p>1 BTC</p>
                </div>
                <div className="column eth--section">
                    <h5>${ethPrice}</h5>
                    <p>1 ETH</p>
                </div>
                <div className="column ltc--section">
                    <h5>${ltcPrice}</h5>
                    <p>1 LTC</p>
                </div>
            </div>
        </div>
    )
}

export default Today
