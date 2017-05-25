import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../Common/SelectInput';

const BatchIssueForm = ({batchOptions,onChange,loading,errors,assignees,pots}) => {
        return(
            <form>
                <SelectInput
                    name="pot"
                    label="Pot"
                    value={batchOptions.pots}
                    defaultOption= "No change"
                    options={pots}
                    onChange={onChange} 
                    error={errors.pots}/>
                <SelectInput
                    name="assigned"
                    label="Assigned to"
                    value={batchOptions.assigned}
                    defaultOption= "No change"
                    options={assignees}
                    onChange={onChange} 
                    error={errors.assigned}/>                
            </form>
        );
};

BatchIssueForm.propTypes = {
    onChange : PropTypes.func.isRequired,
    loading : React.PropTypes.bool,
    errors : PropTypes.object,
    assignees : PropTypes.array.isRequired,
    locations : PropTypes.array.isRequired
};

export default BatchIssueForm;