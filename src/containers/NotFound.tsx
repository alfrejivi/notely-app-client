import React from 'react';
import './NotFound.css';
import { NOTFOUND } from 'dns';

const NotFound: React.FC = () => {
    return (
        <div className="NotFound">
            <h3>Sorry, page not found!</h3>
        </div>
    );
}

export default NotFound;