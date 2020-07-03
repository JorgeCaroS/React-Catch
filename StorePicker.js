import React from 'react';
import PropTypes from "prop-types";
import {getFunName} from '../helpers';


class StorePicker extends React.Component {
    static propTypes = {
        history: PropTypes.object,
        
    }
        
    myInput = React.createRef(); // Declarar una REF en React para despues usarlar
                                    // en el INPUT del FORM y asi extraer los datos


    goToStore = (event) =>{  // Declaro como atributo para poder instanciar el componente StorePicker con THIS

        // Stop de form from submitting//
        event.preventDefault();

        // Get the text from Input //
        const storeName = this.myInput.current.value;
        console.log(storeName);

        this.props.history.push(`/store/${storeName}`);

        // Chamnge Page to // my choice //

    
    };

    
    render() {
        return (
            < form className="store-selector" onSubmit={this.goToStore}>
                <h2> Please Enter a Store </h2>
                <input type="text" 
                        ref={this.myInput} /// Aqui uso la ref declarada para extraer el dato del INPUT
                        required placeholder="Store Name" 
                        defaultValue={getFunName()}/>
                <button type="submit"> Visit Store </button>

            </form>
        )
    }
}

export default StorePicker;