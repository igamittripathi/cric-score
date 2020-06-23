import React, { useState, FunctionComponent as FC, useEffect } from 'react';
import { BowlResults, BowlResultType } from '../constants';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { ITeam, ITeams, IPlayer, IOver, IBowlerOver } from '../interfaces';
import { ScoreCard, Cricle } from '../components';

export const Match: FC = () => {
    const teamDetails = useSelector((state: any) => state.teams);
    const [teams, setTeams] = useState<ITeams>(teamDetails);

    const matchOvers: number = 2;

    const [batingTeam, setBatingTeam] = useState<ITeam>(teams.team_a);
    const [bowlingTeam, setBowlingTeam] = useState<ITeam>(teams.team_b);
    const [bowlResult, setBowlResult] = useState<BowlResultType | ''>('');
    const [wicketsDown, setWicketDown] = useState<number>(0);
    const [over, setOver] = useState<BowlResultType[]>([]);
    const [bowlCounter, setBowlCounter] = useState<number>(0);
    const [isFirstInningEnd, setFirstInningEnded] = useState<boolean>(false)
    const [nextInningEnd, setNextInningEnd] = useState<boolean>(false)

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
        const run = (result === 'WB' || result === 'NB') ? 1 : result as number;
        return Object.assign(bowlerOver, {
            totalRun: result !== 'Wt' ? (bowlerOver!.totalRun || 0) + run : (bowlerOver!.totalRun || 0),
            wicketFall: result === 'Wt' ? (bowlerOver!.wicketFall || 0) + 1 : (bowlerOver!.wicketFall || 0),
            bowlResult: [..._over],
            boundryFour: result === 4 ? (bowlerOver!.boundryFour || 0) + 1 : (bowlerOver!.boundryFour || 0),
            boundrySix: result === 6 ? (bowlerOver!.boundrySix || 0) + 1 : (bowlerOver!.boundrySix || 0),
            noBowls: result === 'NB' ? (bowlerOver!.noBowls || 0) + 1 : (bowlerOver!.noBowls || 0),
            wideBowls: result === 'WB' ? (bowlerOver!.noBowls || 0) + 1 : (bowlerOver!.noBowls || 0)
        })
    }

    const selectBatsMan = (players: IPlayer[], batingOrder: number): IPlayer => {
        return JSON.parse(JSON.stringify(players.find((p: IPlayer) => p.batingOrder === batingOrder))) as IPlayer
    }

    const isBatsManRun = (result: BowlResultType): boolean => {
        return (result === 'WB' || result === 'Wt' || result === 'NB') ? false : true
    }


    const arrangeBatingTeam = (_batingTeam: ITeam, result: BowlResultType): ITeam => {
        const run = (result === 'WB' || result === 'NB') ? 1 : result as number;
        const { playres } = JSON.parse(JSON.stringify(_batingTeam));
        if (!_batingTeam.onStrickPlayer) {
            _batingTeam.onStrickPlayer = selectBatsMan([...playres], 0);
            _batingTeam.onNonStrickPlayer = selectBatsMan([...playres], 1);
        }
        const { onStrickPlayer, onNonStrickPlayer } = _batingTeam;
        Object.assign(onStrickPlayer, {
            bowlPlayed: result !== 'WB' ? (onStrickPlayer?.bowlPlayed || 0) + 1 : (onStrickPlayer?.bowlPlayed || 0),
            totalRun: isBatsManRun(result) ? (onStrickPlayer?.totalRun || 0) + (result as number) : (onStrickPlayer?.totalRun || 0),
            boundryFour: result === 4 ? (onStrickPlayer?.boundryFour || 0) + 1 : (onStrickPlayer?.boundryFour || 0),
            boundrySix: result === 6 ? (onStrickPlayer?.boundrySix || 0) + 1 : (onStrickPlayer?.boundrySix || 0),
            status: result === 'Wt' ? 'Out' : 'Not Out',
            hasStrike: result === 'Wt' ? false : true
        })
        const idx = playres.findIndex((p: IPlayer) => p.batingOrder === onStrickPlayer.batingOrder)
        if (idx > -1) {
            playres[idx] = JSON.parse(JSON.stringify(onStrickPlayer));
        }
        if (isBatsManRun(result) && (result as number) / 2 !== 0) {
            rotateStrike(_batingTeam);
            console.log(_batingTeam);
        }
        if (result === 'Wt') {
            const nextOrder = (onStrickPlayer?.batingOrder || 0) > (onNonStrickPlayer?.batingOrder || 0) ? (onStrickPlayer?.batingOrder || 0) : (onNonStrickPlayer?.batingOrder || 0);
            _batingTeam.onStrickPlayer = selectBatsMan([...playres], nextOrder + 1);
        }
        Object.assign(_batingTeam, {
            totalRun: result !== 'Wt' ? (_batingTeam!.totalRun || 0) + run : (_batingTeam!.totalRun || 0),
            wicketFall: result === 'Wt' ? (_batingTeam!.wicketFall || 0) + 1 : (_batingTeam!.wicketFall || 0),
            boundryFour: result === 4 ? (_batingTeam!.boundryFour || 0) + 1 : (_batingTeam!.boundryFour || 0),
            boundrySix: result === 6 ? (_batingTeam!.boundrySix || 0) + 1 : (_batingTeam!.boundrySix || 0),
            noBowls: result === 'NB' ? (_batingTeam!.noBowls || 0) + 1 : (_batingTeam!.noBowls || 0),
            wideBowls: result === 'WB' ? (_batingTeam!.wideBowls || 0) + 1 : (_batingTeam!.wideBowls || 0),
            extraRun: (result === 'NB' || result === 'WB') ? (_batingTeam!.extraRun || 0) + 1 : (_batingTeam!.extraRun || 0),
            playres: JSON.parse(JSON.stringify(playres)),
            onStrickPlayer: { ..._batingTeam.onStrickPlayer },
            onNonStrickPlayer: { ..._batingTeam.onNonStrickPlayer }
        });
        return _batingTeam
    }

    const rotateStrike = (team: ITeam): ITeam => {
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
            setBowlResult(result);
            const _bowlResults: BowlResultType[] = [0, 1, 2, 4, 5, 6, 'Wt'];
            _over.push(result);
            if (result === 'Wt') {
                _wicketDown++
                setWicketDown(_wicketDown);
            }
            bowlerOver = aggangeBowlerOver({ ...bowlerOver }, result, _over)
            _batingTeam = arrangeBatingTeam({ ..._batingTeam }, result)

            if (_bowlResults.findIndex((item: BowlResultType, idx: number) => item === result) > -1) {
                counter++;
                if (counter === 6) {
                    _batingTeam = rotateStrike(_batingTeam);
                    counter = stopOver(_batingTeam, _bowlingTeam, bowlerOver, timer);
                }
            }
           
            if (_batingTeam.wicketFall === 10) {
                counter = stopOver(_batingTeam, _bowlingTeam, bowlerOver, timer);
                _batingTeam.isInningCompleted = true;
            }
            if(_bowlingTeam.isInningCompleted && calculateResult().name===_batingTeam.name){
                _batingTeam.isInningCompleted = true;
                clearInterval(timer);
            }
            setBatingTeam({ ..._batingTeam });
            setBowlingTeam({ ..._bowlingTeam });

            setOver(_over);
            setBowlCounter(counter);
        }, 1000);
    }

    const stopOver = (_batingTeam: ITeam, _bowlingTeam: ITeam, bowlerOver: IBowlerOver, timer: NodeJS.Timeout) => {
        _batingTeam!.overs!.push({ bowlerName: _bowlingTeam.currentBowler?.name || '', ...bowlerOver });
        _batingTeam.isInningCompleted = (_batingTeam!.overs?.length === matchOvers)
        // _batingTeam.playres = JSON.parse(JSON.stringify([..._batingTeam.playres]));
        _bowlingTeam.playres.find((p: IPlayer) => p.name === _bowlingTeam.currentBowler?.name)?.overs?.push(bowlerOver);

        clearInterval(timer);
        return 0;
    }

    const nextOver = (): void => {
        over.length = 0;
        startOver({ ...batingTeam } as ITeam, { ...bowlingTeam } as ITeam);
    }

    const avgRunRate = (): number | string => {
        const avgRR = ((batingTeam?.totalRun || 0) / (batingTeam?.overs?.length || 0))
        return (isNaN(avgRR) && !isFinite(avgRR)) ? 0 : avgRR.toFixed(2);
    }

    const matchStart = (): void => {
        setTeams({ ...teamDetails });
        setBatingTeam(JSON.parse(JSON.stringify(teamDetails.team_a)));
        setBowlingTeam(JSON.parse(JSON.stringify(teamDetails.team_b)));
        startOver(JSON.parse(JSON.stringify(teamDetails.team_a)), JSON.parse(JSON.stringify(teamDetails.team_b)));
    }

    const nextInningStart = (): void => {
        over.length = 0;
        teamDetails.team_a = JSON.parse(JSON.stringify(batingTeam));
        teamDetails.team_b = JSON.parse(JSON.stringify(bowlingTeam));
        setFirstInningEnded(true);
        setBatingTeam(JSON.parse(JSON.stringify(teamDetails.team_b)));
        setBowlingTeam(JSON.parse(JSON.stringify(teamDetails.team_a)));
        startOver(JSON.parse(JSON.stringify(teamDetails.team_b)), JSON.parse(JSON.stringify(teamDetails.team_a)));
    }

    const nextOverButton = (): JSX.Element => (<Button variant="contained" color="primary" onClick={nextOver}>Next Over</Button>)
    const nextInningButton = (): JSX.Element => (<Button variant="contained" color="primary" onClick={nextInningStart}>Next Inning</Button>)

    const remaningBowl = (): number => {
        console.log('batingTeam', batingTeam)
        console.log('bowlingTeam', bowlingTeam)
        return (matchOvers * 6) - (((batingTeam?.overs?.length || 0) * 6) + bowlCounter)
    }

    if (!teams.team_a) {
        return (<Button variant="contained" color="primary" onClick={matchStart}>Match Start</Button>)
    }

    const calculateResult = ():ITeam => {
        return (batingTeam.totalRun || 0) > (bowlingTeam.totalRun || 0) ? batingTeam : bowlingTeam;
    }

    if (batingTeam.isInningCompleted && bowlingTeam.isInningCompleted) {
    return (<div>Result: {calculateResult().name} win</div>)
    }

    return (<div>
        <Cricle result={bowlResult} />
        <ScoreCard teamName={batingTeam.name}
            run={batingTeam?.totalRun}
            totalOver={matchOvers}
            wicket={batingTeam?.wicketFall}
            over={batingTeam?.overs?.length + '.' + bowlCounter}
            remaningBowl={remaningBowl()}
            bowlerName={bowlingTeam.currentBowler?.name}
            isAvgRunRateDisplay={bowlCounter === 0}
            netRunRate={avgRunRate()}
            overBowlResults={over}
            strikeBatman={batingTeam.onStrickPlayer}
            nonStrikeBatman={batingTeam.onNonStrickPlayer}
        />
        {(bowlCounter === 0 && !batingTeam.isInningCompleted) ? nextOverButton() : ''}
        {batingTeam.isInningCompleted ? nextInningButton() : ''}

    </div>
    )
}