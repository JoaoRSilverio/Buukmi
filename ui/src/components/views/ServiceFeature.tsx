import React from "react";
import {IServiceFeature} from "../../interfaces/interfaces";

const ServiceFeature:React.FC<IServiceFeature> = (props) => {
    const {
        title,description,
        basePrice,discountRateInPercentile,
        durationInS,featureRequests,
        icon,includedFeatureOptions,
        optionalFeatureOptions} = props;
    return (
        <>

        </>
    )
}