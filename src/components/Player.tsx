import * as React from 'react';
import { Dropdwon } from './Dropdown';
import { Textbox } from './Textbox';

interface IPlayerProps {
    onNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPlayerTypeChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
    name?: string;
    isNameReqired?: boolean;
    isNameError?: boolean;
    type?: string | number;
    options?: Array<string | number>;
    placeholder?: string;

}

export const Player: React.FC<IPlayerProps> =
    React.memo<IPlayerProps>(({ onNameChange, onPlayerTypeChange, name, isNameReqired = false, isNameError = false, type, options, placeholder = 'Name' }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Textbox value={name}
                onChange={onNameChange}
                placeholder={placeholder}
                required={isNameReqired}
                error={isNameError}
            />
            <Dropdwon onChange={onPlayerTypeChange}
                value={type}
                options={options} />
        </div>
    ));