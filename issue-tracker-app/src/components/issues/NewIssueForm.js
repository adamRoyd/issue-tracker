import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const NewIssueForm = ({issue,onChange,onSave,loading,errors,assignees}) => {
        return(
            <form>
                <TextInput
                    name="summary"
                    label="Summary"
                    value={issue.summary}
                    onChange={onChange}
                    error=""/>
                <TextInput
                    name="description"
                    label="Description"
                    value={issue.description}
                    onChange={onChange}
                    error=""/>
                <SelectInput
                    name="assigned"
                    label="Assigned"
                    value={issue.assigned}
                    defaultOption= {assignees[0]}
                    options={assignees}
                    onChange={onChange} 
                    error={errors.assigned}/>
                <input
                    type="submit"
                    disabled={loading}
                    value={loading ? 'Saving...' : 'Save'}
                    className="btn btn-primary"
                    onClick={onSave}/>
            </form>
        );
};

NewIssueForm.propTypes = {
    issue : PropTypes.object.isRequired,
    onChange : PropTypes.func.isRequired,
    onSave : PropTypes.func.isRequired,
    loading : React.PropTypes.bool,
    errors : PropTypes.object
};

export default NewIssueForm;