import React from 'react';
import Browser from 'detect-browser';
import PropTypes from 'prop-types';
import TextInput from '../Common/TextInput';
import SelectInput from '../Common/SelectInput';

const NewIssueForm = ({issue,onChange,onSave,loading,errors,assignees,locations,categories}) => {
        return(
            <form>
                 <TextInput
                    name="browser"
                    label="Browser"
                    value={issue.browser}
                    placeholder={Browser.name + ' ' + Browser.version}
                    onChange={onChange}
                    error=""/>  
                <SelectInput
                    name="location"
                    label="Location"
                    value={issue.location}
                    defaultOption= "Select a location"
                    options={locations}
                    onChange={onChange} 
                    error={errors.location}/>
                <SelectInput
                    name="sco"
                    label="Sco ID"
                    value={issue.sco}
                    defaultOption= "Select a Sco ID"
                    options={[...Array(50).keys()]}
                    onChange={onChange} 
                    error={errors.sco}/>
                <SelectInput
                    name="screen"
                    label="Screen ID"
                    value={issue.screen}
                    defaultOption= "Select a Screen ID"
                    options={[...Array(1000).keys()]}
                    onChange={onChange} 
                    error={errors.screen}/>
                <SelectInput
                    name="category"
                    label="Category"
                    value={issue.category}
                    defaultOption= "Select a category"
                    options={categories}
                    onChange={onChange} 
                    error={errors.category}/>
                <SelectInput
                    name="assigned"
                    label="Assigned to"
                    value={issue.assigned}
                    defaultOption= "Unassigned"
                    options={assignees}
                    onChange={onChange} 
                    error={errors.assigned}/>
                 <TextInput
                    name="description"
                    label="Description"
                    value={issue.description}
                    onChange={onChange}
                    error=""/>                   
            </form>
        );
};

NewIssueForm.propTypes = {
    issue : PropTypes.object.isRequired,
    onChange : PropTypes.func.isRequired,
    onSave : PropTypes.func.isRequired,
    loading : React.PropTypes.bool,
    errors : PropTypes.object,
    assignees : PropTypes.array.isRequired,
    locations : PropTypes.array.isRequired,
    categories : PropTypes.array.isRequired
};

export default NewIssueForm;