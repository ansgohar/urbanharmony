import React from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import { getComplainsList } from '../../actions/index.js'

class AllComplainsList extends React.Component {
    constructor(props) {
        super(props);
        this.getCmpList();
        this.getPetList();
        
        this.showData = this.showData.bind(this);

        this.state={
            petitionList: [],
            output: false
            
        }
        
    }

    showData(id){

        let data = this.state.petitionList.filter((document) => document._id === id);

        // TODO: Handle decision better

        if (data.length === 0){
            window.alert('قرار اللجنة: لم يتم بعد');
        }else if (data.length === 1){
            window.alert(`قرار اللجنة: ${data[0].committeeDecision}`);
        }
        else{
            console.log(data.length);
        }
    }

    getCmpList() {
        fetch('/complains/list', {
            method: 'GET'
        }).then(res => res.json()

        ).then(data => this.props.dispatch(getComplainsList(data))
        );
    }

    getPetList() {
        fetch('/complains/petition', {
            method: 'GET'
        }).then(res => res.json()

        ).then(data => {this.setState(() =>{
            return {
                petitionList:data
            }
        })}
        );
    }

    translateStatus(value) {
        if(value == 'No') {
            return 'لا يوجد';
        }
        else {
            return 'يوجد';
        }
    }

    render() {
        const columns = [{
            Header: 'رقم التوثيق',
            type: Number,
            id: 'registrationNO',
            accessor: d => {
                if (d.registrationNO === " " || d.registrationNO === null || d.registrationNO === undefined){
                    return Number(0);
                } else{
                    return Number(d.registrationNO);
                }
            },
        },
        {
            Header: 'نوع المبنى',
            type: String,
            accessor: 'type'
        },
        {
            Header: 'العنوان',
            type: String,
            accessor: 'address'
        },
        {
            Header: 'قيمة',
            type: String,
            accessor: 'value'
        },
        {
            Header: 'اسم المبنى',
            type: String,
            accessor: 'buildingName'
        },
        {
            Header: 'رقم المبنى',
            type: Number,
            accessor: 'buildingNo'
        },
        {
            Header: 'حالة التظلم',
            type: String,
            accessor: 'status',
            Cell: props => {
                let surveyed_building_ID = props.original.id;
                let filtered_data = this.state.petitionList.filter((document) => {
                    if (!document.hasOwnProperty('surveylist') || !document.surveylist.hasOwnProperty('_id')){
                        console.log(document);
                        console.log(surveyed_building_ID);
                    }
                    else (document.surveylist._id === surveyed_building_ID)
                        return document;
                });

                if (filtered_data.length !== 0){
                    return (<span><a id={`${filtered_data[0]._id}`} onClick={() => this.showData(filtered_data[0]._id)}>{this.translateStatus(props.value)}</a></span>)
                }
            }
        }]

        /*
        Cell: props => <span> <a href="" onClick={this.setState(prevState =>{
                return {
                    petitionList: prevState.petitionList , 
                    output: true,
                    petitionID: props.original.id
                }
            })}>{this.translateStatus(props.value)} </a></span>
        */


    console.log(this.state)
    let table = (
        <div className="col-xs-12 result-table">
            <ReactTable
                data={this.props.complainsList}
                columns={columns}
                defaultPageSize={5}
                previousText='قبل'
                nextText='بعد'
                loadingText='تحميل...'
                noDataText='لا يوجد نتائج'
                pageText='صفحة'
                ofText='من'
                rowsText='صفوف'
            />
        </div>
    );

    let petition = (
        <div>
            <h5>""حالة التظلم</h5>
            <p>{()=>{
                for(let i=0 ; this.state.petitionList.length>i ; i++){
                    if(this.state.petitionList[i].surveylist.id == this.state.petitionID){
                        return this.state.petitionList[i].recommendation
                    }
                }
            }}</p>
        </div>
    )

        return table;
    }
}

/*
1- Fetch Data, store data in a non changing state.
2- For each surveylist make a <a id="petition">
3- Make an onclick function passing the id of the <a> tag
4- When pressing the onclick search, search the petition, where the passed id to the function is equal to a petition
5- Get relavent data and alert
*/

export default connect()(AllComplainsList);