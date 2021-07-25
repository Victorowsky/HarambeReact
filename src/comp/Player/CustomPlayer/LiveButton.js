import {  IconButton, makeStyles } from '@material-ui/core';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { DataContext } from '../../../App';

const useStyles = makeStyles({
    liveButton:{
        fontSize:'16px',
        color:'white',
        fontWeight:'700',
        '&:hover':{
            color:'#f94144'
        },
        '@media (max-width: 500px)':{
            display:'none'
        }
    },
    liveParagraph:{
        fontWeight:'700'
    }
})

const LiveButton = () => {

    const {admin} = useSelector(state=> state.player)

    const { socket } = useContext(DataContext) 

    const classes = useStyles()

    const handleLive = () =>{
        if(admin){
            socket.emit('liveVideo')
        }
    }

    return ( 
        <IconButton className={classes.liveButton} onClick={handleLive}>
                LIVE
        </IconButton>
     );
}
 
export default LiveButton;