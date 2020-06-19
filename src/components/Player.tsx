import * as React from 'react';
import {Dropdwon} from './Dropdown';
import {Textbox}  from './Textbox';

interface IPlayerProps{
    onNameChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    name?:string;
    isNameReqired?:boolean;
    isNameError?:boolean;
    onPlayerTypeChange?:(e:React.ChangeEvent<HTMLSelectElement>)=>void;
    type?:string|number;
    options?: Array<string|number>;
    placeholder?:string;
    
}


export const Player =({onNameChange,name,isNameReqired=false,
    onPlayerTypeChange,type,options,placeholder="Name",isNameError=false}:any) => (
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Textbox value={name} 
        onChange={onNameChange} 
        placeholder={placeholder}
        
        />
        <Dropdwon onChange={onPlayerTypeChange} 
        value={type}
        options={options}/>
    </div>
) 