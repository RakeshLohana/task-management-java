const person={
  name:"Rakesh",
  address:{
    line:"room no  129 MBQ2 boys hostel",
    city:"Karachi",
    country:"Pakistan"
  },
  profiles:["twitter","instagram","facebook"],
  printProfiles:()=>{
    person.profiles.map(
      (profil)=>console.log(profil)
    )

  }


}


export default function LearningJavaScript(){

    return(
        <>
        <div> {person.name}</div>
        <div> {person.address.line}</div>
        <div> {person.address.city}</div>
        <div> {person.address.country}</div>
        <div> {person.printProfiles()}</div>









      </>



    );

}