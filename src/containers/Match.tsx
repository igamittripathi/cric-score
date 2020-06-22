import React, { useState, FunctionComponent as FC, useEffect } from 'react';
import { BowlResults, BowlResultType, PlayerTypes } from '../constants';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ITeam, ITeams, IPlayer, IOver, IBowlerOver } from '../interfaces';
import { ScoreCard } from '../components';

export const Match: FC = () => {
    const teamDetails = useSelector((state: any) => state.teams);
    const [teams, setTeams] = useState<ITeams>(teamDetails);

    const matchOvers: number = 10;

    const [batingTeam, setBatingTeam] = useState<ITeam>(teams.team_a);
    const [bowlingTeam, setBowlingTeam] = useState<ITeam>(teams.team_b);
    const [bowlResult, setBowlResult] = useState<BowlResultType | ''>('');
    const [wicketsDown, setWicketDown] = useState<number>(0);
    const [over, setOver] = useState<BowlResultType[]>([]);
    const [extra, setExtra] = useState(0);
    const [bowlCounter, setBowlCounter] = useState<number>(0);
    const [nextInning, setNextInning] = useState<boolean>(false)
    const [onStrike, setStrike] = useState<IPlayer>()
    const [onNonStrike, setNonStrike] = useState<IPlayer>()

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

    const selectBatsMan = (players: IPlayer[], isStrike?: boolean): IPlayer => {
        return players.find((player) => ((player.hasStrike === isStrike || !player.hasStrike) && (!player.status || player.status === 'Not Out'))) as IPlayer
    }

    const arrangeBatingTeam = (_batingTeam: ITeam, result: BowlResultType): ITeam => {
        const run = (result === 'Wide Bowl' || result === 'No Bowl') ? 1 : result as number;
        const { playres } = _batingTeam;
        const batManAtStrike: IPlayer = selectBatsMan(playres, true);
        setStrike(Object.assign(batManAtStrike, { hasStrike: true }))
        const batManAtNonStrike: IPlayer = selectBatsMan(_batingTeam.playres);
        setNonStrike(Object.assign(batManAtNonStrike, { hasStrike: false }));

        console.log(batManAtStrike,batManAtNonStrike)

        if (result >= 6) {
            Object.assign(batManAtStrike, {
                totalRun: (batManAtStrike!.totalRun || 0) + (result as number),
                boundryFour: result === 4 ? (batManAtStrike!.boundryFour || 0) + 1 : (batManAtStrike!.boundryFour || 0),
                boundrySix: result === 6 ? (batManAtStrike!.boundrySix || 0) + 1 : (batManAtStrike!.boundrySix || 0)
            })
        }
        if (result === 'Wicket') {
            batManAtStrike.status = 'Out'
        }
        if ([1, 3, 5].findIndex((r: number) => r === result) > -1) {
            if (_batingTeam.playres.find((p: IPlayer) => p.name === batManAtStrike.name)) {
                batManAtStrike.hasStrike = false
            }
            if (_batingTeam.playres.find((p: IPlayer) => p.name === batManAtNonStrike.name)) {
                batManAtNonStrike.hasStrike = true
            }
        }
        if (playres.length > 0) {
            playres.forEach((p: IPlayer, i: number) => {
                if (p.name === batManAtStrike.name) {
                    playres[i] = { ...batManAtStrike } as IPlayer
                }
            });
        }
        Object.assign(_batingTeam, {
            totalRun: result !== 'Wicket' ? (_batingTeam!.totalRun || 0) + run : (_batingTeam!.totalRun || 0),
            wicketFall: result === 'Wicket' ? (_batingTeam!.wicketFall || 0) + 1 : (_batingTeam!.wicketFall || 0),
            boundryFour: result === 4 ? (_batingTeam!.boundryFour || 0) + 1 : (_batingTeam!.boundryFour || 0),
            boundrySix: result === 6 ? (_batingTeam!.boundrySix || 0) + 1 : (_batingTeam!.boundrySix || 0),
            noBowls: result === 'No Bowl' ? (_batingTeam!.noBowls || 0) + 1 : (_batingTeam!.noBowls || 0),
            wideBowls: result === 'Wide Bowl' ? (_batingTeam!.wideBowls || 0) + 1 : (_batingTeam!.wideBowls || 0),
            extraRun: (result === 'No Bowl' || result === 'Wide Bowl') ? (_batingTeam!.extraRun || 0) + 1 : (_batingTeam!.extraRun || 0),
            playres: [...playres]
        })
        return _batingTeam
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
                    counter = stopOver(_batingTeam,_bowlingTeam,bowlerOver,timer);
                }
            }
            if (_batingTeam.wicketFall === 10) {
                counter = stopOver(_batingTeam,_bowlingTeam,bowlerOver,timer);
            }

            setBatingTeam({ ..._batingTeam });
            setBowlingTeam({ ..._bowlingTeam });
            setBowlResult(result);
            setOver(_over);
            setBowlCounter(counter);
        }, 1000);
    }

    const stopOver=(_batingTeam:ITeam,_bowlingTeam:ITeam,bowlerOver:IBowlerOver,timer:NodeJS.Timeout)=>{
        _batingTeam!.overs!.push({ bowlerName: _bowlingTeam.currentBowler?.name || '', ...bowlerOver });
        _batingTeam.playres = JSON.parse(JSON.stringify ([..._batingTeam.playres]));
        _bowlingTeam.playres.find((p:IPlayer)=>p.name===_bowlingTeam.currentBowler?.name)?.overs?.push(bowlerOver);
        setNextInning(true);
        clearInterval(timer);
        return 0;
    }

    const nextOver = () => {
        over.length = 0;
        startOver({ ...batingTeam } as ITeam, { ...bowlingTeam } as ITeam);
    }

    const matchStart = () => {
        setTeams({ ...teamDetails });
        setBatingTeam({ ...teamDetails.team_a });
        setBowlingTeam({ ...teamDetails.team_b });
        startOver({ ...teamDetails.team_a }, { ...teamDetails.team_b });
    }

    if (!teamDetails) {
        return (<div> Please wait team ... </div>)
    }

    const avgRunRate = (): number | string => {
        const avgRR = ((batingTeam?.totalRun || 0) / (batingTeam?.overs?.length || 0))
        return (isNaN(avgRR) && !isFinite(avgRR)) ? 0 : avgRR.toFixed(2);
    }

    if (!teams.team_a) {
        return (<Button variant="contained" color="primary" onClick={matchStart}>Match Start</Button>)
    }

    const nextOverButton = () => <Button variant="contained" color="primary" onClick={nextOver}>Next Over</Button>

    return (<div>

        {
            // bowlCounter === 0 ? nextOverButton() :
            <ScoreCard teamName={batingTeam.name}
                run={batingTeam?.totalRun}
                wicket={batingTeam?.wicketFall}
                over={batingTeam?.overs?.length + '.' + bowlCounter}
                bowlerName={bowlingTeam.currentBowler?.name}
                isAvgRunRateDisplay={bowlCounter === 0}
                netRunRate={avgRunRate()}
                overBowlResults={over} />
        }
        {bowlCounter === 0 ? nextOverButton() : ''}
    </div>
    )
}