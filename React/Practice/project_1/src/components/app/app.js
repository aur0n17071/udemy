import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [
                {name: "John C.", salary: 800, increase:true, rise:true, id:1},
                {name: "Alex M.", salary: 3000, increase:false, rise:false, id:2},
                {name: "Carl W.", salary: 5000, increase:false, rise:false, id:3}
            ]
        };

        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter((el) => el.id !== id)
            }
        })
    }

    addItem = (item) => {
        const res = {
                ...item, 
                'increase': false, 
                'rise': false, 
                'id': this.maxId++
        }

        this.setState(({data}) => {
            return {
                data: [...data, res]
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id){
                    return {...item, [prop]: !item[prop]}
                }
                return item
            })
        }))
    }

    infoUpdate = () => {
        return [this.state.data.length, this.state.data.filter(elem => elem.increase).length]
    }

    render (){
        return (
            <div className="app">
                <AppInfo
                infoUpdate={this.infoUpdate()}/>
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>

                <EmployeesList 
                data={this.state.data}
                onDelete={this.deleteItem}
                onToggle={this.onToggleProp}
                />
                <EmployeesAddForm
                onAdd={this.addItem}/>
            </div>
        );
    }

}

export default App;