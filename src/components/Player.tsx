import React from 'react';
import { Textbox,Dropdwon } from '.';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const Player =(props:any) => (
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Textbox value={props.name} onChange={props.nameChange} placeholder="Player Name"/>
        <Dropdwon onChange={props.playerTypeChange} 
        value={props.type}
        options={props.options}/>
    </div>
)


export default Player;