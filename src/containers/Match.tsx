import React, { useState, FunctionComponent as FC, useEffect } from 'react';
import { BowlResults, BowlResultType, PlayerTypes } from '../constants';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ITeam, ITeams, IPlayer, IOver, IBowlerOver } from '../interfaces';
import { ScoreCard } from '../components';
import { isNumber } from 'util';

export const Match: FC = () => {
    const teamDetails = useSelector((state: any) => state.teams);
    const [teams, setTeams] = useState<ITeams>(teamDetails);

    const matchOvers: number = 5;

    const [batingTeam, setBatingTeam] = useState<ITeam>(teams.team_a);
    const [bowlingTeam, setBowlingTeam] = useState<ITeam>(teams.team_b);
    const [bowlResult, setBowlResult] = useState<BowlResultType | ''>('');
    const [wicketsDown, setWicketDown] = useState<number>(0);
    const [over, setOver] = useState<BowlResultType[]>([]);
    const [extra, setExtra] = useState(0);
    const [bowlCounter, setBowlCounter] = useState<number>(0);
    const [nextInning, setNextInning] = useState<boolean>(false)

    useEffect(() => {
        //console.log(bowlingTeam);
    }, [teamDetails, bowlingTeam]);

    const hitBowl = (): BowlResultType => {
        return BowlResults[Math.floor(Math.random() * BowlResults.length)] as BowlResultType;
    }

    const compare = (a: IPlayer, b: IPlayer) => {
        const lengthA = a.overs?.length || 0;
        const lengthB = b.overs?.length || 0;
        let comparison = 0;
        if (lengthA > lengthB) {
            comparison = 1;
        } else if (lengthA < lengthB) {
            comparison = -1;
        }
        return comparison;
    }

    const getBowler = (players: IPlayer[]): IPlayer => {
        return players.filter((player: IPlayer) => player.type === 'bowler').sort(compare).find((player: IPlayer) => player.type === 'bowler') as IPlayer
    }

    const getOverNumber = (): number => (!batingTeam?.overs?.length ? 1 : (batingTeam?.overs?.length + 1));

    const aggangeBowlerOver = (bowlerOver: IBowlerOver, result: BowlResultType, _over: BowlResultType[]): IBowlerOver => {
        const run = (result === 'Wide Bowl' || result === 'No Bowl') ? 1 : result as number;
        return Object.assign(bowlerOver, {
            totalRun: result !== 'Wicket' ? (bowlerOver!.totalRun || 0) + run : (bowlerOver!.totalRun || 0),
            wicketFall: result === 'Wicket' ? (bowlerOver!.wicketFall || 0) + 1 : (bowlerOver!.wicketFall || 0),
            bowlResult: [..._over],
            boundryFour: result === 4 ? (bowlerOver!.boundryFour || 0) + 1 : (bowlerOver!.boundryFour || 0),
            boundrySix: result === 6 ? (bowlerOver!.boundrySix || 0) + 1 : (bowlerOver!.boundrySix || 0),
            noBowls: result === 'No Bowl' ? (bowlerOver!.noBowls || 0) + 1 : (bowlerOver!.noBowls || 0),
            wideBowls: result === 'Wide Bowl' ? (bowlerOver!.noBowls || 0) + 1 : (bowlerOver!.noBowls || 0)
        })
    }

    const selectBatsMan = (players: IPlayer[], batingOrder: number): IPlayer => {
        return JSON.parse(JSON.stringify(players.find((p: IPlayer) => p.batingOrder === batingOrder))) as IPlayer
    }

    const isBatsManRun = (result: BowlResultType): boolean => {
        return (result === 'Wide Bowl' || result === 'Wicket' || result === 'No Bowl') ? false : true
    }


    const arrangeBatingTeam = (_batingTeam: ITeam, result: BowlResultType): ITeam => {
        const run = (result === 'Wide Bowl' || result === 'No Bowl') ? 1 : result as number;
        const { playres } = JSON.parse(JSON.stringify(_batingTeam));
        if (!_batingTeam.onStrickPlayer){
            _batingTeam.onStrickPlayer= selectBatsMan([...playres],0);
            _batingTeam.onNonStrickPlayer = selectBatsMan([...playres],1);
        }
        const { onStrickPlayer, onNonStrickPlayer} = _batingTeam;
        Object.assign(onStrickPlayer,{
            bowlPlayed: result !== 'Wide Bowl' ? (onStrickPlayer?.bowlPlayed || 0) + 1 : (onStrickPlayer?.bowlPlayed || 0),
            totalRun: isBatsManRun(result) ? (onStrickPlayer?.totalRun || 0) + (result as number) : (onStrickPlayer?.totalRun || 0),
            boundryFour: result === 4 ? (onStrickPlayer?.boundryFour || 0) + 1 : (onStrickPlayer?.boundryFour || 0),
            boundrySix: result === 6 ? (onStrickPlayer?.boundrySix || 0) + 1 : (onStrickPlayer?.boundrySix || 0),
            status: result === 'Wicket' ? 'Out' : 'Not Out',
            hasStrike: result === 'Wicket' ? false : true
        })
        const idx = playres.findIndex((p:IPlayer)=>p.batingOrder===onStrickPlayer.batingOrder)
        if(idx>-1){
            playres[idx] = JSON.parse(JSON.stringify(onStrickPlayer));
        }
        if(isBatsManRun(result) && (result as number)/2!==0){
            changeStrick(_batingTeam);
            console.log(_batingTeam);
        }
        if(result === 'Wicket'){
            const nextOrder = (onStrickPlayer?.batingOrder||0)> (onNonStrickPlayer?.batingOrder||0)?(onStrickPlayer?.batingOrder||0):(onNonStrickPlayer?.batingOrder||0);
            _batingTeam.onStrickPlayer = selectBatsMan([...playres],nextOrder+1);
        }
        Object.assign(_batingTeam, {
            totalRun: result !== 'Wicket' ? (_batingTeam!.totalRun || 0) + run : (_batingTeam!.totalRun || 0),
            wicketFall: result === 'Wicket' ? (_batingTeam!.wicketFall || 0) + 1 : (_batingTeam!.wicketFall || 0),
            boundryFour: result === 4 ? (_batingTeam!.boundryFour || 0) + 1 : (_batingTeam!.boundryFour || 0),
            boundrySix: result === 6 ? (_batingTeam!.boundrySix || 0) + 1 : (_batingTeam!.boundrySix || 0),
            noBowls: result === 'No Bowl' ? (_batingTeam!.noBowls || 0) + 1 : (_batingTeam!.noBowls || 0),
            wideBowls: result === 'Wide Bowl' ? (_batingTeam!.wideBowls || 0) + 1 : (_batingTeam!.wideBowls || 0),
            extraRun: (result === 'No Bowl' || result === 'Wide Bowl') ? (_batingTeam!.extraRun || 0) + 1 : (_batingTeam!.extraRun || 0),
            playres: JSON.parse(JSON.stringify(playres)),
            onStrickPlayer: { ..._batingTeam.onStrickPlayer },
            onNonStrickPlayer: { ..._batingTeam.onNonStrickPlayer }
        });
        return _batingTeam
    }

    const changeStrick = (team: ITeam): ITeam => {
        const onStrickPlayer = JSON.parse(JSON.stringify(team.onStrickPlayer));
        const onNonStrickPlayer = JSON.parse(JSON.stringify(team.onNonStrickPlayer));
        return Object.assign(team, { onNonStrickPlayer: onStrickPlayer, onStrickPlayer: onNonStrickPlayer });
    }

    const startOver = (_batingTeam: ITeam, _bowlingTeam: ITeam): void => {
        let counter: number = 0;
        let _wicketDown: number = wicketsDown;
        const bowler = getBowler(_bowlingTeam.playres);
        let bowlerOver: IBowlerOver = {
            overNumber: getOverNumber(), totalRun: 0,
            boundryFour: 0, boundrySix: 0, wicketFall: 0, bowlResult: [], noBowls: 0, wideBowls: 0,
        }
        _bowlingTeam.currentBowler = bowler;
        const _over = over;
        const timer = setInterval(() => {
            const result: BowlResultType = hitBowl();
            const _bowlResults: BowlResultType[] = [0, 1, 2, 4, 5, 6, 'Wicket'];
            _over.push(result);
            if (result === 'Wicket') {
                _wicketDown++
                setWicketDown(_wicketDown);
            }
            bowlerOver = aggangeBowlerOver({ ...bowlerOver }, result, _over)
            _batingTeam = arrangeBatingTeam({ ..._batingTeam }, result)

            if (_bowlResults.findIndex((item: BowlResultType, idx: number) => item === result) > -1) {
                counter++;
                if (counter === 6) {
                    _batingTeam = changeStrick(_batingTeam);
                    counter = stopOver(_batingTeam, _bowlingTeam, bowlerOver, timer);
                }
            }
            if (_batingTeam.wicketFall === 10) {
                counter = stopOver(_batingTeam, _bowlingTeam, bowlerOver, timer);
            }

            setBatingTeam({ ..._batingTeam });
            setBowlingTeam({ ..._bowlingTeam });
            setBowlResult(result);
            setOver(_over);
            setBowlCounter(counter);
        }, 1000);
    }

    const stopOver = (_batingTeam: ITeam, _bowlingTeam: ITeam, bowlerOver: IBowlerOver, timer: NodeJS.Timeout) => {
        _batingTeam!.overs!.push({ bowlerName: _bowlingTeam.currentBowler?.name || '', ...bowlerOver });
        // _batingTeam.playres = JSON.parse(JSON.stringify([..._batingTeam.playres]));
        _bowlingTeam.playres.find((p: IPlayer) => p.name === _bowlingTeam.currentBowler?.name)?.overs?.push(bowlerOver);
        setNextInning(true);
        clearInterval(timer);
        return 0;
    }

    const nextOver = () => {
        over.length = 0;
        startOver({ ...batingTeam } as ITeam, { ...bowlingTeam } as ITeam);
    }

    if (!teamDetails) {
        return (<div> Please wait team ... </div>)
    }

    const avgRunRate = (): number | string => {
        const avgRR = ((batingTeam?.totalRun || 0) / (batingTeam?.overs?.length || 0))
        return (isNaN(avgRR) && !isFinite(avgRR)) ? 0 : avgRR.toFixed(2);
    }

    const matchStart = () => {
        setTeams({ ...teamDetails });
        setBatingTeam(JSON.parse(JSON.stringify( teamDetails.team_a) ));
        setBowlingTeam(JSON.parse(JSON.stringify(teamDetails.team_b)));
        startOver(JSON.parse(JSON.stringify(teamDetails.team_a)), JSON.parse(JSON.stringify(teamDetails.team_b)));
    }

    const nextInningStart = ()=>{
        setBatingTeam(JSON.parse(JSON.stringify( teamDetails.team_b) ));
        setBowlingTeam(JSON.parse(JSON.stringify(teamDetails.team_a)));
        startOver(JSON.parse(JSON.stringify(teamDetails.team_b)), JSON.parse(JSON.stringify(teamDetails.team_a)));
    }

    const nextOverButton = () => (<Button variant="contained" color="primary" onClick={nextOver}>Next Over</Button>)
    const nextInningButton = () => (<Button variant="contained" color="primary" onClick={nextInningStart}>Next Inning</Button>)

    if (!teams.team_a) {
        return (<Button variant="contained" color="primary" onClick={matchStart}>Match Start</Button>)
    }

    return (<div>
        {
            <ScoreCard teamName={batingTeam.name}
                run={batingTeam?.totalRun}
                wicket={batingTeam?.wicketFall}
                over={batingTeam?.overs?.length + '.' + bowlCounter}
                bowlerName={bowlingTeam.currentBowler?.name}
                isAvgRunRateDisplay={bowlCounter === 0}
                netRunRate={avgRunRate()}
                overBowlResults={over}
                strikeBatman={batingTeam.onStrickPlayer}
                nonStrikeBatman={batingTeam.onNonStrickPlayer}
            />
        }
        {(bowlCounter === 0 && batingTeam?.overs?.length !== matchOvers) ? nextOverButton() : ''}
        {batingTeam?.overs?.length === matchOvers ? nextInningButton() : ''}
    </div>
    )
}