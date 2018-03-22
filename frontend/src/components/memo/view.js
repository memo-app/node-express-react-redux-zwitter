// Imports
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

// UI Imports
import { Card, CardTitle } from 'material-ui/Card';

// App Imports
import Memo from './memo';

function MemoView({ memo }) {
    return (
        <div>
            <Memo { ...memo } />

            <br/>

            <Link to="/">👈 Back to all memos</Link>
        </div>
    );
}

export default MemoView;