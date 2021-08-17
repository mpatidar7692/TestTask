const setData=({data})=>{
    localStorage.setItem("Users", data)
}

const getData=({data})=>{
    return localStorage.getItem("Users")
}