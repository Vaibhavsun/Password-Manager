import stringSimilarity from "string-similarity";


const THRESHOLD = 0.3
function get_parsed_string(password){
    const password_arr = password.split("_");
    return {
        emailorUsername:password_arr[0],
        websiteorApp:password_arr[1],
        password:password_arr[2],
        id:password_arr[-1]
    }
}


export default function SearchConfidence(passwords, query) {
    const filteredPasswords = passwords.filter((v) => { 
        return v.toLowerCase().includes(query.toLowerCase())
     } )

     return filteredPasswords.map(get_parsed_string)
}