import classes from './LoadingSpinner.module.css';

const LoadingSpinner = () => {    
    const content = 
                    <div className={classes.container}>
                        <div className={classes.ellipsis}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
    
        return content;
}

export default LoadingSpinner;