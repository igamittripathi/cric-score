import React, { useState, FunctionComponent as FC, useEffect } from 'react';
import { BowlResults, BowlResultType } from '../constants';
import { Button, Card, CardContent, Typography, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { ITeam, ITeams, IPlayer, IOver, IBowlerOver } from '../interfaces';
import { ScoreCard, Cricle } from '../components';
import { UpdateTeams, GetTeams } from '../actions';
import { useHistory, Link } from "react-router-dom";
import classes from '*.module.css';

export const Match: FC = () => {
    const teamDetails = useSelector((state: any) => state.teams);
    const dispatch = useDispatch();
    const history = useHistory();
    const matchOvers: number = 1;

    const [batingTeam, setBatingTeam] = useState<ITeam>();
    const [bowlingTeam, setBowlingTeam] = useState<ITeam>();
    const [bowlResult, setBowlResult] = useState<BowlResultType | ''>('');
    const [wicketsDown, setWicketDown] = useState<number>(0);
    const [over, setOver] = useState<BowlResultType[]>([]);
    const [bowlCounter, setBowlCounter] = useState<number>(0);
    const [isMatchCompleted, setmatchCompleted] = useState<boolean>(false)

    React.useEffect(() => {
        dispatch(GetTeams());
    }, []);

    React.useEffect(() => {
        if (Object.keys(teamDetails).length) {
            if (teamDetails.team_a.isInningCompleted) {
                setBatingTeam(teamDetails.team_b)
                setBowlingTeam(teamDetails.team_a)
            } else {
                setBatingTeam(teamDetails.team_a)
                setBowlingTeam(teamDetails.team_b)
            }
            if (teamDetails.team_a.isInningCompleted && teamDetails.team_b.isInningCompleted) {
                setmatchCompleted(true);
            }
        }
    }, [teamDetails]);


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
            totalRun: result !== 'Wt' ? (bowlerOver.totalRun || 0) + run : (bowlerOver.totalRun || 0),
            wicketFall: result === 'Wt' ? (bowlerOver.wicketFall || 0) + 1 : (bowlerOver.wicketFall || 0),
            bowlResult: [..._over],
            boundryFour: result === 4 ? (bowlerOver.boundryFour || 0) + 1 : (bowlerOver.boundryFour || 0),
            boundrySix: result === 6 ? (bowlerOver.boundrySix || 0) + 1 : (bowlerOver.boundrySix || 0),
            noBowls: result === 'NB' ? (bowlerOver.noBowls || 0) + 1 : (bowlerOver.noBowls || 0),
            wideBowls: result === 'WB' ? (bowlerOver.wideBowls || 0) + 1 : (bowlerOver.wideBowls || 0)
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
            totalRun: result !== 'Wt' ? (_batingTeam.totalRun || 0) + run : (_batingTeam.totalRun || 0),
            wicketFall: result === 'Wt' ? (_batingTeam.wicketFall || 0) + 1 : (_batingTeam.wicketFall || 0),
            boundryFour: result === 4 ? (_batingTeam.boundryFour || 0) + 1 : (_batingTeam.boundryFour || 0),
            boundrySix: result === 6 ? (_batingTeam.boundrySix || 0) + 1 : (_batingTeam.boundrySix || 0),
            noBowls: result === 'NB' ? (_batingTeam.noBowls || 0) + 1 : (_batingTeam.noBowls || 0),
            wideBowls: result === 'WB' ? (_batingTeam.wideBowls || 0) + 1 : (_batingTeam.wideBowls || 0),
            extraRun: (result === 'NB' || result === 'WB') ? (_batingTeam.extraRun || 0) + 1 : (_batingTeam.extraRun || 0),
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
                const idx = _bowlingTeam.playres.findIndex((p: IPlayer) => p.name === bowler.name)
                const wickets = _bowlingTeam.playres[idx].wickets || 0
                if (wickets === 0) {
                    _bowlingTeam.playres[idx].wickets = 0;
                }
                if (_bowlingTeam.playres[idx].wickets)
                    _bowlingTeam.playres[idx] = { ..._bowlingTeam.playres[idx], wickets: (wickets + 1) }
            }
            bowlerOver = aggangeBowlerOver({ ...bowlerOver }, result, _over);
            _batingTeam = arrangeBatingTeam({ ..._batingTeam }, result)
            let isSaveRecord = false;
            if (_bowlResults.findIndex((item: BowlResultType, idx: number) => item === result) > -1) {
                counter++;
                if (counter === 6) {
                    _batingTeam = rotateStrike(_batingTeam);
                    counter = stopOver(_batingTeam, _bowlingTeam, bowlerOver, timer);
                    isSaveRecord = true;
                }
            }

            if (_batingTeam.wicketFall === 10) {
                counter = stopOver(_batingTeam, _bowlingTeam, bowlerOver, timer);
                _batingTeam.isInningCompleted = true;
                isSaveRecord = true;
            }

            if (_bowlingTeam.isInningCompleted && calculateResult(_batingTeam as ITeam,_bowlingTeam as ITeam).name === _batingTeam.name) {
                _batingTeam.isInningCompleted = true;
                _bowlingTeam.isInningCompleted=true;
                isSaveRecord = true;
                stopOver(_batingTeam, _bowlingTeam, bowlerOver, timer);
            }
            setBatingTeam({ ..._batingTeam });
            setBowlingTeam({ ..._bowlingTeam });
            setOver(_over);
            setBowlCounter(counter);
            if (isSaveRecord) {
                if (!_bowlingTeam.isInningCompleted) {
                    dispatch(UpdateTeams({ team_a: _batingTeam, team_b: _bowlingTeam }))
                }
                else {
                    dispatch(UpdateTeams({ team_a: _bowlingTeam, team_b: _batingTeam }))
                }
            }
        }, 1000);
    }

    const stopOver = (_batingTeam: ITeam, _bowlingTeam: ITeam, bowlerOver: IBowlerOver, timer: NodeJS.Timeout) => {
        if (_batingTeam!.overs == undefined) {
            _batingTeam!.overs = [];
        }
        _batingTeam!.overs.push({ bowlerName: _bowlingTeam.currentBowler?.name || '', ...bowlerOver })
        console.log(_batingTeam!.overs)
        _batingTeam.isInningCompleted = (_batingTeam!.overs?.length === matchOvers)
        // _batingTeam.playres = JSON.parse(JSON.stringify([..._batingTeam.playres]));
        const idx: number = _bowlingTeam.playres.findIndex((p: IPlayer) => p.name === _bowlingTeam.currentBowler?.name);
        if (idx > -1 && _bowlingTeam.playres[idx].overs === undefined) {
            _bowlingTeam.playres[idx] = { ..._bowlingTeam.playres[idx], overs: [bowlerOver] }
        }
        else {
            _bowlingTeam.playres[idx]?.overs.push(bowlerOver);
        }

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
        startOver(JSON.parse(JSON.stringify(teamDetails.team_a)), JSON.parse(JSON.stringify(teamDetails.team_b)));
    }

    const nextInningStart = (): void => {
        over.length = 0;
        teamDetails.team_a = JSON.parse(JSON.stringify(batingTeam));
        teamDetails.team_b = JSON.parse(JSON.stringify(bowlingTeam));
        setBatingTeam(JSON.parse(JSON.stringify(teamDetails.team_b)));
        setBowlingTeam(JSON.parse(JSON.stringify(teamDetails.team_a)));
        startOver(JSON.parse(JSON.stringify(teamDetails.team_b)), JSON.parse(JSON.stringify(teamDetails.team_a)));
    }

    const nextOverButton = (): JSX.Element => (<Button variant="contained" color="primary" onClick={nextOver}>Start Over</Button>)
    const nextInningButton = (): JSX.Element => (<Button variant="contained" color="primary" onClick={nextInningStart}>Next Inning</Button>)

    const remaningBowl = (): number => {
        return (matchOvers * 6) - (((batingTeam?.overs?.length || 0) * 6) + bowlCounter)
    }

    const calculateResult = (_batingTeam:ITeam,_bowlingTeam:ITeam): ITeam => {
        return (_batingTeam!.totalRun || 0) > (_bowlingTeam!.totalRun || 0) ? _batingTeam! : _bowlingTeam!;
    }
    const declareResult = (): string => {
        const runA = (batingTeam!.totalRun || 0);
        const runB = (bowlingTeam!.totalRun || 0);
        if(runA > runB){
            return `${batingTeam!.name} beat  ${bowlingTeam!.name} by ${10 - (batingTeam!.wicketFall || 0)} wickets`; 
        }
        if(runA < runB){
          return  `${bowlingTeam!.name} beat ${batingTeam!.name} by ${runB - runA} runs`;
        }
        return  'Match tie'
    }

    if (!batingTeam) {
        return (<CircularProgress />)
    }

    if (!isMatchCompleted) {
        return (
            <div>
                <Cricle result={bowlResult} />
                <ScoreCard teamName={batingTeam.name}
                    run={batingTeam!.totalRun}
                    totalOver={matchOvers}
                    wicket={batingTeam!.wicketFall}
                    over={(batingTeam!.overs?.length || 0) + '.' + bowlCounter}
                    remaningBowl={remaningBowl()}
                    bowlerName={bowlingTeam!.currentBowler}
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

    return (
        <div>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {declareResult()}
                    </Typography>
                </CardContent>
            </Card>
            <Button variant="contained" color="primary" onClick={(e) => { history.push('/scorecard') }}>
                Batting Score Card
            </Button>
        </div>
    )
}