
export const saveTeamDetails=(payload:any):any =>{
   console.log(payload);
   return fetch("https://cric-score-ad64d.firebaseio.com//teams.json",{method:'POST',body:JSON.stringify(payload)})
   .then(res=>{
       console.log(res);
       return res.json()
    })
   .then(resp=>{
       console.log(resp);
       return resp
    })
   .catch(ex=>{
       console.log(ex)
   })
}