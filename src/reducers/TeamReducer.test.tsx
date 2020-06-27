import * as React from 'react';
import {TeamReducers } from './TeamReducres'
import { IPlayer, playerType } from '../interfaces';
import { initialState, SAVE_TEAM_SUCCESS, UPDATE_TEAMS_INIT , SAVE_TEAMS_INIT} from '../constants';

describe('TeamReducers',()=>{

    let initState ;

    test('default initial state should be match',()=>{
        initState = TeamReducers(undefined,{type:''})
        expect(initState).toBe(initialState); 
    });

    test('SAVE_TEAM_INIT test save teams',()=>{
        initialState.team_a.name='India';
        initialState.team_b.name='Africa';
        initState = TeamReducers(initialState,{type:SAVE_TEAMS_INIT,payload:initialState});
        expect(initState.team_a.name).toBe('India');
        expect(initState.team_b.name).toBe('Africa');
    })

    test('UPDATE_TEAMS_INIT test updated team name',()=>{
        initialState.team_a.name='India';
        initialState.team_b.name='Africa';
        initState = TeamReducers(initialState,{type:UPDATE_TEAMS_INIT,payload:initialState});
        expect(initState.team_a.name).toBe('India');
        expect(initState.team_b.name).toBe('Africa');
    })

    test('SAVE_TEAM_SUCCESS test save teams',()=>{
        for (let i = 0; i < 11; i++) {
            let _type: playerType = 'batsman';
            if (i > 5) {
                _type = 'bowler'
            }
            const playersDefaultProps = {
                type: _type,
                batingOrder: i,
                overs: [],
                hasStrike: false,
                isError: false,
                isRequired: true
            }
            const team_a_player: IPlayer = { name: 'A ' + (i + 1), teamId: 'TeamA', ...playersDefaultProps }
            const team_b_player: IPlayer = { name: 'B ' + (i + 1), teamId: 'TeamB', ...playersDefaultProps }
            initialState.team_a.playres.push({ ...team_a_player })
            initialState.team_b.playres.push({ ...team_b_player });
        }

        initState = TeamReducers(initialState,{type:SAVE_TEAM_SUCCESS,payload:initialState});
        expect(initState).toMatchObject(initialState);
    })
    

})
