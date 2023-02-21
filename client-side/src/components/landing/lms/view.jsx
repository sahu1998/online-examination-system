import React from "react";
import { useNavigate } from "react-router-dom";
const View=({viewData})=>{
    const history=useNavigate();
    console.log("viewData========",viewData);
return(
    <div>
      {  viewData.map((row,index)=>{
return <div>
<p>{row.viewName}</p>
</div>
        })}
        <p onClick={()=>{history("/lms")}}>pre</p>
    </div>
)
}
export default View;