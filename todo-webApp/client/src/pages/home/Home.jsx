import React, {useContext} from 'react';
import { DataContext } from '../../context/DataContext'

const Home = () => {

	const {data} = useContext(DataContext);

    return (
        <div>
            <h1>{data}</h1>
        </div>
    );
};

export default Home;
