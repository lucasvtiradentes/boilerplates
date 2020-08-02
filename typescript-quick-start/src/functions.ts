// #####################################################################################################################

   interface Person {
      name: string,
      age: number,
      job: Enterprise
   }

   interface Enterprise {
      salary: number, 
      enterprise: string
   }

// #####################################################################################################################

   const username: string = getUsername();
   const age: number = 54;

// #####################################################################################################################

   function getUsername(): string{
      return 'lucas';
   }

   function showPerson(person: Person){
      console.log(person.name);
      console.log(person.age);
      console.log(person.job);
   }
   
// #####################################################################################################################

   export default {
      showPerson,
      username,
      age
   };

// #####################################################################################################################