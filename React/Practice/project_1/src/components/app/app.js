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
            ],
            term: '',
            filter: 'all'
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

    searchEmp = (items, term) => {
        if (term.length === 0){
            return items;
        }

        return items.filter(elem => {
            return elem.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch(filter){
            case 'rise':
                return items.filter(elem => elem.rise);
            case 'moreThan1000':
                return items.filter(elem => elem.salary >= 1000);
            default: return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    onSalaryChange = (id, salary) => {
        this.setState(({data})=> ({
            data: data.map( item => {
                if (item.id === id){
                    return {...item, 'salary' : parseInt(salary)}
                }
                return item
            })
        }))
    }

    render (){
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter)

        return (
            <div className="app">
                <AppInfo
                employees={employees}
                increased={increased}/>
                <div className="search-panel">
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div>

                <EmployeesList 
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}
                onSalaryChange={this.onSalaryChange}
                />
                <EmployeesAddForm
                onAdd={this.addItem}/>
            </div>
        );
    }

}

export default App;