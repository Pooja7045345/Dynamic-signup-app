"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	RadioGroup,
	FormControlLabel,
	Radio,
	Box,
    Typography
} from "@material-ui/core";


const JsonData: any = {
	data: [
		{
			id: 1,
			name: "Full Name",
			fieldType: "TEXT",
			minLength: 1,
			maxLength: 100,
			defaultValue: "John Doe",
			required: true,
		},
		{
			id: 2,
			name: "Email",
			fieldType: "TEXT",
			minLength: 1,
			maxLength: 50,
			defaultValue: "hello@mail.com",
			required: true,
		},
		{
			id: 6,
			name: "Gender",
			fieldType: "LIST",
			defaultValue: 1,
			required: true,
			listOfValues1: ["Male", "Female", "Others"],
		},
		{
			id: 7,
			name: "Love React?",
			fieldType: "RADIO",
			defaultValue: 1,
			required: true,
			listOfValues1: ["Yes", "No"],
		},
	],
};

interface DynamicFormProps {
	setSignedUpUser: React.Dispatch<React.SetStateAction<Array<any>>>;
  }
  
const DynamicForm: React.FC<DynamicFormProps> = ({setSignedUpUser}) => {
    
    interface FieldDetails {
        name: string;
        minLength?: number;
        maxLength?: number;
      }
      const errorTextProvider = (details: FieldDetails): string => {
        const errorType: unknown = errors[details.name ?? '']?.type;
        if (errorType === "required") {
          return `${details.name} is required`;
        }
      
        if (errorType === "minLength" && typeof details.minLength === 'number') {
          return `${details.name} can have a minimum of ${details.minLength} characters`;
        }
      
        if (errorType === "maxLength" && typeof details.maxLength === 'number') {
          return `${details.name} can have a maximum of ${details.maxLength} characters`;
        }
        return '';
      };

    
      const onSubmit = (data: any) => {
		  try{
			let info = {};
			if(data.Email !== undefined){
				info = {...info, email: data.Email }
			}
			if(data['Full Name'] !== undefined || data['Name'] !== undefined){
				const name: string = data['Full Name'] !== undefined ? data['Full Name'] : data['Name'];
				info = {...info, name: name }
			}
			if(data['Gender'] !== undefined ){
				const gender: string = data['Gender'];
				info = {...info, gender: gender }
			}
			setSignedUpUser((prev: Array<{ name: string; email: string; gender: string }>) => [...prev, {...info, id: prev.length+1}]);
		  }catch(error){
			  console.log(error)
		  }
	
	};
	const { register, handleSubmit, setValue, formState: { errors }} = useForm();


	return (
        <Box className="insideWrapper">
            <Box className="headingStyle"> 
				<Typography variant="h4" > Join Us Today </Typography>
				<Typography variant="h6" className='colorWelcome'> Sign up now to become a member </Typography>
			</Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				{JsonData.data.map((field: any) => (
					<Box key={field.id}>
						{field.fieldType === "TEXT" && (
							<FormControl fullWidth className='marginTopCustom'>
								<TextField
									label={field.name}
									type="text"
									defaultValue={field.defaultValue}
                                    {...register(field.name, { required: field.required, minLength: field.minLength, maxLength: field.maxLength })}
                                    onChange={(e: any) => setValue(field.name, e.target.value )}
									error={!!errors[field.name]}
									helperText={ errors[field.name] && errorTextProvider(field)}
								/>
							</FormControl>
						)}
						{field.fieldType === "LIST" && (
							<FormControl fullWidth className='marginTopCustom'>
                                <InputLabel>{field.name}</InputLabel>
								<Select
                                  defaultValue={field.defaultValue == 1 && field.listOfValues1[0]}
                                    {...register(field.name, { required: field.required})}
									error={!!errors[field.name]}
                                    onChange={(e: any) => setValue(field.name, e.target.value )}
								>
									{field?.listOfValues1 !== undefined && field?.listOfValues1.length !== 0 && field.listOfValues1?.map((option: string) => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
                                    {field?.listOfValues1 === undefined ? <MenuItem key='10' value=''> No Records Found </MenuItem> : null}
								</Select>
							</FormControl>
						)}

						{field.fieldType === "RADIO" && (
							<FormControl fullWidth className='marginTopCustom'>
                              <Typography style={{fontSize: '15px',color: '#616161', marginTop: '12px'}}>{field.name}</Typography>
								<RadioGroup 
									row
                                    {...register(field.name)}
									defaultValue={field.defaultValue == 1 ? field.listOfValues1[0] : field.defaultValue}
                                    onChange={(e: any) => setValue(field.name, e.target.value )}>
									{field.listOfValues1?.map((option: string) => (
										<FormControlLabel
											key={option}
											value={option}
											control={<Radio />}
											label={option}
										/>
									))}
                                     {field?.listOfValues1 === undefined ? ' No Options Found': null}
								</RadioGroup>
							</FormControl>
						)}
					</Box>
				))}
				<Button type="submit" fullWidth variant="contained" className='marginTopCustom' size='small' color="primary">
					Submit
				</Button>
			</form>
		</Box>
	);
};

export default DynamicForm;
