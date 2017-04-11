import React, { PropTypes } from 'react';

const Link = ({ active, onClick }) => {

  return (
        /*<a 
            href="#" 
            filter={this.props.value} 
            className="row"
            onClick={e => {
                e.preventDefault()
                onClick()
            }}
        >
            {this.props.value}
        </a>*/
        <a className="row" href='#'>No props!</a>
  )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link;