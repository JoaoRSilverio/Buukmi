import React from "react";
import {
    Box,
    Heading,
    VStack,
    Text,
    Stat,
    StatLabel,
    Divider} from "@chakra-ui/react";
import {IUserProfile} from "../interfaces/interfaces";
import IAppState from "../interfaces/state/AppState";
import {connect} from "react-redux";

interface IProfileComponentState{
}

interface IProfileComponentProps{
    profile?: IUserProfile;
}

export class ProfileComponent extends React.Component<IProfileComponentProps, IProfileComponentState>{
    constructor(props: IProfileComponentProps) {
        super(props);
        this.state = {}

    }
    render(){
        const {profile} = this.props;
        return(
            <Box p={8}>
                <Heading>Profile</Heading>
                <Divider />
            <VStack p={8} align={"left"}>
                {profile && Object.keys(profile).map(
                    (infoLine:string) =>
                            <Stat key={infoLine}>
                                <StatLabel>{infoLine}</StatLabel>
                                {/*@ts-ignore */}
                                <Text fontSize={"3xl"} >{profile[infoLine]}</Text>
                            </Stat>
                        )}
            </VStack>
            </Box>
        )
    }

}

const mapStateToProps = (state:IAppState):IProfileComponentProps => {
    return {
        profile: state.Profile.activeProfile
    }
}
export default connect(
    mapStateToProps,
    undefined
)(ProfileComponent);