import * as React from 'react';
import {Dropdwon} from './Dropdown';
import {Textbox}  from './Textbox';

interface IPlayerProps{
    nameChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    name?:string;
    isNameReqired?:boolean;
    playerTypeChange?:(e:React.ChangeEvent<HTMLSelectElement>)=>void;
    type?:string|number;
    options?: Array<string|number>;
    placeholder?:string;
}

export const Player =(props:any) => (
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Textbox value={props.name} 
        onChange={props.nameChange} 
        placeholder="Player Name"
        
        />
        <Dropdwon onChange={props.playerTypeChange} 
        value={props.type}
        options={props.options}/>
    </div>
) 