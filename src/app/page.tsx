"use client";

import React, {useState} from "react";
import {
	Box, 
  Typography
} from "@material-ui/core";
import DynamicForm from '../../Components/dynamicForm';

interface User {
  // Replace with the actual properties of a user
  name: string;
  email: string;
  gender: string;
}

const Home = () => {
 const [signedUpUser , setSignedUpUser] = useState<Array<User>>([]);
 console.log(signedUpUser, 'signedUpUser');
  return (
    <Box className='containerStyle'>
      <DynamicForm  setSignedUpUser={setSignedUpUser} />
      <Box className="insideWrapper ">
        <Typography variant="h6" className='colorWelcome'> Sign Up List </Typography>
        <Box overflow='auto' height="400px"> 
        {
           signedUpUser.map((data,i) =>{
            return <Box  key={i} className='colorWelcome'>
             {`( ${i+1} )  Name: ${data?.name} Email : ${data?.email}  Joined`}
               </Box> 
          })   
        }
        </Box> 
      </Box>
    </Box>
  );
};

export default Home;



