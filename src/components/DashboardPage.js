import React from 'react';
import { Link } from 'react-router-dom';
import ItemList from './ItemList';

const DashboardPage = () => (
    <div>
        Dashboard page content
        <Link className="button" to="/create">Add Item</Link>
        <ItemList />
    </div>
);

export default DashboardPage;