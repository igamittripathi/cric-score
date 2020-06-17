import React from 'react';
import { Textbox,Dropdwon } from '.';


const Player =(props:any) => (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Textbox value={props.name} onChange={props.nameChange}/>
        <Dropdwon onChange={props.playerTypeChange} 
        value={props.type}
        options={props.options}/>
    </div>
)


export default Player;