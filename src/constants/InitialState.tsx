import { ITeams } from "../interfaces";

export const playresIndia = ['Shikhar Dhawan','Cheteshwar Pujara','Virat Kohli','Kedar Jadhav',
'Shreyas Iyer','Manish Pandey','Bhuvneshwar Kumar','Jasprit Bumrah','Yuzvendra Chahal',
'Ravindra Jadeja','Ravichandran Ashwin'
]

export const playresEngland = ['Stuart Broad','Chris Woakes','Jos Buttler','Lewis Gregory',
'Jason Roy','James Vince','Matt Parkinson','Tom Banton','Ollie Pope',
'Moeen Ali','Jonny Bairstow'
]


export const initialState: ITeams  = {
    team_a: {
        name: 'India',
        playres: [],
        id: Math.floor(Math.random() * 100),
        totalRun: 0,
        overs: [],
        isInningCompleted: false
    },
    team_b: {
        name: 'England',
        playres: [ ],
        id: Math.floor(Math.random() * 100),
        totalRun: 0,
        overs: [],
        isInningCompleted: false
    } 
}
