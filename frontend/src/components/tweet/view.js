// Imports
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

// UI Imports
import { Card, CardTitle } from 'material-ui/Card';

// App Imports
import Tweet from './Tweet';

function TweetView({ tweet }) {
    return (
        <div>
            <Tweet { ...tweet } />

            <br/>

            <Link to="/">👈 Back to all tweets</Link>
        </div>
    );
}

export default TweetView;