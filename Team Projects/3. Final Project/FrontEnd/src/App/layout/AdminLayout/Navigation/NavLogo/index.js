import React from 'react';
import DEMO from './../../../../../store/constant';
import Aux from "../../../../../hoc/_Aux";
import teamLogo from "../../../../../assets/images/Team5_Logo.PNG";


const navLogo = (props) => {
    let toggleClass = ['mobile-menu'];
    if (props.collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    return (
        <Aux>
            <div className="navbar-brand header-logo">
                <a href="/dashboard/default" className="b-brand">
                    <div className="b-bg">
                        {/* <img width="50px" height="50px" src={teamLogo} />*/}
                        <i className="feather icon-trending-up" />
                    </div>
                    <span className="b-title">Office Planner</span>
                </a>
                <a href={DEMO.BLANK_LINK} className={toggleClass.join(' ')} id="mobile-collapse" onClick={props.onToggleNavigation}><span /></a>
            </div>
        </Aux>
    );
};

export default navLogo;
