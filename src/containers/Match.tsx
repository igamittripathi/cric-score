import React, { useState, FunctionComponent as FC, useEffect } from 'react';
import { BowlResults, BowlResultType } from '../constants';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

export const Match: FC = () => {
    const [bowlResult, setBowlResult] = useState<BowlResultType>();
    const [totalRun, setTotalRun] = useState<number>(0);
    const [over, setOver] = useState<Array<BowlResultType>>([]);
    const [extra, setExtra] = useState(0);

    const teamsData = useSelector((state: any) => state.teams);
    console.log('team data', teamsData);
    const dispatch = useDispatch();

    const startOver = () => {
        let counter = 0;
        const timer = setInterval(() => {
            const r: BowlResultType = BowlResults[Math.floor(Math.random() * BowlResults.length)] as BowlResultType;
            const _over = over;
            const _bowlResults :BowlResultType[] = [0,1,2,4,5,6,'Wicket'];
             if(_bowlResults.findIndex((item:BowlResultType,idx:number)=>item==r)>-1){
                 counter++;
             }
            _over.push(r);
            setBowlResult(r);
            setOver(_over);
            if(counter==6){
                clearInterval(timer);
            }
        }, 2 * 1000)
    }

    const matchStart = () => {
        startOver()
    }

    return (<div>
        <Button variant="contained" color="primary" onClick={matchStart}>Match Start</Button>
        <Button variant="contained" color="primary" onClick={startOver}>Next Over</Button>
        <br />
        {bowlResult}
        <ul>
            {over.map((item: BowlResultType, idx) => <li key={idx}>{item}</li>)}
        </ul>
    </div>)
}