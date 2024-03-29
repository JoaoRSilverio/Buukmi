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
    Button,
    FormHelperText, Divider} from "@chakra-ui/react";
import {doLogin} from "../actions/ActionCreators";
import {connect} from "react-redux";
import {ILoginData} from "../actions/ActionInterfaces";
enum FIELDS {
    PASSWORD = "password",
    PHONE_NUMBER = "phoneNr",
    USERNAME = "username",
    NAME = "name",
    EMAIL = "email",
    FIRST_NAME = "firstName",
    LAST_NAME = "lastName"
}
interface LoginComponentState {
    phoneNr: string;
    password: string
}
export interface ILoginComponentProps {
   doLogin:(loginData:ILoginData)=> void;
}
class LoginComponent extends React.Component<ILoginComponentProps, LoginComponentState>{
    constructor(props:any) {
        super(props);
        this.state = {
            phoneNr:"",
            password:"",
        }
    }

    render(){
        const {phoneNr, password} = this.state
        return (
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
                <Button onClick={ () =>this.submit()} >Login</Button>
            </VStack>

        )
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
    submit(){
        const {phoneNr, password} = this.state;
        this.props.doLogin({phoneNr,password});
    }
}
const mapDispatchToProps = { doLogin }
export default connect(
    undefined,
    mapDispatchToProps
)(LoginComponent);
