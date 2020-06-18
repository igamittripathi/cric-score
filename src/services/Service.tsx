
export const saveTeamDetails=(payload:any):any =>{
   console.log(payload);
   return fetch("https://cric-score-ad64d.firebaseio.com//`teams.json",{method:'POST',body:JSON.stringify(payload)})
   .then(res=>res.json())
   .catch(ex=>{
       console.log(ex)
   })
}