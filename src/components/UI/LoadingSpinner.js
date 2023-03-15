import classes from './LoadingSpinner.module.css';

import useLoadingStore from '../../store/loading-store';

const LoadingSpinner = () => {
    const [isReady] = useLoadingStore(
        (state) => [state.isReady]
      );
    
    const content = 
                <div className={classes.backdrop}>
                    <div className={classes.container}>
                        <div class={classes.ellipsis}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
    
    if(!isReady()){
        return content;
    }
}

export default LoadingSpinner;