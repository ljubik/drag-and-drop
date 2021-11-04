import React from 'react';
import Header from '../components/Header/Header';
import Toptable from "../components/Toptable/Toptable";
import Footer from "../components/Footer/Footer";
import db from "../db/db.json";
import Card from '../components/Card/Card';

const DropToptable = (props) => {
    
    return (
        <>
            <Header props={props} />
            <Toptable />
            <Card></Card>
            <Footer />
        </>
    );
};

export default DropToptable;