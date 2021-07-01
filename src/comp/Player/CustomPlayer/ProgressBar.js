import ShowTime from './ShowTime';

const ProgressBar = ({progressRef, isTimeShow, timeToShow, isLive, currentProgress, loadedSeconds, handleProgressChange, handleToggleShowTimeAbove, handleTimeToShow}) => {
    return ( 

        <div className="progressBar" ref={progressRef} >
                            
                        
            {isTimeShow && <ShowTime time={timeToShow} />}
            
                {isLive ? // IF LIVE WIDTH IS ALAWYS 100%
                    <div 
                        className="currentProgress" 
                        style={{width:'100%'}} >
                    </div>
                : 
                    <div 
                        className="currentProgress" 
                        style={{width:`${currentProgress < 100 ? currentProgress : 100}%`}} >
                    </div>
                }
                



                <div className="loadedProgress"
                    style={{width:`${loadedSeconds < 100 ? loadedSeconds : 100}%`}}
                >
                </div>
                <div 
                    className="progressBackground" 
                    onClick={handleProgressChange}
                    onMouseOver={handleToggleShowTimeAbove}
                    onMouseLeave={handleToggleShowTimeAbove}
                    onMouseMove={handleTimeToShow}
                ></div>

        
        </div>

     );
}
 
export default ProgressBar;