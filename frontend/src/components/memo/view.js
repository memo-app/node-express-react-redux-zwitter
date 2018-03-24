// Imports
import React from 'react';
import { Link } from 'react-router-dom';

// App Imports
import Memo from './memo';

function MemoView({ memo }) {
    return (
        <div>
            <Memo { ...memo } />

            <br/>

            <Link to="/"><span role="img" aria-label="">👈</span> Back to all memos</Link>
        </div>
    );
}

export default MemoView;