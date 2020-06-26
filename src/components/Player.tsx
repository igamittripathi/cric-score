import * as React from 'react';
import { Dropdwon } from './Dropdown';
import { Textbox } from './Textbox';

interface IPlayerProps {
    onNameChange?: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
    onPlayerTypeChange?: ((event?: React.ChangeEvent<{ value: unknown }>) => void) | undefined;
    onNameFocus?: ((event: React.FocusEvent<HTMLInputElement>) => void) | undefined;
    onNameBlur?: ((event: React.FocusEvent<HTMLInputElement>) => void) | undefined;
    name?: string;
    isNameReqired?: boolean;
    isNameError?: boolean;
    type?: string | number;
    options?: Array<string | number>;
    placeholder?: string;
}

export const Player: React.FC<IPlayerProps> = React.memo<IPlayerProps>((
    { onNameChange, onPlayerTypeChange, onNameFocus, onNameBlur, name, isNameReqired = false, isNameError = false, type, options, placeholder = 'Name' }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Textbox value={name}
                onChange={onNameChange}
                placeholder={placeholder}
                required={isNameReqired}
                error={isNameError}
                onBlur={onNameBlur}
                onFocus={onNameFocus}
            />
            <Dropdwon onChange={onPlayerTypeChange}
                value={type}
                options={options} />
        </div>
    )
});