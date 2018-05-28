import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header =(props) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/dashboard">
                    <h1>BarterBro</h1>
                </Link>
                <div className="header__content">
                    <img className="image-profile"src={props.userPhoto} />
                    <span className="button button--link">{
                        props.userName
                        }</span>
                    <button className="button button--link" onClick={props.startLogout}>SIGN-OUT</button>
                </div>
            </div>
        </div>
    </header>
)

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

const mapStateToProps = (state) => {
    return {
        userPhoto: state.auth.userPhoto,
        userName: state.auth.userName
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);