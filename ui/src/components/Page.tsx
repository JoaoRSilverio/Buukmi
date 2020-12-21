import {Box, Divider, Heading, VStack} from "@chakra-ui/react";
import React from "react";


const Page:React.FC<{title: string, children:any}> = (props)=>{
    return(
        <Box
            borderRadius={4}
            minW={350} minH={450}
            style={{borderColor:"grey",
                borderStyle:"solid",borderWidth:1}} p={8}>
            <Heading>{props.title}</Heading>
            <Divider />
            <VStack minW={350} p={8} spacing={8}>
                {props.children}
            </VStack>
        </Box>
    )
}
export default Page;