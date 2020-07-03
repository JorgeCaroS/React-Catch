import React from 'react';
import PropTypes from "prop-types";
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from "./Fish";
import base from "../base";

class App extends React.Component{

    state = {
        fishes:{},
        order:{}
    }

    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount(){
        const {params} = this.props.match; 

        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef){
            this.setState({order: JSON.parse(localStorageRef) })
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate(){
        localStorage.setItem(this.props.match.params.Mierda, JSON.stringify(this.state.order))
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    addFish = fish =>{        ///  Declaro el método addFish de donde va a ser llamado atraves de PROPS

         // 1 Creo copia de STATE 
        const fishes = {...this.state.fishes};  
        //2 Adiciono FISH  al arreglo FISHES
        fishes[`fish${Date.now()}`] = fish;
        
        //3 Pasar FISHES al STATE
        this.setState( {
            fishes:fishes
        } );          
    }

    deleteFish = (key) =>{
        //1 HAcer Copia del STATE
        const fishes = {...this.state.fishes};

        // Actualizar STATE
        fishes[key] = null;
        this.setState({fishes});

    }

    updateFish = (key, updatedFish) =>{
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({fishes : fishes});
    }

    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes});
    }

    addToOrder = (key) =>{
         // 1 Creo copia de STATE 
         const order = {...this.state.order}; 

         //2 Tomar la cantidad para adicionar a la ORDEN
        order[key] = order[key] + 1 || 1;

         //3 Actualizar STATE
         this.setState( {order: order  } ); 

    }

    removeFromOrder = (key) =>{
        // 1 Creo copia de STATE 
        const order = {...this.state.order}; 

        //2 Quitar el Items de   la ORDEN
        delete order[key]; 

        //3 Actualizar STATE
        this.setState( {order: order  } ); 

   }


    render(){
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes"> 
                    {/*  Creo un arreglo solo con los KEYS del STATE y lo recorro para que cada uno retorne un
                    <p> con el KEY , despues indicamos que lo renderice el componente FISH y details es para
                    que cada uno muestre los atributos*/}
                    {Object.keys(this.state.fishes).map(key =>
                         <Fish
                          key={key}
                          index={key}
                          details={this.state.fishes[key]} 
                          addToOrder={this.addToOrder}/>)} 
                    </ul>
                    
                    
                </div>
                <Order 
                fishes={this.state.fishes} 
                order={this.state.order}
                removeFromOrder={this.removeFromOrder} />
                <Inventory
                 addFish={this.addFish}
                 updateFish={this.updateFish}
                 deleteFish={this.deleteFish}
                 loadSampleFishes={this.loadSampleFishes}
                 fishes ={this.state.fishes}/>
            </div>
        );
    }

}
 


export default App;