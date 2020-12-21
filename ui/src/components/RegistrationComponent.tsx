import React from "react";
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    VStack,
    HStack,
    Button,
    FormHelperText, Divider} from "@chakra-ui/react";
import {doRegister} from "../actions/ActionCreators"
import axios from "axios";
import {IRegistrationResponse} from "../interfaces/dtos";
import IAppState from "../interfaces/state/AppState";

interface IRegistrationComponentState {
    name: string;
    password: string;
    username: string;
    phoneNr: string;
    email: string;
    firstName: string;
    lastName: string;
}

enum FIELDS {
    PASSWORD = "password",
    PHONE_NUMBER = "phoneNr",
    USERNAME = "username",
    NAME = "name",
    EMAIL = "email",
    FIRST_NAME = "firstName",
    LAST_NAME = "lastName"
}

export default class RegistrationComponent extends React.Component<any, IRegistrationComponentState>{
    constructor(props: any) {
        super(props);
        this.state ={
            name:"",
            password:"",
            username:"",
            phoneNr:"",
            email:"",
            firstName:"",
            lastName:""
        }
    }
    render(){
        const {name, password, username, phoneNr, email, firstName,lastName}= this.state;
        return(
            <VStack w={340} p={8} spacing={8}>
            <FormControl  id="phoneNr">
                <FormLabel>Phone Nr</FormLabel>
                <InputGroup>
                    <InputLeftAddon children={"+352"} />
                    <Input
                        value={phoneNr}
                        onChange={(event)=> this.handleInput(event.target.value, FIELDS.PHONE_NUMBER)}
                        type={"phone"}
                        placeholder={"phone number"} />
                </InputGroup>
                <FormHelperText>we wont share this info</FormHelperText>
            </FormControl>
            <FormControl  id="firstName">
                    <FormLabel>First name</FormLabel>
                    <InputGroup>
                        <Input
                            value={firstName}
                            onChange={(event)=> this.handleInput(event.target.value, FIELDS.FIRST_NAME)}
                            type={"text"}
                            placeholder={"add your first name"} />
                    </InputGroup>
                    <FormHelperText>please insert your first name</FormHelperText>
                </FormControl>
            <FormControl  id="lastName">
                    <FormLabel>Last name</FormLabel>
                    <InputGroup>
                        <Input
                            value={lastName}
                            onChange={(event)=> this.handleInput(event.target.value, FIELDS.LAST_NAME)}
                            type={"text"}
                            placeholder={"add your last name"} />
                    </InputGroup>
                    <FormHelperText>please insert your last name</FormHelperText>
                </FormControl>
            <FormControl  id="password">
                    <FormLabel>Insert your password</FormLabel>
                    <InputGroup>
                        <InputLeftAddon children={"pwd"} />
                        <Input
                            value={password}
                            onChange={(event)=> this.handleInput(event.target.value, FIELDS.PASSWORD)}
                            type={"password"}
                            placeholder={"password"} />
                    </InputGroup>
                    <FormHelperText>please insert your password</FormHelperText>
                </FormControl>
            <FormControl  id="email">
                    <FormLabel>Insert your email</FormLabel>
                    <InputGroup>
                        <InputLeftAddon children={"@"} />
                        <Input
                            value={email}
                            onChange={(event)=> this.handleInput(event.target.value, FIELDS.EMAIL)}
                            type={"email"}
                            placeholder={"email@provider.com"} />
                    </InputGroup>
                    <FormHelperText>please insert your email</FormHelperText>
                </FormControl>
            <Button onClick={ () =>this.submit()} >Register</Button>
            </VStack>
        )
    }
    async submit(){
        console.log("btn pressed");
        doRegister(this.state)
    }
    handleInput(text: string, field: FIELDS){
        switch (field){
            case FIELDS.NAME:
            case FIELDS.PASSWORD:
            case FIELDS.PHONE_NUMBER:
            case FIELDS.USERNAME:
            case FIELDS.EMAIL:
            case FIELDS.LAST_NAME:
            case FIELDS.FIRST_NAME:
                //@ts-ignore
                this.setState({
                    [field]: text
                })
                break;
            default:
        }

    }
}