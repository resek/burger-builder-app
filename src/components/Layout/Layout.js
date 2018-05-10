import React, {Fragment} from 'react';
import classes from "./Layout.css";

const layout = (props) => {
    console.log(classes);    
    return (
        <Fragment>
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Fragment>
    )
} 

export default layout;