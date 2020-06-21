import React, { useState, FunctionComponent as FC, useEffect } from 'react';
import { BowlResults, BowlResultType, PlayerTypes } from '../constants';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ITeam, ITeams, IPlayer, IOver, IBowlerOver } from '../interfaces';

export const Match: FC = () => {
    const teamDetails = useSelector((state: any) => state.teams);
    const [teams, setTeams] = useState<ITeams>(teamDetails);

    const matchOvers: number = 10;
    let lastBowler: IPlayer;

    const [batingTeam, setBatingTeam] = useState<ITeam>();
    const [bowlingTeam, setBowlingTeam] = useState<ITeam>();
    const [bowlResult, setBowlResult] = useState<BowlResultType | ''>('');
    const [wicketsDown, setWicketDown] = useState<number>(0);
    const [over, setOver] = useState<BowlResultType[]>([]);
    const [extra, setExtra] = useState(0);
    const [bowlCounter, setBowlCounter] = useState<number>(0);


    useEffect(() => {
        console.log('change work');
        console.log('bating team---',batingTeam);
        console.log('bowling team--',bowlingTeam);
    }, [batingTeam])


    // const [totalRun, setTotalRun] = useState<number>(0);
    // const [over, setOver] = useState<Array<BowlResultType>>([]);
    // const [extra, setExtra] = useState(0);
    // const dispatch = useDispatch();

    // const startOver = () => {
    //     let counter = 0;
    //     const timer = setInterval(() => {
    //         let run = 0;
    //         const r: BowlResultType = BowlResults[Math.floor(Math.random() * BowlResults.length)] as BowlResultType;
    //         const _over = over;
    //         const _bowlResults: BowlResultType[] = [0, 1, 2, 4, 5, 6, 'Wicket'];
    //         if (_bowlResults.findIndex((item: BowlResultType, idx: number) => item == r) > -1) {
    //             counter++;
    //         }
    //         _over.push(r);
    //         if (isNumber(r) || r === 'No Bowl' || r === 'Wide Bowl') {
    //             run = (r == 'No Bowl' || r === 'Wide Bowl') ? 1 : r;
    //         }
    //         let _run = (totalRun + run);
    //         setTotalRun(_run);
    //         setBowlResult(r);
    //         setOver(_over);
    //         if (counter == 6) {
    //             clearInterval(timer);
    //         }
    //     }, 2 * 1000)
    // }

    // const selectBatsMan = (playres: IPlayer[]): IPlayer => {
    //     const player: IPlayer = playres.find((player: IPlayer) => (player!.status || player.status == 'Not Out') &&  ) as IPlayer;
    //     return player;
    // }

    // const selectBowler = (team: ITeam): IPlayer => {
    //     let player: IPlayer = team.playres.find((player: IPlayer) => {
    //         return player.type !== 'batsman'
    //     }) as IPlayer;
    //     return player;
    // }

    const hitBowl = (): BowlResultType => {
        return BowlResults[Math.floor(Math.random() * BowlResults.length)] as BowlResultType;
    }

    const getBowler = (players: IPlayer[]): IPlayer => {
        console.log(lastBowler?.name);
        const player:IPlayer = players.find((player: IPlayer) => (player.type === 'bowler' && player.name !== lastBowler?.name)) as IPlayer
        return player;
    }

    const startOver = (_batingTeam: ITeam, _bowlingTeam: ITeam): void => {
        let counter: number = 0;
        let _wicketDown: number = wicketsDown;
        const bowler = getBowler(_bowlingTeam.playres);
        console.table(bowler);
        lastBowler = { ...bowler };
        let bowlerOver:IBowlerOver= {
            overNumber: _batingTeam.overs?.length? 1 : (_batingTeam.overs?.length || 1)+1,
            totalRun: 0,
            boundryFour: 0,
            boundrySix: 0,
            wicketFall: 0,
            bowlResult: [],
            noBowls:0,
            wideBowls:0,
        }
        let currentOver: IOver = {
            bowlerName: lastBowler.name,
            ...bowlerOver
        }

        const _over = over;
        const timer = setInterval(() => {
            const result: BowlResultType = hitBowl();
            const _bowlResults: BowlResultType[] = [0, 1, 2, 4, 5, 6, 'Wicket'];
            let run = 0;
            _over.push(result);
            if (result !== 'Wicket') {
                _batingTeam.totalRun = !_batingTeam.totalRun ? 0 : _batingTeam.totalRun;
                run = (result === 'Wide Bowl' || result === 'No Bowl') ? 1 : result as number;
                _batingTeam.totalRun += run;
            } else {
                _wicketDown++
                setWicketDown(_wicketDown);
                _batingTeam!.wicketFall = _wicketDown;
            }
            Object.assign(bowlerOver, {
                totalRun: (bowlerOver!.totalRun || 0) + run,
                wicketFall: _wicketDown,
                bowlResult: [..._over],
                boundryFour: result === 4 ? (bowlerOver!.boundryFour || 0) + 1 : (bowlerOver!.boundryFour || 0),
                boundrySix: result === 6 ? (bowlerOver!.boundrySix || 0) + 1 : (bowlerOver!.boundrySix || 0),
                noBowls:result === 'No Bowl' ? (bowlerOver!.noBowls || 0) + 1 : (bowlerOver!.noBowls || 0),
                wideBowls:result === 'Wide Bowl' ? (bowlerOver!.noBowls || 0) + 1 : (bowlerOver!.noBowls || 0)
            })

            if (_bowlResults.findIndex((item: BowlResultType, idx: number) => item === result) > -1) {
                counter++;
                if (counter === 6) {
                    Object.assign(currentOver,{...bowlerOver})
                    _batingTeam!.overs!.push(currentOver);
                    _bowlingTeam.playres.find((p:IPlayer)=>p.name===lastBowler.name)?.overs?.push(bowlerOver);
                    counter = 0;
                    clearInterval(timer);
                }
            }

            setBatingTeam({ ..._batingTeam });
            setBowlingTeam({ ..._bowlingTeam });
            setBowlResult(result);
            setOver(_over);
            setBowlCounter(counter);
        }, 1000);
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
        console.log('over ended...')
    }

    if (!teams.team_a) {
        return (<Button variant="contained" color="primary" onClick={matchStart}>Match Start</Button>)
    }

    const nextOverButton = () => <Button variant="contained" color="primary" onClick={nextOver}>Next Over</Button>


    return (<div>
        <p>Score: {batingTeam?.totalRun || 0}/{batingTeam?.wicketFall || 0}</p>
        <p>Over: {batingTeam?.overs?.length + '.' + bowlCounter}</p>

        <br />
        {
            bowlCounter === 0 ? nextOverButton() : <h1>This Over</h1>
        }
        <br />
        {over.map((item: BowlResultType, idx: number) => <p key={idx}>{item}</p>)}
    </div>
    )
}