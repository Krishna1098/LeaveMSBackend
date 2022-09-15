import React,{Component} from 'react';
import one from './one.jpg';

export class Home extends Component{
    render(){
        return(
            <div>
                <img src={one} alt="image" height={700} width={1300}/>
            </div>
        )
    }
}