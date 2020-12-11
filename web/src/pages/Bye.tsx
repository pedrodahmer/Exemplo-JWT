import React from 'react'
import { useByeQuery } from '../generated/graphql';

interface ByeProps {

}

export const Bye: React.FC<ByeProps> = ({}) => {
    const {data, loading, error} = useByeQuery()    
    
    if(loading) {
        return <div>loading...</div>
    }    
    
    if(error) {
        console.log(error)
        return <div>An error has ocurred</div>
    }

    if(!data) {
        return <div>no data</div>
    }

    return (
    <div>{data.bye}</div>
    );
}