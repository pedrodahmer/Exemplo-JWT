import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { useRegisterMutation } from '../generated/graphql';

export const Register: React.FC<RouteComponentProps> = ({history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [register] = useRegisterMutation();
    
    return (
        <form onSubmit={async e => {
            e.preventDefault()

            console.log('form submitted')

            const response = await register({
                variables: {
                    email,
                    password
                }
            })

            console.log(response)

            history.push('/')
        }}>
            <div>
                <input 
                    value={email} 
                    placeholder="email" 
                    onChange={
                        e => {
                            setEmail(e.target.value)
                        }
                }/>

                <input 
                    type="password"
                    value={password} 
                    placeholder="password" 
                    onChange={
                        p => {
                            setPassword(p.target.value)
                        }
                }/>
            </div>

            <button  type="submit">register</button>
        </form>
    );
}